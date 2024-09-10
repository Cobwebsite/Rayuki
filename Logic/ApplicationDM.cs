using AventusSharp.Data.Manager;
using AventusSharp.Data.Manager.DB;
using AventusSharp.Tools;
using Core.App;
using Core.Data;
using Core.Permissions;
using Core.Tools;
using System.Text.RegularExpressions;
using Group = Core.Data.Group;

namespace Core.Logic
{
    public class ApplicationDM : DatabaseDM<ApplicationDM, ApplicationData>
    {
        private IExistBuilder<ApplicationData>? CreateIfNotExistQuery = null;

        public VoidWithError RegisterApplication(RayukiApp app)
        {
            VoidWithError result = new VoidWithError();
            string? name = app.GetType().Assembly.GetName().Name;
            ApplicationData application = new ApplicationData();
            application.Version = app.Version();
            application.DisplayName = app.DisplayName();

            if (string.IsNullOrWhiteSpace(name))
            {
                result.Errors.Add(new AppError(AppErrorCode.NoName, "The name " + name + " isn't a valid name."));
            }
            else
            {
                application.Name = name;
            }


            if (!result.Success)
            {
                return result;
            }

            string path = Path.Combine(HttpServer.wwwroot, "apps", application.Name, "icon.js");
            if (!File.Exists(path))
            {
                result.Errors.Add(new AppError(AppErrorCode.NoIconFileFound, "Can't load the logo path for app " + application.Name));
                return result;
            }
            string logoTxt = File.ReadAllText(path);

            string logoClassName = new Regex(@"class[ ]+([a-zA-Z]*)").Match(logoTxt).Groups[1].Value;
            string logoFullClassName = new Regex("(" + application.Name + @"\..*?" + logoClassName + ")=" + logoClassName).Match(logoTxt).Groups[1].Value;
            string logoTagName = new Regex(@"window\.customElements\.get\('(.*)'\)").Match(logoTxt).Groups[1].Value;
            application.LogoClassName = logoFullClassName;
            application.LogoTagName = logoTagName;

            result = CreateIfNotExist(application);

            PermissionDM.GetInstance().CreateIfNotExist(new Permission()
            {
                AdditionalInfo = application.Name,
                EnumValue = ApplicationPermission.AllowAccess
            });
            PermissionDM.GetInstance().RegisterAppPermissionTree(application.Name);
            return result;
        }
        public VoidWithError CreateIfNotExist(ApplicationData application)
        {
            VoidWithError result = new();
            if (CreateIfNotExistQuery == null)
            {
                CreateIfNotExistQuery = CreateExist<ApplicationData>().WhereWithParameters(a => a.Name == application.Name);
            }
            ResultWithError<bool> queryResult = CreateIfNotExistQuery.Prepare(application).RunWithError();
            if (!queryResult.Success && queryResult.Errors.Count > 0)
            {
                result.Errors.AddRange(queryResult.Errors);
                return result;
            }
            if (queryResult.Result)
            {
                return result;
            }

            ResultWithError<ApplicationData> createResult = CreateWithError(application);
            if (!createResult.Success)
            {
                result.Errors.AddRange(createResult.Errors);
            }
            return result;
        }


        public VoidWithError ReloadIconFile()
        {
            VoidWithError result = new VoidWithError();
            List<ApplicationData> apps = GetAll<ApplicationData>();
            string fileContent = "";
            foreach (ApplicationData app in apps)
            {
                string path = Path.Combine(HttpServer.wwwroot, "apps", app.Name, "icon.js");
                if (!File.Exists(path))
                {
                    result.Errors.Add(new AppError(AppErrorCode.NoName, "Can't load the icon path for the app " + app.Name));
                    continue;
                }
                string logoTxt = File.ReadAllText(path);
                fileContent += logoTxt + "\r\n";
            }
            string finalFile = Path.Combine(HttpServer.wwwroot, "autoload", "icon.js");
            File.WriteAllText(finalFile, fileContent);
            return result;
        }

        public List<ApplicationData> GetAllAllowed(int? userId, bool isSuperAdmin)
        {
            if (userId == null) return new List<ApplicationData>();

            if (isSuperAdmin)
            {
                return ApplicationData.GetAll();
            }
            List<string> allowedApps = new List<string>();
            string name = ApplicationPermission.AllowAccess.GetFullName();
            List<PermissionUser> allowed = PermissionUser.Where(p => p.Permission.EnumName == name && p.UserId == userId);

            foreach (PermissionUser permission in allowed)
            {
                allowedApps.Add(permission.Permission.AdditionalInfo);
            }

            int realId = (int)userId;
            List<int> groups = Group.Where(p => p.Users.Contains(new User() { Id = realId })).Select(p => p.Id).ToList();
            if (groups.Count > 0)
            {
                List<PermissionGroup> allowedInGroup = PermissionGroup
                    .StartQuery()
                    .Where(pu => pu.Permission.EnumName == name && groups.Contains(pu.GroupId))
                    .Run();

                foreach (PermissionGroup permission in allowedInGroup)
                {
                    if (!allowedApps.Contains(permission.Permission.AdditionalInfo))
                    {
                        allowedApps.Add(permission.Permission.AdditionalInfo);
                    }
                }
            }

            ResultWithError<List<ApplicationData>> apps = ApplicationData.WhereWithError(a => allowedApps.Contains(a.Name));

            return apps.Result ?? new List<ApplicationData>();
        }
    }
}
