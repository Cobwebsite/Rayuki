using AventusSharp.Data;
using AventusSharp.Data.Attributes;
using System.Text.RegularExpressions;

namespace Core.Data
{
    public class ApplicationData : Storable<ApplicationData>
    {
        public static string ParseTag(string name)
        {
            MatchCollection result = new Regex("([A-Z][a-z]*)|([0-9][a-z]*)").Matches(name);
            List<string> parts = result.Select(r => r.Value).ToList();
            return string.Join("-", parts).ToLower();
        }
        [Unique]
        public string Name { get; set; } = "";
        public string DisplayName { get; set; } = "";
        public int Version { get; set; } = 0;

        public string LogoClassName { get; set; } = "";

        public string LogoTagName { get; set; } = "";

        [NotInDB]
        public string Extension
        {
            get
            {
                return ParseTag(Name);
            }
        }

    }
}
