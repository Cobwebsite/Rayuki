using AventusSharp.Data;
using AventusSharp.Data.Storage.Default;
using AventusSharp.Data.Storage.Mysql;
using AventusSharp.WebSocket;
using System.Reflection;
using RouterMiddleware = AventusSharp.Routes.RouterMiddleware;
using AventusSharp.Tools;
using Core.Logic;
using AventusSharp.Routes;
using System.Timers;
using Newtonsoft.Json;
using Core.Data;

namespace Core.App
{
    public static class AppManager
    {
        public static MySQLStorage Storage { get; private set; }
        private static AppLoadContext AppLoader = new AppLoadContext();

        private static Dictionary<Type, Assembly> apps = new Dictionary<Type, Assembly>();

        private static List<RayukiApp> allApps = new List<RayukiApp>();

        private static List<string> waitingUnload = new List<string>();

        public async static Task<VoidWithError> Init()
        {
            VoidWithError result = new VoidWithError();
            try
            {
                string toDel = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "apps", "todel.json");
                if (File.Exists(toDel))
                {
                    List<string>? apps = JsonConvert.DeserializeObject<List<string>>(File.ReadAllText(toDel));
                    if (apps != null)
                    {
                        foreach (string app in apps)
                        {
                            string dll = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "apps", app);
                            if (Directory.Exists(dll))
                            {
                                Directory.Delete(dll, true);
                            }
                        }
                    }
                    File.Delete(toDel);
                }

                MySQLStorage storage = new(new StorageCredentials(
                   host: HttpServer.Config.Host,
                   database: HttpServer.Config.Name,
                   username: HttpServer.Config.Username,
                   password: HttpServer.Config.Password

               )
                {
                    keepConnectionOpen = true,
                });
                storage.Connect();
                if (HttpServer.resetStorage)
                    storage.ResetStorage();
                Storage = storage;
                RouterMiddleware.Configure((config) =>
                {
                    config.transformPattern = (urlPattern, @params, type) =>
                    {
                        urlPattern = RouterMiddleware.ReplaceParams(urlPattern, @params);
                        urlPattern = RouterMiddleware.ReplaceFunction(urlPattern, type);
                        if (type.Assembly != Assembly.GetExecutingAssembly())
                        {
                            string appName = type.Assembly.GetName().Name ?? "";
                            urlPattern = "/" + appName + urlPattern;
                        }
                        return RouterMiddleware.PrepareRegex(urlPattern);
                    };
                    config.PrintRoute = true;
                });
                WebSocketMiddleware.Configure((config) =>
                {
                    config.transformPattern = (urlPattern, @params, type) =>
                    {
                        urlPattern = WebSocketMiddleware.ReplaceParams(urlPattern, @params);
                        urlPattern = WebSocketMiddleware.ReplaceFunction(urlPattern, type);
                        if (type.Assembly != Assembly.GetExecutingAssembly())
                        {
                            string appName = type.Assembly.GetName().Name ?? "";
                            urlPattern = "/" + appName + urlPattern;
                        }
                        return WebSocketMiddleware.PrepareRegex(urlPattern);
                    };
                    config.PrintRoute = true;
                });

