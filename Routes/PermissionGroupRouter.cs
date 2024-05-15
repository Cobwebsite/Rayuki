using AventusSharp.Routes;
using AventusSharp.Routes.Attributes;
using AventusSharp.Tools;
using Core.Data;
using Core.Logic;
using Path = AventusSharp.Routes.Attributes.Path;
using Route = AventusSharp.Routes.Route;

namespace Core.Routes
{
     public class PermissionGroupRouter : Route
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
    }
}