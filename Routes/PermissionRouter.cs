
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
    [Prefix("Core")]
    public class PermissionRouter : Router
    {
        [Post]
        public async Task<ResultWithError<Permission>> Get(IPermissionQuery permissionQuery)
        {
            string name = permissionQuery.value.GetFullName();
            string additionalInfo = permissionQuery.additionalInfo;
            return await PermissionDM.GetInstance().SingleWithError(p => p.EnumName == name && p.AdditionalInfo == additionalInfo);
        }
        [Post]
        public async Task<bool> Can(HttpContext context, IPermissionQuery permissionQuery)
        {
            return await PermissionDM.GetInstance().Can(context, permissionQuery.value, permissionQuery.additionalInfo);
        }

        [Post]
        public async Task<List<PermissionMultiple>> CanMultiple(HttpContext context, List<IPermissionQuery> queries)
        {
            return await PermissionDM.GetInstance().CanMultiple(context, queries);
        }

        [Get]
        public async Task<List<PermissionTree>> GetPermissionsTree()
        {
            return await PermissionDM.GetInstance().GetPermissionsTree();
        }

        [Get, Path("/permissions/GetPermissionsForUser/{idUser}")]
        public async Task<PermissionForUser> GetPermissionsForUser(int idUser)
        {
            return await PermissionDM.GetInstance().GetPermissionsForUser(idUser);
        }
    }


}
