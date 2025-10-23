using AventusSharp.Data;
using AventusSharp.Data.Attributes;
using AventusSharp.Tools.Attributes;

namespace Core.Data;

public class WebAuthnCredentials : Storable<WebAuthnCredentials>
{
    [Unique]
    public string CredentialId { get; set; }
    public string Name { get; set; }
    [Size(SizeEnum.Text)]
    public string PublicKey { get; set; }

    [ForeignKey<User>]
    public int UserId { get; set; }
}

[Export]
public class WebAuthnCredentialsPublic
{
    public int Id { get; set; }
    public string Name { get; set; }

    public WebAuthnCredentialsPublic(WebAuthnCredentials? credentials)
    {
        if (credentials != null)
        {
            Id = credentials.Id;
            Name = credentials.Name;
        }
    }
}