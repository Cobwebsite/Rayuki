using AventusSharp.Data;
using AventusSharp.Routes;
using AventusSharp.Routes.Attributes;
using AventusSharp.Routes.Response;
using AventusSharp.Tools;
using AventusSharp.Tools.Attributes;
using Core.Data;
using Core.Logic;
using Microsoft.AspNetCore.Identity;
using Route = AventusSharp.Routes.Route;
using Path = AventusSharp.Routes.Attributes.Path;
using WebPush;
using System.Reflection.Metadata.Ecma335;
using Core.App;
using System.Reflection;
using Newtonsoft.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Runtime.InteropServices.ComTypes;
using System.Runtime.InteropServices;
using EnvDTE;
using Microsoft.VisualBasic;
using Core.Tools;

namespace Core.Routes
{
    public class MainRouter : Route
    {
        [Get, Path("/")]
        public IResponse Home(HttpContext context)
        {
            Dictionary<string, List<string>> autoLoad = HttpServer.GetAutoLoad();
            return new ViewDynamic("index", new
            {
                title = "Cobwebsite",
                styles = autoLoad["styles"].ToArray(),
                scripts = autoLoad["scripts"].ToArray(),
                is_dev = HttpServer.IsDev,
                nb_apps = HttpServer.nbAppInDev,
                user_id = context.GetUserId(),
                version = HttpServer.Version
            });
        }

        [Get, Path("/login")]
        public IResponse Login()
        {
            return new View("login");
        }

        [Post, Path("/login")]
        public ResultWithError<bool> LoginAction(string username, string password, HttpContext context)
        {
            ResultWithError<User> result = PasswordManager.Login(username, password);
            ResultWithError<bool> res = new();
            if (result.Success && result.Result != null)
            {
                context.SetConnected(result.Result.Id);
                context.SetSuperAdmin(result.Result.IsSuperAdmin);
            }
            else
            {
                res.Errors.AddRange(result.Errors);
            }
            res.Result = res.Success;
            return res;
        }

        [Post, Path("/logout")]
        public void Logout(HttpContext context)
        {
            context.Disconnect();
        }

        [Get, Path("/vapidPublicKey")]
        public string VapidPublicKey()
        {
            return HttpServer.PublicKey;
        }


        private List<PushSubscription> subs = new();
        [Post, Path("/register")]
        public void Register(PushSubscription subscription)
        {
            this.subs.Add(subscription);
        }
        [Get, Path("/sendNotification")]
        public void SendNotification()
        {
            foreach (PushSubscription subscription in subs)
            {
                HttpServer.webPush.SendNotification(subscription, "salut");
            }
        }

        [Get, Path("/restart")]
        public void Restart()
        {
            if (HttpServer.IsDev)
            {
                AppManager.OnStop();
                IRunningObjectTable rot;
                IEnumMoniker enumMoniker;
                int retVal = GetRunningObjectTable(0, out rot);

                if (retVal == 0)
                {
                    rot.EnumRunning(out enumMoniker);

                    IntPtr fetched = IntPtr.Zero;
                    IMoniker[] moniker = new IMoniker[1];
                    while (enumMoniker.Next(1, moniker, fetched) == 0)
                    {
                        IBindCtx bindCtx;
                        CreateBindCtx(0, out bindCtx);
                        string displayName;
                        moniker[0].GetDisplayName(bindCtx, null, out displayName);
                        bool isVisualStudio = displayName.StartsWith("!VisualStudio");
                        if (isVisualStudio)
                        {
                            object dteObj;
                            rot.GetObject(moniker[0], out dteObj);
                            var dte = dteObj as DTE;
                            if (dte != null && dte.CommandLineArguments.Contains("Core.sln"))
                            {
                                dte.ExecuteCommand("Debug.Restart");
                            }
                        }
                    }
                }
            }
        }

        [DllImport("ole32.dll")]
        private static extern void CreateBindCtx(int reserved, out IBindCtx ppbc);

        [DllImport("ole32.dll")]
        private static extern int GetRunningObjectTable(int reserved, out IRunningObjectTable prot);
    }
}
