using AventusSharp.Routes.Attributes;
using AventusSharp.Routes.Response;
using AventusSharp.Tools;
using Core.Data;
using Core.Logic;
using Route = AventusSharp.Routes.Route;
using Path = AventusSharp.Routes.Attributes.Path;
using WebPush;
using Core.App;
using System.Runtime.InteropServices.ComTypes;
using System.Runtime.InteropServices;
using EnvDTE;
using Core.Tools;
using AventusSharp.Tools.Attributes;
using Microsoft.AspNetCore.StaticFiles;
using Core.Logic.FileSystem;

namespace Core.Routes
{
    public class MainRouter : Route
    {
        // [Get, Path("/test2")]
        // public IResponse Test(HttpContext context)
        // {
        //     return new View("test");
        // }
        [Get, Path("/")]
        public IResponse Home(HttpContext context)
        {
            Company company = CompanyDM.GetInstance().GetMain();
            Dictionary<string, List<string>> autoLoad = HttpServer.GetAutoLoad();
            return new ViewDynamic("index", new
            {
                title = company.Name,
                icon = company.Logo.Uri,
                styles = autoLoad["styles"].ToArray(),
                scripts = autoLoad["scripts"].ToArray(),
                is_dev = HttpServer.IsDev,
                nb_apps = HttpServer.nbAppInDev,
                user_id = context.GetUserId(),
                version = HttpServer.Version
            });
        }

        [Get, Path("/storage/.*")]
        [NoTypescript]
        public async Task<ByteResponse> Storage(HttpContext context)
        {
            string uri = context.Request.Path.Value!.Replace("/storage/", "");
            ResultWithError<byte[]> response = await FileStorage.Get().Get(uri);
            string contentType = "application/octet-stream";
            if (response.Success && response.Result != null)
            {
                var fileProvider = new FileExtensionContentTypeProvider();
                if(fileProvider.TryGetContentType(uri, out string? contentTypeTemp)) {
                    contentType = contentTypeTemp;
                }
                return new ByteResponse(response.Result, contentType);
            }
            response.Print();
            if (response.Errors[0] is StorageError storageError)
            {
                if (storageError.Code == StorageErrorCode.NotFound)
                {
                    return new ByteResponse([], contentType, 404);
                }
                if (storageError.Code == StorageErrorCode.NotAllowed)
                {
                    return new ByteResponse([], contentType, 403);
                }
            }
            return new ByteResponse([], "application/octet-stream", 500);
        }


        [Get, Path("/login")]
        public IResponse Login()
        {
            Company company = CompanyDM.GetInstance().GetMain();
            return new ViewDynamic("login", new
            {
                company = company.Name,
                icon = company.Logo.Uri,
                version = HttpServer.Version
            });
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

        [Post, Path("/core/transaction/begin")]
        public ResultWithError<string> BeginTransaction(HttpContext context, int ms)
        {
            return HttpServer.TransactionManager.Begin(context, ms);
        }

        [Post, Path("/core/transaction/commit")]
        public VoidWithError CommitTransaction(string guid)
        {
            return HttpServer.TransactionManager.Commit(guid);
        }

        [Post, Path("/core/transaction/rollback")]
        public VoidWithError RollbackTransaction(string guid)
        {
            return HttpServer.TransactionManager.Rollback(guid);
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
