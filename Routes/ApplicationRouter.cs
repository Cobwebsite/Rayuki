using AventusSharp.Routes.Attributes;
using Core.Data;
using Core.Logic;
using Route = AventusSharp.Routes.Route;
using Path = AventusSharp.Routes.Attributes.Path;
using AventusSharp.Routes.Response;
using Core.App;
using Core.Tools;

namespace Core.Routes
{
    public class ApplicationRouter : Route
    {
        [Get, Path("/application")]
        public List<ApplicationData> GetAll(HttpContext context)
        {
            return ApplicationDM.GetInstance().GetAllAllowed(context.GetUserId(), context.IsSuperAdmin());
        }


        [Get, Path("/configureApp/data")]
        public AppConfiguration ConfigureAppData()
        {
            return new AppConfiguration();

        }

        [Get, Path("/configureApp")]
        public IResponse ConfigureApp()
        {
            return new View("configureApp");
        }



        [Post, Path("/configureApp/install")]
        public bool InstallDevApp(string container, string app)
        {
            try
            {
                if (!HttpServer.IsDev)
                {
                    return false;
                }
                string rootInstall = System.IO.Path.Combine("D:\\Rayuki\\Apps", container, app, "_export");

                string dll = System.IO.Path.Combine(rootInstall, "apps", app);
                string dllExport = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "apps", app);
                if (Directory.Exists(dll))
                {
                    new DirectoryInfo(dll).DeepCopy(dllExport);
                }
                else
                {
                    return false;
                }

                string www = System.IO.Path.Combine(rootInstall, "wwwroot", "apps", app);
                string wwwExport = System.IO.Path.Combine(HttpServer.wwwroot, "apps", app);
                if (Directory.Exists(www))
                {
                    new DirectoryInfo(www).DeepCopy(wwwExport);
                }
                else
                {
                    return false;
                }

                return true;
            }
            catch { }
            return false;
        }

        [Post, Path("/configureApp/uninstall")]
        public void UninstallDevApp(string app)
        {
            if (!HttpServer.IsDev)
            {
                return;
            }
            AppManager.UnLoadApp(app);
        }
    }
}
