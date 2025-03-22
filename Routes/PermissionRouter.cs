
using AventusSharp.Routes;
using AventusSharp.Routes.Attributes;
using AventusSharp.Tools;
using Core.App;
using Core.Data;
using Core.Logic;
using Core.Permissions;
using Core.Permissions.Tree;
using Core.Tools;
using Path = AventusSharp.Routes.Attributes.Path;

namespace Core.Routes
{
    public class PermissionRouter : Router
    {
        [Post]
        public ResultWithError<Permission> Get(IPermissionQuery permissionQuery)
        {
            string name = permissionQuery.value.GetFullName();
            string additionalInfo = permissionQuery.additionalInfo;
            return PermissionDM.GetInstance().SingleWithError(p => p.EnumName == name && p.AdditionalInfo == additionalInfo);
        }
        [Post]
        public bool Can(HttpContext context, IPermissionQuery permissionQuery)
        {
            return PermissionDM.GetInstance().Can(context, permissionQuery.value, permissionQuery.additionalInfo);
        }

        [Post]
        public List<PermissionMultiple> CanMultiple(HttpContext context, List<IPermissionQuery> queries)
        {
            return PermissionDM.GetInstance().CanMultiple(context, queries);
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
