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
        public ResultWithError<List<PermissionGroup>> GetAllByGroup(int groupId)
        {
            return PermissionGroupDM.GetInstance().GetAllByGroup(groupId);
        }

        [Post, Path("/permissiongroup/editpermission")]
        public ResultWithError<bool> EditPermission(List<PermissionGroup> created, List<PermissionGroup> updated, List<PermissionGroup> deleted)
        {
            return PermissionGroupDM.GetInstance().EditPermission(created, updated, deleted);
        }

        [Post, Path("/permissiongroup/haspermission")]
        public ResultWithError<PermissionGroup> HasPermission(int idGroup, IPermissionQuery permissionQuery)
        {
            return PermissionGroupDM.GetInstance().HasPermissionGroup(idGroup, permissionQuery.value, permissionQuery.additionalInfo);
        }
    }
}