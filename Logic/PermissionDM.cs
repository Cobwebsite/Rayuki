using AventusSharp.Data;
using AventusSharp.Data.Manager;
using AventusSharp.Data.Manager.DB;
using AventusSharp.Tools;
using Core.App;
using Core.Data;
using Core.Tools;
using System;

namespace Core.Logic
{
    public class PermissionDM : DatabaseDM<PermissionDM, Permission>
    {
        public void RegisterPermissions<T>() where T : Enum
        {
            RegisterPermissions(typeof(T));
        }
        internal void RegisterPermissions(Type type)
        {
            Array values = Enum.GetValues(type);
            foreach (object value in values)
            {
                string name = value.GetType().FullName + "." + value.ToString() + ", " + value.GetType().Assembly.GetName().Name;

                CreateIfNotExist(new Permission()
                {
                    EnumName = name
                });
            }
        }
        private IExistBuilder<Permission>? CreateIfNotExistQuery = null;
        public VoidWithError CreateIfNotExist(Permission permission)
        {
            VoidWithError result = new();
            if (CreateIfNotExistQuery == null)
            {
                CreateIfNotExistQuery = CreateExist<Permission>().WhereWithParameters(a => a.EnumName == permission.EnumName && a.AdditionalInfo == permission.AdditionalInfo);
            }
            ResultWithError<bool> queryResult = CreateIfNotExistQuery.Prepare(permission).RunWithError();
            if (!queryResult.Success && queryResult.Errors.Count > 0)
            {
                result.Errors.AddRange(queryResult.Errors);
                return result;
            }
            if (queryResult.Result)
            {
                return result;
            }

            ResultWithError<Permission> createResult = CreateWithError(permission);
            if (!createResult.Success)
            {
                result.Errors.AddRange(createResult.Errors);
            }
            return result;
        }
    
        public bool Can(HttpContext context, Enum value)
        {
            return Can(context, value, "");
        }
        public bool Can(HttpContext context, Enum value, string additionalInfo)
        {
            if(context.IsConnected())
            {
                return Can(context.GetUserId() ?? 0, value, additionalInfo);
            }
            return false;
        }

        public bool Can(int idUser, Enum value)
        {
            return Can(idUser, value, "");
        }

        private IExistBuilder<PermissionUser> CanQueryUser;
        private IExistBuilder<PermissionUser> CanQueryGroup;
        public bool Can(int idUser, Enum value, string additionalInfo)
        {
            if(UserDM.GetInstance().GetById(idUser)?.IsSuperAdmin == true)
            {
                return true;
            }
            string name = value.GetFullName();
            List<Permission> perms = Where<Permission>(p => p.EnumName == name && p.AdditionalInfo == additionalInfo);

            if (perms.Count == 0)
            {
                return false;
            }

            int idPerm = perms[0].Id;
            if (CanQueryUser == null)
            {
                CanQueryUser = PermissionUser.StartExist().WhereWithParameters(pu => pu.Permission.Id == idPerm && pu.User.Id == idUser);
            }
            CanQueryUser.SetVariable("idUser", idUser);
            CanQueryUser.SetVariable("idPerm", idPerm);
            ResultWithError<bool> canUser = CanQueryUser.RunWithError();

            if (canUser.Result)
            {
                return true;
            }

            if (CanQueryGroup == null)
            {
                CanQueryGroup = PermissionGroup.StartExist().WhereWithParameters(pu => pu.Permission.Id == idPerm && pu.User.Id == idUser);
            }
            CanQueryGroup.SetVariable("idUser", idUser);
            CanQueryGroup.SetVariable("idPerm", idPerm);
            ResultWithError<bool> canGroup = CanQueryGroup.RunWithError();
            if (canGroup.Result)
            {
                return true;
            }

            return false;
        }
    }
}
