using AventusSharp.Data;
using AventusSharp.Data.Attributes;

namespace Core.Data;

public class WebAuthnCredentials : Storable<WebAuthnCredentials>
{
    [Unique]
    public string CredentialId { get; set; }
    public string Name { get; set; }
    public string PublicKey { get; set; }
    
    [ForeignKey<User>]
    public int UserId { get; set; }
}