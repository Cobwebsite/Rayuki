using AventusSharp.Data;
using AventusSharp.Tools.Attributes;

namespace Core.Data
{
    [NoTypescript]
    public class SeederMemory : Storable<SeederMemory>
    {
        public string Name { get; set; } = "";
        public int Version { get; set; } = 0;
    }
}
