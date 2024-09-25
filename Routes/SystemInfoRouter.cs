
using Core.Data;
using Route = AventusSharp.Routes.Route;

namespace Core.Routes
{
    public class SystemInfoRouter : Route
    {
        public SystemInfo GetSystemInfo() {
            return new SystemInfo() {
                TimeZone = TimeZoneInfo.Local.DisplayName,
                Version = HttpServer.Version,
            };
        }
    }
}