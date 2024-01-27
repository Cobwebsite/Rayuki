using AventusSharp.Data;
using AventusSharp.Data.Manager;
using AventusSharp.Data.Manager.DB;
using AventusSharp.Data.Storage.Default;
using AventusSharp.Tools;
using Core.App;
using Core.Data;
using Core.Permissions;
using Core.Tools;
using System.Text.RegularExpressions;

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
                EnumValue = ApplicationPermission.DenyAccess
            });

            return result;
        }
        public VoidWithError CreateIfNotExist(ApplicationData application)
        {
            VoidWithError result = new();
            if (CreateIfNotExistQuery == null)
            {
                CreateIfNotExistQuery = CreateExist<ApplicationData>().WhereWithParameters(a => a.Name == application.Name);
            }
            ResultWithDataError<bool> queryResult = CreateIfNotExistQuery.Prepare(application).RunWithError();
            if (!queryResult.Success && queryResult.Errors.Count > 0)
            {
                result.Errors.AddRange(queryResult.Errors);
                return result;
            }
            if (queryResult.Result)
            {
                return result;
            }

            ResultWithDataError<ApplicationData> createResult = CreateWithError(application);
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

        public List<ApplicationData> GetAllAllowed(int userId)
        {
            List<string> deniedApps = new List<string>();
            string name = ApplicationPermission.DenyAccess.GetFullName();
            List<PermissionUser> denied = PermissionUser.Where(p => p.Permission.EnumName == name && p.User.Id == userId);
            
            foreach(PermissionUser permission in denied)
            {
                deniedApps.Add(permission.Permission.AdditionalInfo);
            }
            ResultWithDataError<List<ApplicationData>> apps = ApplicationData.WhereWithError(a => !deniedApps.Contains(a.Name));

            return apps.Result ?? new List<ApplicationData>();
        }
    }
}
