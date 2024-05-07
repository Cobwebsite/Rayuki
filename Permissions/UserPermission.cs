using AventusSharp.Tools.Attributes;

namespace Core.Permissions
{
    public enum UserPermission
    {
        CanEdit,
        CanDelete,
        CanCreate,
    }

    [Typescript]
    public class UserPermissionQuery : PermissionQuery<UserPermission>
    {

    }

}
