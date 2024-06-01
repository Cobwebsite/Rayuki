using AventusSharp.Data;
using AventusSharp.Data.Attributes;

namespace Core.Data
{

    public class Settings : Storable<Settings>
    {
        public string Key { get; set; }
        public string Value { get; set; }

        [ForeignKey<User>, DeleteOnCascade]
        public int? UserId { get; set; }
    }
}
