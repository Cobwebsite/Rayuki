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
     public class PermissionGroupRouter : Router
    {
        [Post, Path("/permissiongroup/bygroup")]
        public async Task<ResultWithError<List<PermissionGroup>>> GetAllByGroup(int groupId)
        {
            return await PermissionGroupDM.GetInstance().GetAllByGroup(groupId);
        }

        [Post, Path("/permissiongroup/editpermission")]
        public async Task<ResultWithError<bool>> EditPermission(List<PermissionGroup> created, List<PermissionGroup> updated, List<PermissionGroup> deleted)
        {
            return await PermissionGroupDM.GetInstance().EditPermission(created, updated, deleted);
        }

        [Post, Path("/permissiongroup/haspermission")]
        public async Task<ResultWithError<PermissionGroup>> HasPermission(int idGroup, IPermissionQuery permissionQuery)
        {
            return await PermissionGroupDM.GetInstance().HasPermissionGroup(idGroup, permissionQuery.value, permissionQuery.additionalInfo);
        }
    }
}