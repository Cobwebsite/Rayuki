using AventusSharp.Tools.Attributes;

namespace Core.Data
{
    [Typescript]
    public class Manifest
    {
        public string name { get; set; }
        public string short_name { get; set; }

        public List<ManifestIcon> icons { get; set; }
        public string theme_color { get; set; }
        public string background_color { get; set; }
        public string display { get; set; }
        public string orientation { get; set; }
        public string scope { get; set; }
        public string start_url { get; set; }

    }

    [Typescript]
    public class ManifestIcon
    {
        public string src { get; set; }
        public string type { get; set; }
        public string sizes { get; set; }
        public string? purpose { get; set; }

    }
}