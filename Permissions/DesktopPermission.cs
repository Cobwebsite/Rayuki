using AventusSharp.Tools.Attributes;

namespace Core.Permissions
{
    public enum DesktopPermission
    {
        CanEdit,
        CanDelete,
        CanCreate,
        CanTemplate,
        CanChangeBackground,
    }

    [Typescript]
    public class DesktopPermissionQuery : PermissionQuery<DesktopPermission>
    {

    }

}
