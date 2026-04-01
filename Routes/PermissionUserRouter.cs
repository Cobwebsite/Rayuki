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
        public async Task<ResultWithError<List<PermissionUser>>> GetAllByUser(int userId)
        {
            return await PermissionUserDM.GetInstance().GetAllByUser(userId);
        }

        [Post, Path("/permissionuser/editpermission")]
        public async Task<ResultWithError<bool>> EditPermission(List<PermissionUser> created, List<PermissionUser> updated, List<PermissionUser> deleted)
        {
            return await PermissionUserDM.GetInstance().EditPermission(created, updated, deleted);
        }

        [Post, Path("/permissionuser/haspermission")]
        public async Task<ResultWithError<PermissionUser>> HasPermission(int idGroup, IPermissionQuery permissionQuery)
        {
            return await PermissionUserDM.GetInstance().HasPermissionGroup(idGroup, permissionQuery.value, permissionQuery.additionalInfo);
        }
    }
}