using System.Security.Cryptography;
using AventusSharp.Routes;
using AventusSharp.Routes.Attributes;
using AventusSharp.Tools;
using AventusSharp.Tools.Attributes;
using Core.Data;
using Core.Logic;
using Core.Tools;
using PeterO.Cbor;

namespace Core.Routes;

[Prefix("Core/WebAuthn")]
public class WebAuthnRouter : Router
{
    public ResultWithError<List<WebAuthnCredentialsPublic>> GetByUser(HttpContext context)
    {
        ResultWithError<List<WebAuthnCredentialsPublic>> result = new();
        int id = (int)context.GetUserId()!;
        ResultWithError<List<WebAuthnCredentials>> query = WebAuthnCredentials.WhereWithError(p => p.UserId == id);

        if (query.Result != null && query.Success)
        {
            result.Result = query.Result.Select(p => new WebAuthnCredentialsPublic(p)).ToList();
        }
        else
        {
            result.Errors = query.Errors;
        }
        return result;
    }
    public ResultWithError<List<WebAuthnCredentialsPublic>> Delete(HttpContext context, int authId)
    {
        ResultWithError<List<WebAuthnCredentialsPublic>> result = new();
        WebAuthnCredentials? auth = result.Execute(() => WebAuthnCredentials.GetByIdWithError(authId));
        if (auth != null)
        {
            result.Run(auth.DeleteWithError);
        }
        if (result.Success) return GetByUser(context);
        return result;
    }

    public ResultWithError<GetRegisterChallengeResponse> GetRegisterChallenge(HttpContext context)
    {
        return WebAuthnLogic.GetRegisterChallenge(context);
    }

    public ResultWithError<List<WebAuthnCredentialsPublic>> Register(HttpContext context, RegisterRequest credential)
    {
        ResultWithError<List<WebAuthnCredentialsPublic>> result = new();
        bool? isOk = result.Execute(() => WebAuthnLogic.Register(context, credential));
        if(isOk == true) return GetByUser(context); 
        return result;
    }

    public ResultWithError<GetVerifyChallengeResponse> GetVerifyChallenge()
    {
        return WebAuthnLogic.GetVerifyChallenge();

    }

    public ResultWithError<bool> Verify(HttpContext context, VerifyRequest assertion)
    {
        ResultWithError<bool> result = new();

        WebAuthnCredentials? credentials = result.Execute(() => WebAuthnLogic.Verify(assertion));
        if (credentials != null)
        {
            if (credentials.UserId != context.GetUserId())
            {
                result.Errors.Add(new GenericError(400, "Not matching"));
            }
        }

        result.Result = result.Success;
        return result;
    }

}

[Export]
public class GetRegisterChallengeResponse
{
    public required string Challenge { get; set; }
    public int UserId { get; set; }
}
[Export]
public class RegisterRequest
{
    public required string Id { get; set; }
    public required string RawId { get; set; }
    public required string Name { get; set; }
    public required string Type { get; set; }

    public required string ClientDataJSON { get; set; }
    public required string AttestationObject { get; set; }
}

[Export]
public class GetVerifyChallengeResponse
{
    public required string Challenge { get; set; }
    public List<string>? Ids { get; set; }
}


[Export]
public class VerifyRequest
{
    public required string Id { get; set; }
    public required string RawId { get; set; }
    public required string Type { get; set; }

    public required string ClientDataJSON { get; set; }
    public required string AuthenticatorData { get; set; }
    public required string Signature { get; set; }
    public required string? UserHandle { get; set; }
}