
using AventusSharp.Routes;
using AventusSharp.Routes.Attributes;
using Core.Data;
using Core.Logic;
using Core.Permissions;
using Core.Permissions.Tree;
using Path = AventusSharp.Routes.Attributes.Path;

namespace Core.Routes
{
    public class PermissionRouter : Router
    {
        [Post]
        public bool Can(HttpContext context, IPermissionQuery permissionQuery)
        {
            return PermissionDM.GetInstance().Can(context, permissionQuery.value, permissionQuery.additionalInfo);
        }

        [Get]
        public List<PermissionTree> GetPermissionsTree()
        {
            return PermissionDM.GetInstance().GetPermissionsTree();
        }

        [Get, Path("/permissions/GetPermissionsForUser/{idUser}")]
        public PermissionForUser GetPermissionsForUser(int idUser)
        {
            return PermissionDM.GetInstance().GetPermissionsForUser(idUser);
        }
    }


   }
