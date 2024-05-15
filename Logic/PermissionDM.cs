using AventusSharp.Data;
using AventusSharp.Data.Manager;
using AventusSharp.Data.Manager.DB;
using AventusSharp.Tools;
using Core.App;
using Core.Data;
using Core.Permissions;
using Core.Permissions.Descriptions;
using Core.Permissions.Tree;
using Core.Tools;
using System;
using System.Reflection;

namespace Core.Logic
{
    public class PermissionDM : DatabaseDM<PermissionDM, Permission>
    {
        private Dictionary<string, Dictionary<Enum, PermissionDescriptionItem>> FlatPermissionsTree { get; set; } = new();
        private Dictionary<string, PermissionTree> PermissionTrees = new();
        private List<string> NeedReorder { get; set; } = new();

        public void RegisterPermissions<T>() where T : Enum
        {
            RegisterPermissions(typeof(T), null);
        }
        public void RegisterPermissions<T, U>() where T : Enum
        {
            object? description = Activator.CreateInstance(typeof(U));
            if (description is PermissionDescription<T> descriptionCasted)
            {
                RegisterPermissions(typeof(T), descriptionCasted);
            }
            else
            {
                RegisterPermissions(typeof(T), null);
            }
        }
        internal void RegisterPermissions(Type type, PermissionDescription? description)
        {
            Array values = Enum.GetValues(type);
            List<Permission> permissions = new List<Permission>();
            foreach (object value in values)
            {
                if (value is Enum @enum)
                {
                    string name = @enum.GetFullName();
                    ResultWithError<Permission> result = CreateIfNotExist(new Permission()
                    {
                        EnumName = name
                    });
                    if (result.Success && result.Result != null)
                    {
                        permissions.Add(result.Result);
                    }
                }
            }
            RegisterPermissionTree(type, description, permissions);
        }


        private IQueryBuilder<Permission>? CreateIfNotExistQuery = null;
        public ResultWithError<Permission> CreateIfNotExist(Permission permission)
        {
            ResultWithError<Permission> result = new();
            if (CreateIfNotExistQuery == null)
            {
                CreateIfNotExistQuery = CreateQuery<Permission>().WhereWithParameters(a => a.EnumName == permission.EnumName && a.AdditionalInfo == permission.AdditionalInfo);
            }
            ResultWithError<Permission> queryResult = CreateIfNotExistQuery.Prepare(permission).SingleWithError();
            if (!queryResult.Success)
            {
                result.Errors.AddRange(queryResult.Errors);
                return result;
            }
            if (queryResult.Result != null)
            {
                return queryResult;
            }

            ResultWithError<Permission> createResult = CreateWithError(permission);
            if (!createResult.Success)
            {
                result.Errors.AddRange(createResult.Errors);
            }
            return createResult;
        }

        public bool Can(HttpContext context, Enum value)
        {
            return Can(context, value, "");
        }
        public bool Can(HttpContext context, Enum value, string additionalInfo)
        {
            if (context.IsConnected())
            {
                return Can(context.GetUserId() ?? 0, value, additionalInfo);
            }
            return false;
        }

        public bool Can(int idUser, Enum value)
        {
            return Can(idUser, value, "");
        }

        private IQueryBuilder<PermissionUser> CanQueryUser;
        private IExistBuilder<PermissionGroup> CanQueryGroup;
        public bool Can(int idUser, Enum value, string additionalInfo)
        {
            if (UserDM.GetInstance().GetById(idUser)?.IsSuperAdmin == true)
            {
                return true;
            }
            string name = value.GetFullName();
            Permission? perm = Single(p => p.EnumName == name && p.AdditionalInfo == additionalInfo);

            if (perm == null)
            {
                return false;
            }

            int idPerm = perm.Id;
            if (CanQueryUser == null)
            {
                CanQueryUser = PermissionUser.StartQuery().WhereWithParameters(pu => pu.Permission.Id == idPerm && pu.UserId == idUser);
            }
            CanQueryUser.SetVariable("idUser", idUser);
            CanQueryUser.SetVariable("idPerm", idPerm);
            ResultWithError<PermissionUser> canUser = CanQueryUser.SingleWithError();

            if (canUser.Result != null)
            {
                return canUser.Result.Allow;
            }

            List<int> groups = Group.Where(p => p.Users.Contains(new User() { Id = idUser })).Select(p => p.Id).ToList();

            if (CanQueryGroup == null)
            {
                CanQueryGroup = PermissionGroup.StartExist().WhereWithParameters(pu => pu.Permission.Id == idPerm && groups.Contains(pu.GroupId));
            }
            CanQueryGroup.SetVariable("idPerm", idPerm);
            CanQueryGroup.SetVariable("groups", groups);
            ResultWithError<bool> canGroup = CanQueryGroup.RunWithError();
            if (canGroup.Result)
            {
                return true;
            }

            return false;
        }

