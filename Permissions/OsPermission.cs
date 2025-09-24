using AventusSharp.Tools.Attributes;
using Core.Permissions.Descriptions;

namespace Core.Permissions;

public enum OsPermission
{
    ConnectAs
}

[Export]
public class OsPermissionQuery : PermissionQuery<OsPermission>
{

    public override PermissionDescription<OsPermission>? Description()
    {
        return null;
    }
}
public class OsPermissionDescription : PermissionDescription<OsPermission>
{
    protected override Dictionary<OsPermission, PermissionDescriptionItem> DefineDescription()
    {
        return new Dictionary<OsPermission, PermissionDescriptionItem>() {
                {
                    OsPermission.ConnectAs,
                    new PermissionDescriptionItem() {
                        DisplayName = "Connect as",
                        Description = "Allow user to connect as another user"
                    }
                }
            };
    }
}