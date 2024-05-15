using AventusSharp.Routes;
using AventusSharp.Routes.Attributes;
using AventusSharp.Tools;
using Core.Data;
using Core.Logic;
using Path = AventusSharp.Routes.Attributes.Path;
using Route = AventusSharp.Routes.Route;

namespace Core.Routes
{
    public class PermissionUserRouter : Route
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
    }
}