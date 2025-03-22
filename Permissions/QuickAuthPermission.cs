using AventusSharp.Tools.Attributes;
using Core.Permissions.Descriptions;

namespace Core.Permissions;

public enum QuickAuthPermission
{
    Can,
}

[Export]
public class QuickAuthPermissionQuery : PermissionQuery<QuickAuthPermission>
{

    public override PermissionDescription<QuickAuthPermission>? Description()
    {
        return null;
    }
}
public class QuickAuthPermissionDescription : PermissionDescription<QuickAuthPermission>
{
    public override bool isEditable()
    {
        return false;
    }
    protected override Dictionary<QuickAuthPermission, PermissionDescriptionItem> DefineDescription()
    {
        return new();
    }
}