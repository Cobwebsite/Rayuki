
using AventusSharp.Tools.Attributes;

namespace Core.Data
{
    [Export]
    public class SystemInfo
    {
        public string TimeZone { get; set; }

        public string Version { get; set; }

        public string CompilationDate { get; set; }
    }
}