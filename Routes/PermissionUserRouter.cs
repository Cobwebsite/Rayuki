using AventusSharp.Routes;
using AventusSharp.Routes.Attributes;
using AventusSharp.Tools;
using Core.Data;
using Core.Logic;
using Core.Permissions;
using Path = AventusSharp.Routes.Attributes.Path;

namespace Core.Routes
{
    [Prefix("Core")]
    public class PermissionUserRouter : Router
    {
        [Post, Path("/permissionuser/byuser")]
        public ResultWithError<List<PermissionUser>> GetAllByUser(int userId)
        {
            return PermissionUserDM.GetInstance().GetAllByUser(userId);
        }

        [Post, Path("/permissionuser/editpermission")]
        public ResultWithError<bool> EditPermission(List<PermissionUser> created, List<PermissionUser> updated, List<PermissionUser> deleted)
        {
            return PermissionUserDM.GetInstance().EditPermission(created, updated, deleted);
        }

        [Post, Path("/permissionuser/haspermission")]
        public ResultWithError<PermissionUser> HasPermission(int idGroup, IPermissionQuery permissionQuery)
        {
            return PermissionUserDM.GetInstance().HasPermissionGroup(idGroup, permissionQuery.value, permissionQuery.additionalInfo);
        }
    }
}