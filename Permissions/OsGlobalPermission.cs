using AventusSharp.Tools.Attributes;
using Core.Permissions.Descriptions;

namespace Core.Permissions;

public enum OsGlobalPermission
{
    
}

[Export]
public class OsGlobalPermissionQuery : PermissionQuery<OsGlobalPermission>
{

    public override PermissionDescription<OsGlobalPermission>? Description()
    {
        return new OsGlobalPermissionDescription();
    }
}
public class OsGlobalPermissionDescription : PermissionDescription<OsGlobalPermission>
{
    public override bool isEditable()
    {
        return false;
    }
    protected override Dictionary<OsGlobalPermission, PermissionDescriptionItem> DefineDescription()
    {
        return new();
    }
}