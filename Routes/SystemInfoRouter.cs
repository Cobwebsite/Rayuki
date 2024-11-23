
using AventusSharp.Routes;
using Core.Data;

namespace Core.Routes
{
    public class SystemInfoRouter : Router
    {
        public SystemInfo GetSystemInfo() {
            return new SystemInfo() {
                TimeZone = TimeZoneInfo.Local.DisplayName,
                Version = HttpServer.Version,
            };
        }
    }
}