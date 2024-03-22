using AventusSharp.Routes.Response;
using AventusSharp.Tools;
using AventusSharp.WebSocket;
using Core.App;
using Core.Data;
using Core.Logic;
using Core.Tools;
using Microsoft.AspNetCore.Http;
using Microsoft.VisualStudio.Shell.Interop;
using MySqlX.XDevAPI.Common;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Configuration;
using System.Text;
using WebPush;
using static Org.BouncyCastle.Math.EC.ECCurve;
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
        public static readonly bool resetStorage = true;

        public static string wwwroot
        {
            get => app.Environment.WebRootPath;
        }
        public static bool IsDev
        {
            get => app.Environment.IsDevelopment();
        }

        public static DatabaseConfig? Config
        {
            get
            {
                return app.Configuration.GetSection("Database").Get<DatabaseConfig>();
            }
        }

        public static void Init(string[] args)
        {
            webPush.SetVapidDetails("http://localhost:5000", PublicKey, PrivateKey);
            InitBuilder(args);
            _ = LoadApps();
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

            app = builder.Build();
        }

        private static void InitHttpApp()
        {
            app.Lifetime.ApplicationStarted.Register(() =>
            {
                HttpReady = true;
                StartApps();
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

            app.UseStaticFiles();
            app.Use(async (context, next) =>
            {
                await LoginMiddleware(context, next);
            });

            app.Use(async (context, next) =>
            {
                await WebSocketMiddleware.OnRequest(context, next);
            });

            //app.Use(WebSocketMiddleware.OnRequest);

            app.UseRouting();

            app.Use(async (context, next) =>
            {
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
                StartApps();
            }
        }

        private static async void StartApps()
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
            string[] files = Directory.GetFiles(path);
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
                Json json = new Json(o);
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
