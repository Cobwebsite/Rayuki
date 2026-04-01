using AventusSharp.Routes;
using AventusSharp.Routes.Attributes;
using AventusSharp.Routes.Response;
using AventusSharp.Tools;
using AventusSharp.Tools.Attributes;
using Core.Data;
using Core.Logic;
using Core.Permissions;
using Core.Routes.Attributes;
using Core.Routes.Responses;
using Core.Tools;
using Path = AventusSharp.Routes.Attributes.Path;

namespace Core.Routes;

public class LoginRouter : Router
{
    [Get, Path("/login")]
    public async Task<IResponse> Login(HttpContext context)
    {
        Company company = await CompanyDM.GetInstance().GetMain();
        List<SsoProvider> providers = await SsoProvider
            .StartQuery()
            .Field(p => p.Id)
            .Field(p => p.Name)
            .Field(p => p.Logo)
            .Run();
        int? passKeyResult = (await SettingsDM.GetInstance().GetGlobalSettingsInt(OsPermission.PassKey)).Result;
        bool passKey = passKeyResult == 1 || passKeyResult == 2;

        string error = context.Session.GetString("login_error") ?? "";
        context.Session.Remove("login_error");
        return new ViewDynamic("login", new
        {
            company = company.Name,
            icon = company.Logo.Uri,
            company_version = company.Version,
            version = HttpServer.Version,
            sso = Newtonsoft.Json.JsonConvert.SerializeObject(providers).Replace("\"", "&avquot;"),
            error,
            passKey
        });
    }

    [Post, Path("/login")]
    public async Task<ResultWithError<LoginResult>> LoginAction(string username, string password, HttpContext context)
    {
        ResultWithError<User> result = await PasswordManager.Login(username, password);
        ResultWithError<LoginResult> res = new();
        LoginResult loginResult = new LoginResult();
        if (result.Success && result.Result != null)
        {
            context.SetConnected(result.Result.Id);
            context.SetSuperAdmin(result.Result.IsSuperAdmin);
            List<string> quickToken = new List<string>();
            if (await PermissionDM.GetInstance().AllowQuickLogin(result.Result.Id, quickToken))
            {
                loginResult.QuickAccess = quickToken[0];
                context.Response.Cookies.Append("quickToken", quickToken.Count > 0 ? quickToken[0] : "");
            }
        }
        else
        {
            res.Errors.AddRange(result.Errors);
        }

        loginResult.Success = res.Success;
        if (res.Success)
        {
            res.Result = loginResult;
        }
        return res;
    }

    [Post, Path("/login/quick"), Public]
    public async Task<ResultWithError<bool>> QuickLogin(HttpContext context, string token)
    {
        User? user = await UserDM.GetInstance().QuickLogin(token);
        if (user != null)
        {
            context.SetConnected(user.Id);
            context.SetSuperAdmin(user.IsSuperAdmin);
            return new() { Result = true };
        }
        return new() { Result = false };
    }

    [Post, Path("/login/sso")]
    public async Task<ResultWithError<string>> LoginSso(HttpContext context, int ssoId)
    {
        ResultWithError<string> result = new();
        ResultWithError<SsoProvider> providerQuery = await SsoProvider.GetByIdWithError(ssoId);
        if (!providerQuery.Success || providerQuery.Result == null)
        {
            result.Errors = providerQuery.Errors;
            return result;
        }

        string state = Guid.NewGuid().ToString();
        string redirectUri = "http://localhost:5001/login/sso/callback";
        string authUrl = $"{providerQuery.Result.AuthorizationEndpoint}" +
                           $"?client_id={providerQuery.Result.ClientId}" +
                           $"&redirect_uri={redirectUri}" +
                           $"&state={state}" +
                           $"&scope=read:user user:email";
        context.Session.SetString("OAuthState", state);
        context.Session.SetInt32("OAuthId", ssoId);
        result.Result = authUrl;
        return result;
    }