        #region Permission tree
        internal void RegisterAppPermissionTree(string appName)
        {
            if (!FlatPermissionsTree.ContainsKey(appName))
            {
                FlatPermissionsTree[appName] = new();
                NeedReorder.Add(appName);
            }
        }
        private void RegisterPermissionTree(Type type, PermissionDescription? description, List<Permission> permissions)
        {
            if (description == null)
            {
                description = new DefaultPermissionDescription();
            }
            else if (!description.isEditable())
            {
                return;
            }

            Array values = Enum.GetValues(type);
            foreach (object value in values)
            {
                Enum _value = (Enum)value;
                if (!description.Descriptions.ContainsKey(_value))
                {
                    description.Descriptions.Add(_value, new PermissionDescriptionItem()
                    {
                        DisplayName = _value.ToString(),
                    });
                }

                Permission? p = permissions.Find(p => p.EnumName == _value.GetFullName());
                description.Descriptions[_value].Enum = _value;
                description.Descriptions[_value].PermissionId = p != null ? p.Id : throw new Exception("impossible");

            }

            string appName = "";
            if (type.Assembly == Assembly.GetExecutingAssembly())
            {
                appName = "Système";
            }
            else
            {
                appName = type.Assembly.GetName().Name ?? throw new Exception("The assembly have no name");
            }

            if (!FlatPermissionsTree.ContainsKey(appName))
            {
                FlatPermissionsTree[appName] = new();
            }

            foreach (KeyValuePair<Enum, PermissionDescriptionItem> descriptionItem in description.Descriptions)
            {
                FlatPermissionsTree[appName][descriptionItem.Key] = descriptionItem.Value;
            }

            if (!NeedReorder.Contains(appName))
            {
                NeedReorder.Add(appName);
            }
        }

        public List<PermissionTree> GetPermissionsTree()
        {
            foreach (string appName in NeedReorder)
            {
                List<PermissionDescriptionItem> result = new();

                foreach (KeyValuePair<Enum, PermissionDescriptionItem> pair in FlatPermissionsTree[appName])
                {
                    OrderPermissionsTreeLoop(pair.Value, result, FlatPermissionsTree[appName], new());
                }
                CreatePermissionTree(appName, result);
            }

            return PermissionTrees.Values.OrderBy(a => a.AppName).ToList();
        }

        private int OrderPermissionsTreeLoop(PermissionDescriptionItem descriptionItem, List<PermissionDescriptionItem> result, Dictionary<Enum, PermissionDescriptionItem> source, List<Enum> waiting)
        {
            int baseIndex = result.IndexOf(descriptionItem);
            if (baseIndex != -1)
            {
                return baseIndex + 1;
            }
            int index = 0;
            if (waiting.Contains(descriptionItem.Enum))
            {
                throw new Exception("Infinite Loop");
            }
            waiting.Add(descriptionItem.Enum);
            if (descriptionItem.Parent != null && source.ContainsKey(descriptionItem.Parent))
            {
                int indexTemp = OrderPermissionsTreeLoop(source[descriptionItem.Parent], result, source, waiting);
                if (indexTemp > index)
                {
                    index = indexTemp;
                }
            }
            waiting.Remove(descriptionItem.Enum);
            result.Insert(index, descriptionItem);
            return result.Count;
        }

        private void CreatePermissionTree(string appName, List<PermissionDescriptionItem> result)
        {
            string name = ApplicationPermission.DenyAccess.GetFullName();

            string displayName = "";
            string logoTagName = "";
            int permissionId = 0;
            if (appName != "Système")
            {
                ApplicationData? app = ApplicationDM.GetInstance().Single(p => p.Name == appName);
                if (app == null)
                {
                    return;
                }
                displayName = app.DisplayName;
                logoTagName = app.LogoTagName;
                Permission? permission = Single(p => p.EnumName == name && p.AdditionalInfo == appName);
                if (permission == null)
                {
                    return;
                }
                permissionId = permission.Id;
            }
            else
            {
                displayName = "Système";
            }
            PermissionTrees[appName] = new();
            PermissionTrees[appName].AppName = displayName;
            PermissionTrees[appName].IconTagName = logoTagName;
            PermissionTrees[appName].PermissionId = permissionId;
            Dictionary<Enum, PermissionTreeItem> listTemp = new();
            foreach (PermissionDescriptionItem item in result)
            {
                PermissionTreeItem treeItem = new();
                treeItem.DisplayName = item.DisplayName;
                treeItem.Description = item.Description;
                treeItem.Value = item.Enum;
                treeItem.EnumName = item.Enum.GetFullName();
                treeItem.PermissionId = item.PermissionId;
                listTemp[item.Enum] = treeItem;
                if (item.Parent == null)
                {
                    PermissionTrees[appName].Permissions.Add(treeItem);
                }
                else
                {
                    listTemp[item.Parent].Permissions.Add(treeItem);
                }
            }

        }
        #endregion


    }
}
