using AventusSharp.Data;
using AventusSharp.Data.Attributes;
using System.Text.RegularExpressions;

namespace Core.Data
{
    public class Plugin : Storable<Plugin>
    {
        [Unique]
        public string Name { get; set; } = "";
        public int Version { get; set; } = 0;

    }
}
