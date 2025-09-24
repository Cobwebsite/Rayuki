
using AventusSharp.Routes;
using AventusSharp.Routes.Attributes;
using Core.Data;

namespace Core.Routes
{
    [Prefix("Core")]
    public class SystemInfoRouter : Router
    {
        public SystemInfo GetSystemInfo() {
            return new SystemInfo()
            {
                TimeZone = TimeZoneInfo.Local.DisplayName,
                Version = HttpServer.Version,
                BuildDate = HttpServer.BuildDate,
                AutoLogin = HttpServer.AutoLogin,
                IsDev = HttpServer.IsDev,
                NbAppInDev = HttpServer.NbAppInDev,
                ResetStorage = HttpServer.ResetStorage,
            };
        }
    }
}