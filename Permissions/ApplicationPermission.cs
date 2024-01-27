using AventusSharp.Tools.Attributes;

namespace Core.Permissions
{
    public enum ApplicationPermission
    {
        DenyAccess
    }

    [Typescript]
    public class ApplicationPermissionQuery : PermissionQuery<ApplicationPermission>
    {

    }
}
