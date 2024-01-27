using AventusSharp.Tools.Attributes;

namespace Core.Permissions
{
    public enum DesktopPermission
    {
        CanEdit,
        CanDelete,
        CanCreate,
        CanTemplate
    }

    [Typescript]
    public class DesktopPermissionQuery : PermissionQuery<DesktopPermission>
    {

    }

}
