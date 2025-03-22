using AventusSharp.Routes;
using AventusSharp.Routes.Attributes;
using AventusSharp.Routes.Response;
using AventusSharp.Tools;
using AventusSharp.Tools.Attributes;
using Core.Data;
using Core.Logic;
using Core.Routes.Attributes;
using Core.Routes.Responses;
using Core.Tools;
using Path = AventusSharp.Routes.Attributes.Path;

namespace Core.Routes;
public class LoginRouter : Router
{
    [Get, Path("/login")]
    public IResponse Login(HttpContext context)
    {
        Company company = CompanyDM.GetInstance().GetMain();
        List<SsoProvider> providers = SsoProvider
            .StartQuery()
            .Field(p => p.Id)
            .Field(p => p.Name)
            .Field(p => p.Logo)
            .Run();
        string error = context.Session.GetString("login_error") ?? "";
        context.Session.Remove("login_error");
        return new ViewDynamic("login", new
        {
            company = company.Name,
            icon = company.Logo.Uri,
            company_version = company.Version,
            version = HttpServer.Version,
            sso = Newtonsoft.Json.JsonConvert.SerializeObject(providers).Replace("\"", "&avquot;"),
            error = error
        });
    }

    [Post, Path("/login")]
    public ResultWithError<LoginResult> LoginAction(string username, string password, HttpContext context)
    {
        ResultWithError<User> result = PasswordManager.Login(username, password);
        ResultWithError<LoginResult> res = new();
        LoginResult loginResult = new LoginResult();
        if (result.Success && result.Result != null)
        {
            context.SetConnected(result.Result.Id);
            context.SetSuperAdmin(result.Result.IsSuperAdmin);
            string? quickToken;
            if (PermissionDM.GetInstance().AllowQuickLogin(result.Result.Id, out quickToken))
            {
                loginResult.QuickAccess = quickToken;
                context.Response.Cookies.Append("quickToken", quickToken ?? "");
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
    public ResultWithError<bool> QuickLogin(HttpContext context, string token)
    {
        User? user = UserDM.GetInstance().QuickLogin(token);
        if (user != null)
        {
            context.SetConnected(user.Id);
            context.SetSuperAdmin(user.IsSuperAdmin);
            return new() { Result = true };
        }
        return new() { Result = false };
    }

    [Post, Path("/login/sso")]
    public ResultWithError<string> LoginSso(HttpContext context, int ssoId)
    {
        ResultWithError<string> result = new();
        ResultWithError<SsoProvider> providerQuery = SsoProvider.GetByIdWithError(ssoId);
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


    [Post, Path("/logout")]
    public void Logout(HttpContext context)
    {
        context.Disconnect();
    }
}

