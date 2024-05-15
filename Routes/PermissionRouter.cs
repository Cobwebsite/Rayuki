
using AventusSharp.Routes.Attributes;
using Core.Logic;
using Core.Permissions;
using Core.Permissions.Tree;
using Route = AventusSharp.Routes.Route;

namespace Core.Routes
{
    public class PermissionRouter : Route
    {
        [Post]
        public bool Can(HttpContext context, IPermissionQuery permissionQuery)
        {
            return PermissionDM.GetInstance().Can(context, permissionQuery.value, permissionQuery.additionalInfo);
        }

        [Get]
        public List<PermissionTree> GetPermissionsTree() {
            return PermissionDM.GetInstance().GetPermissionsTree();
        }
    }
}
