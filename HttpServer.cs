using AventusSharp.Routes.Response;
using AventusSharp.Scheduler;
using AventusSharp.Tools;
using AventusSharp.WebSocket;
using Core.App;
using Core.Data;
using Core.Logic;
using Core.Tools;
using Newtonsoft.Json.Linq;
using WebPush;
using RouterMiddleware = AventusSharp.Routes.RouterMiddleware;

namespace Core
{
    public static class HttpServer
    {
        private static WebApplicationBuilder builder;
        private static WebApplication app;
        private static bool HttpReady;
        private static bool RayukiReady;
        private static bool ServerReady;

        public readonly static string PublicKey = "BHP2YbEJhQ2ysVHihL0dpuYzEJfPPcRViAGAcv0_mQ8a8BND8H_ErB6TUfZYG2co2k1i__cVfPkAHj0JMuJy89Q";
        private static string PrivateKey = "T5kkTj6AQx7-p8iqdUD7uzV98GU4Dg3VLF3k6lezD8o";
        public static WebPushClient webPush = new();

        public static readonly int nbAppInDev = 2;
        public static readonly int Version = 1;
        public static readonly bool resetStorage = true;

        public static string wwwroot
        {
            get => app.Environment.WebRootPath;
        }
        public static bool IsDev
        {
            // get => false;
            get => app.Environment.IsDevelopment();
        }

        public static DatabaseConfig Config
        {
            get
            {
                DatabaseConfig? result = app.Configuration.GetSection("Database").Get<DatabaseConfig>();
                if (result != null)
                {
                    return result;
                }
                result = DatabaseConfig.LoadFromEnv();
                if (result != null)
                {
                    return result;
                }

                Console.WriteLine("The database section can't be found inside the appsettings.json");
                Environment.Exit(0);
                return new DatabaseConfig();
            }
        }

        public static DefaultUserConfig DefaultUser
        {
            get
            {
                DefaultUserConfig? result = app.Configuration.GetSection("DefaultUser").Get<DefaultUserConfig>();
                if (result != null)
                {
                    return result;
                }
                return DefaultUserConfig.LoadFromEnv();
            }
        }

        public static readonly TransactionManager TransactionManager = new TransactionManager();

        public static void Init(string[] args)
        {
            webPush.SetVapidDetails("http://localhost:5000", PublicKey, PrivateKey);
            _ = PdfTools.Init();
            InitBuilder(args);
            Task.Delay(1000).ContinueWith(async (t) =>
            {
                await LoadApps();
                Console.WriteLine("Apps loaded");
            });
            InitHttpApp();
        }

        private static void InitBuilder(string[] args)
        {
            builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services
            .Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            })
            .Configure<DatabaseConfig>(builder.Configuration.GetSection("Database"))
            .AddCors(o => o.AddPolicy("corsPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }))
            .AddSession(opts =>
            {
                opts.Cookie.IsEssential = true;
                opts.IdleTimeout = TimeSpan.FromHours(2);
                opts.IOTimeout = Timeout.InfiniteTimeSpan;
            })
            .AddMvc(options =>
            {
                options.EnableEndpointRouting = false;
            })
            .AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.DateFormatString = "yyyy-MM-ddTHH:mm:ssZ";
            });

            JobManager.Initialize();

            app = builder.Build();

        }

        private static void InitHttpApp()
        {
            app.Lifetime.ApplicationStarted.Register(() =>
            {
                HttpReady = true;
                _ = StartApps();
            });
            app.Lifetime.ApplicationStopping.Register(OnStopping);

            app.UseExceptionHandler("/Home/Error");
            app.UseHsts();
            app.UseCors("corsPolicy");
            app.UseSession();
            app.UseCookiePolicy();


            app.Use(async (context, next) =>
            {
                await LoadingMiddleware(context, next);
            });

            app.UseWebSockets(new WebSocketOptions()
            {
                KeepAliveInterval = TimeSpan.FromSeconds(120),
            });

            // TODO : secure static files
            app.UseStaticFiles();
            app.Use(async (context, next) =>
            {
                await LoginMiddleware(context, next);
            });

            app.Use(async (context, next) =>
            {
                await TransactionManager.FilterQuery(context);
                await WebSocketMiddleware.OnRequest(context, next);
            });

            //app.Use(WebSocketMiddleware.OnRequest);

            app.UseRouting();

            app.Use(async (context, next) =>
            {
                await TransactionManager.FilterQuery(context);
                await RouterMiddleware.OnRequest(context, next);
            });


            app.Run();
        }

        private static async Task LoadApps()
        {
            VoidWithError appResult = await AppManager.Init();
            if (!appResult.Success)
            {
                foreach (IGenericError error in appResult.Errors)
                {
                    error.Print();
                }
                Environment.Exit(0);
            }
            else
            {
                RayukiReady = true;
                await StartApps();
            }
        }

        private static async Task StartApps()
        {
            if (HttpReady && RayukiReady)
            {
                await AppManager.OnStart();
                ServerReady = true;
            }
        }
        private static void OnStopping()
        {
            Stop().Wait();
        }

        public static async Task Stop()
        {
            AppManager.OnStop();
            await WebSocketMiddleware.Stop();
            await app.StopAsync();
        }


        public static Dictionary<string, List<string>> GetAutoLoad()
        {
            if (IsDev)
            {
                ApplicationDM.GetInstance().ReloadIconFile();
            }
            Dictionary<string, List<string>> result = new()
            {
                ["styles"] = new List<string>(),
                ["scripts"] = new List<string>()
            };

            string path = Path.Join(wwwroot, "autoload");
            List<string> files = Directory.GetFiles(path).ToList();
            files.Sort();
            foreach (string file in files)
            {
                string fileToUse = file.Replace(path, "").Replace("\\", "/");
                if (fileToUse.EndsWith(".css"))
                {
                    result["styles"].Add("/autoload" + fileToUse);
                }
                else if (fileToUse.EndsWith(".js"))
                {
                    result["scripts"].Add("/autoload" + fileToUse);
                }
            }
            return result;
        }

        private static async Task LoadingMiddleware(HttpContext context, Func<Task> next)
        {
            if (context.Request.Path == "/started" && context.Request.Method == "POST")
            {
                JObject o = new()
                {
                    { "ready", ServerReady }
                };
                Json json = new Json(o.ToString());
                await json.send(context);
                return;
            }
            if (!ServerReady)
            {
                View view = new View("loading");
                await view.send(context);
                return;
            }

            await next();

        }
        private static async Task LoginMiddleware(HttpContext context, Func<Task> next)
        {
            if (context.IsConnected())
            {
                if (context.Request.Path == "/login")
                {
                    context.Response.Redirect("/");
                    return;
                }
                await next();
                return;
            }

            if (context.Request.Path != "/login")
            {
                if (IsDev)
                {
                    User? user = UserDM.GetInstance().GetById(1);

                    if (user != null)
                    {
                        context.SetConnected(user.Id);
                        context.SetSuperAdmin(user.IsSuperAdmin);
                    }
                }
                else
                {
                    context.Response.Redirect("/login");
                    return;
                }
            }

            await next();

        }
    }
}
