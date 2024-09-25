
using AventusSharp.Tools.Attributes;

namespace Core.Data
{
    [Typescript]
    public class SystemInfo
    {
        public string TimeZone { get; set; }

        public string Version { get; set; }

        public string CompilationDate { get; set; }
    }
}