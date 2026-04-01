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
    public async Task<ResultWithError<List<WebAuthnCredentialsPublic>>> GetByUser(HttpContext context)
    {
        ResultWithError<List<WebAuthnCredentialsPublic>> result = new();
        int id = (int)context.GetUserId()!;
        ResultWithError<List<WebAuthnCredentials>> query =await WebAuthnCredentials.WhereWithError(p => p.UserId == id);

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
    public async Task<ResultWithError<List<WebAuthnCredentialsPublic>>> Delete(HttpContext context, int authId)
    {
        ResultWithError<List<WebAuthnCredentialsPublic>> result = new();
        WebAuthnCredentials? auth = await result.ExtractAsync<WebAuthnCredentials>(async () => await WebAuthnCredentials.GetByIdWithError(authId));
        if (auth != null)
        {
            await result.RunAsync(auth.DeleteWithError);
        }
        if (result.Success) return await GetByUser(context);
        return result;
    }

    public ResultWithError<GetRegisterChallengeResponse> GetRegisterChallenge(HttpContext context)
    {
        return WebAuthnLogic.GetRegisterChallenge(context);
    }

    public async Task<ResultWithError<List<WebAuthnCredentialsPublic>>> Register(HttpContext context, RegisterRequest credential)
    {
        ResultWithError<List<WebAuthnCredentialsPublic>> result = new();
        bool? isOk = await result.ExtractAsync<bool>(async () => await WebAuthnLogic.Register(context, credential));
        if(isOk == true) return await GetByUser(context); 
        return result;
    }

    public async Task<ResultWithError<GetVerifyChallengeResponse>> GetVerifyChallenge()
    {
        return await WebAuthnLogic.GetVerifyChallenge();

    }

    public async Task<ResultWithError<bool>> Verify(HttpContext context, VerifyRequest assertion)
    {
        ResultWithError<bool> result = new();

        WebAuthnCredentials? credentials = await result.ExtractAsync<WebAuthnCredentials>(async () => await WebAuthnLogic.Verify(assertion));
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