    [Get, Path("/login/sso/callback"), NoExport]
    public Redirect LoginSsoCallback(HttpContext context)
    {
        string? code = context.Request.Query["code"];
        string? state = context.Request.Query["state"];
        string? savedState = context.Session.GetString("OAuthState");
        int? ssoId = context.Session.GetInt32("OAuthId");
        if (savedState == null || savedState != state || ssoId == null || code == null)
        {
            context.Session.SetString("login_error", "Invalid OAuth state.");
            return new Redirect("/login");
        }
        context.Session.Remove("OAuthId");
        context.Session.Remove("OAuthState");

        var result = SsoProviderDM.GetInstance().Login((int)ssoId, code).GetAwaiter().GetResult();
        if (result.Result != null)
        {
            context.SetConnected(result.Result.Id);
            context.SetSuperAdmin(result.Result.IsSuperAdmin);
        }
        foreach (GenericError error in result.Errors)
        {
            context.Session.SetString("login_error", error.Message);
        }
        return new Redirect("/login");
    }

    [Path("/login/webauthn/register"), Public]
    public async Task<ResultWithError<GetVerifyChallengeResponse>> LoginWebAuthnChallenge()
    {
        return await WebAuthnLogic.GetVerifyChallenge();

    }
    [Post, Path("/login/webauthn"), Public]
    public async Task<ResultWithError<bool>> LoginWebAuthn(HttpContext context, VerifyRequest assertion)
    {
        ResultWithError<bool> result = new();

        WebAuthnCredentials? credentials = await result.ExtractAsync<WebAuthnCredentials>(async () => await WebAuthnLogic.Verify(assertion));
        if (credentials != null)
        {
            User? user = await User.GetById(credentials.UserId);
            context.SetConnected(credentials.UserId);
            context.SetSuperAdmin(user?.IsSuperAdmin ?? false);
        }

        result.Result = result.Success;
        return result;
    }

    [Post, Path("/logout")]
    public void Logout(HttpContext context)
    {
        context.Disconnect();
    }


    [Post, Permission<OsPermission>(OsPermission.ConnectAs)]
    public async Task<ResultWithError<LoginResult>> ConnectAs(int userId, HttpContext context)
    {
        ResultWithError<LoginResult> res = new();
        int? oldUserId = context.GetUserId();
        if (oldUserId == null)
        {
            res.Errors.Add(CoreError.NotLogin);
            return res;
        }

        ResultWithError<User> result = await User.GetByIdWithError(userId);
        LoginResult loginResult = new LoginResult();
        if (result.Success && result.Result != null)
        {
            if (context.GetPreviousConnected() == null)
            {
                context.SetPreviousConnected(oldUserId);
            }
            context.SetConnected(result.Result.Id);
            context.SetSuperAdmin(result.Result.IsSuperAdmin);
        }
        else
        {
            res.Errors.AddRange(result.Errors);
        }

        loginResult.Success = res.Success;
        if (res.Success)
        {
            res.Result = loginResult;
        }
        return res;
    }

    [Post]
    public async Task<ResultWithError<LoginResult>> DisconnectFrom(HttpContext context)
    {
        ResultWithError<LoginResult> res = new();
        int? userId = context.GetUserId();
        if (userId == null)
        {
            res.Errors.Add(CoreError.NotLogin);
            return res;
        }
        int? oldUserId = context.GetPreviousConnected();
        if (oldUserId == null)
        {
            res.Errors.Add(CoreError.NotLogin);
            return res;
        }

        ResultWithError<User> result = await User.GetByIdWithError((int)oldUserId);
        LoginResult loginResult = new LoginResult();
        if (result.Success && result.Result != null)
        {
            context.SetPreviousConnected(null);
            context.SetConnected(result.Result.Id);
            context.SetSuperAdmin(result.Result.IsSuperAdmin);
        }
        else
        {
            res.Errors.AddRange(result.Errors);
        }

        loginResult.Success = res.Success;
        if (res.Success)
        {
            res.Result = loginResult;
        }
        return res;
    }


}

