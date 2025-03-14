using AventusSharp.Data;
using AventusSharp.Tools.Attributes;
using Core.Data.DataTypes;
using Core.Logic.FileSystem;

namespace Core.Data;

public class SsoProvider : Storable<SsoProvider>
{
    public string Name { get; set; }
    public SsoLogo Logo { get; set; }
    public string ClientId { get; set; }
    public string ClientSecret { get; set; }
    public string AuthorizationEndpoint { get; set; }
    public string TokenEndpoint { get; set; }
    public string UserInfoEndpoint { get; set; }
    public string UserIdentifier { get; set; }
    public string UserName { get; set; }
    public string? UserPicture { get; set; }
    public bool AutoCreateUser { get; set; }
}

[Export]
public class SsoLogo : ImageFile<SsoProvider>
{
    protected override string DefineDirectory(SsoProvider instance)
    {
        return Path.Combine(FileStorage.rootFolder, "Core", "sso");
    }

    protected override ImageSize? DefineMaxSize()
    {
        return null;
    }

    protected override FileStorage? DefineStorage(SsoProvider instance)
    {
        return FileStorage.GetCore();
    }
}