                WebSocketMiddleware.Register(Assembly.GetExecutingAssembly());
                RouterMiddleware.Register(Assembly.GetExecutingAssembly());
                string appsDir = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "apps");
                if (!Directory.Exists(appsDir))
                {
                    Directory.CreateDirectory(appsDir);
                }
                string[] dirs = Directory.GetDirectories(appsDir);
                foreach (string dir in dirs)
                {
                    string appName = dir.Split(Path.DirectorySeparatorChar).Last();
                    string path = Path.Combine(dir, appName + ".dll");
                    if (File.Exists(path))
                    {
                        try
                        {
                            Console.WriteLine("loading " + path);
                            Assembly dll = AppLoader.LoadFromAssemblyPath(path);

                            if (dll.FullName != null)
                            {

                                Type[] theList = dll.GetTypes();
                                List<Type> wsEndPoints = new List<Type>();
                                List<Type> wsRoutes = new List<Type>();
                                List<Type> httpRouters = new List<Type>();
                                Type? appFile = null;
                                foreach (Type theType in theList)
                                {
                                    if (theType.Namespace != null)
                                    {
                                        Type[] interfaces = theType.GetInterfaces();
                                        if (interfaces.Contains(typeof(IWsEndPoint)))
                                        {
                                            wsEndPoints.Add(theType);
                                        }
                                        else if (interfaces.Contains(typeof(IWsRoute)))
                                        {
                                            wsRoutes.Add(theType);
                                        }
                                        if (interfaces.Contains(typeof(IRoute)))
                                        {
                                            httpRouters.Add(theType);
                                        }
                                        else if (theType.IsSubclassOf(typeof(RayukiApp)))
                                        {
                                            if (appFile != null)
                                            {
                                                result.Errors.Add(new AppError(AppErrorCode.MoreThanOneAppFileFound, "The app " + appName + " can't have 2 RayukiApp file"));
                                            }
                                            else
                                            {
                                                appFile = theType;
                                                object? o = Activator.CreateInstance(theType);
                                                if (o is RayukiApp newAppFile)
                                                {
                                                    newAppFile.action = new Action<Type, PermissionDescription?>((Type type, PermissionDescription? description) =>
                                                    {
                                                        PermissionDM.GetInstance().RegisterPermissions(type, description);
                                                    });
                                                    allApps.Add(newAppFile);
                                                }
                                            }

                                        }
                                    }
                                }

                                if (appFile != null)
                                {
                                    apps.Add(appFile, dll);

                                    WebSocketMiddleware.Register(wsEndPoints, wsRoutes);
                                    RouterMiddleware.Register(httpRouters);
                                }
                                else
                                {
                                    result.Errors.Add(new AppError(AppErrorCode.NoAppFileFound, "The app " + appName + " must have a RayukiApp file"));
                                }
                            }
                        }
                        catch (Exception e)
                        {
                            Console.WriteLine(e);
                        }
                    }
                }

                DataMainManager.Configure(config =>
                {
                    config.defaultStorage = storage;
                    config.defaultDM = typeof(SimpleRayukiDM<>);
                    config.preferLocalCache = false;
                    config.preferShortLink = false;
                    config.nullByDefault = false;
                    config.allowNonAbstractExtension = true;
                    config.GetSQLTableName = (type) =>
                    {
                        string assemblyName = type.Assembly.GetName().Name ?? "";
                        string typeName = type.Name.Split('`')[0];
                        return assemblyName + "." + typeName;
                    };
                    config.log.monitorDataOrdered = true;
                    config.log.monitorManagerOrdered = true;
                    config.log.printErrorInConsole = true;
                });

                VoidWithError resultTemp = await DataMainManager.Init(GetAppsDlls());
                if (!resultTemp.Success)
                {
                    result.Errors.AddRange(resultTemp.Errors);
                    return result;
                }
                foreach (RayukiApp appFile in allApps)
                {
                    appFile.DefinePermissions();
                    VoidWithError registerResult = ApplicationDM.GetInstance().RegisterApplication(appFile);
                    if (!registerResult.Success)
                    {
                        result.Errors.AddRange(registerResult.Errors);
                    }
                }
                VoidWithError iconResult = ApplicationDM.GetInstance().ReloadIconFile();
                if (!iconResult.Success)
                {
                    result.Errors.AddRange(iconResult.Errors);
                }

