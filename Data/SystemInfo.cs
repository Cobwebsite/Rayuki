
using AventusSharp.Tools.Attributes;

namespace Core.Data
{
    [Export]
    public class SystemInfo
    {
        public string TimeZone { get; set; }

        public string Version { get; set; }

        public string BuildDate { get; set; }
        public bool AutoLogin { get; set; }
        public bool IsDev { get; set; }
        public int NbAppInDev { get; set; }
        public bool ResetStorage { get; set; }
    }
}