                result.Errors.AddRange(resultTemp.Errors);
            }
            catch (Exception e)
            {
                result.Errors.Add(new AppError(AppErrorCode.UnknowError, e));
            }
            return result;
        }

        public static async Task<VoidWithError> LoadApp(string appName)
        {
            VoidWithError result = new VoidWithError();
            string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "apps", appName, appName + ".dll");
            if (File.Exists(path))
            {
                try
                {
                    Assembly dll = AppLoader.LoadFromAssemblyPath(path);
                    if (dll.FullName != null)
                    {

                        Type[] theList = dll.GetTypes();
                        List<Type> wsEndPoints = new List<Type>();
                        List<Type> wsRoutes = new List<Type>();
                        List<Type> httpRouters = new List<Type>();
                        Type? appFile = null;
                        List<RayukiApp> newApps = new();
                        foreach (Type theType in theList)
                        {
                            if (theType.Namespace != null)
                            {
                                Type[] interfaces = theType.GetInterfaces();
                                if (interfaces.Contains(typeof(IWsEndPoint)))
                                {
                                    wsEndPoints.Add(theType);
                                }
                                else if (interfaces.Contains(typeof(IWsRoute)))
                                {
                                    wsRoutes.Add(theType);
                                }
                                if (interfaces.Contains(typeof(IRouter)))
                                {
                                    httpRouters.Add(theType);
                                }
                                else if (theType.IsSubclassOf(typeof(RayukiApp)))
                                {
                                    if (appFile != null)
                                    {
                                        result.Errors.Add(new AppError(AppErrorCode.MoreThanOneAppFileFound, "The app " + appName + " can't have 2 RayukiApp file"));
                                    }
                                    else
                                    {
                                        appFile = theType;
                                        object? o = Activator.CreateInstance(theType);
                                        if (o is RayukiApp newAppFile)
                                        {
                                            newApps.Add(newAppFile);
                                            allApps.Add(newAppFile);
                                        }
                                    }

                                }
                            }
                        }

                        if (appFile != null && result.Success)
                        {
                            apps.Add(appFile, dll);
                            WebSocketMiddleware.Register(wsEndPoints, wsRoutes);
                            RouterMiddleware.Register(httpRouters);
                            VoidWithError resultTemp = await DataMainManager.Init(GetAppsDlls());
                            result.Errors.AddRange(resultTemp.Errors);
                            foreach (RayukiApp newApp in newApps)
                            {
                                newApp.DefinePermissions();
                                VoidWithError registerResult = ApplicationDM.GetInstance().RegisterApplication(newApp);
                                if (!registerResult.Success)
                                {
                                    result.Errors.AddRange(registerResult.Errors);
                                }
                            }
                            VoidWithError iconResult = ApplicationDM.GetInstance().ReloadIconFile();
                            if (!iconResult.Success)
                            {
                                result.Errors.AddRange(iconResult.Errors);
                            }
                        }
                        else
                        {
                            result.Errors.Add(new AppError(AppErrorCode.NoAppFileFound, "The app " + appName + " must have a RayukiApp file"));
                        }
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }
            else
            {
                result.Errors.Add(new AppError(AppErrorCode.AppFileNotFound, "Can't found the file " + path));
            }
            return result;
        }

        public static void UnLoadApp(string appName)
        {
            string www = Path.Combine(HttpServer.wwwroot, "apps", appName);
            if (Directory.Exists(www))
            {
                Directory.Delete(www, true);
            }
            waitingUnload.Add(appName);
        }

        public static async Task OnStart()
        {
            foreach (RayukiApp app in allApps)
            {
                Seeder? seeder = app.DefineSeeder();
                if(seeder != null) seeder.Run();
                await app.OnStart();
            }
        }

        public static async void OnStop()
        {
            foreach (RayukiApp app in allApps)
            {
                await app.OnStop();
            }
            File.WriteAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "apps", "todel.json"), JsonConvert.SerializeObject(waitingUnload));
        }

        public static List<Assembly> GetAppsDlls()
        {
            List<Assembly> result = apps.Values.ToList();
            result.Insert(0, Assembly.GetExecutingAssembly());
            return result;
        }
    }
}
