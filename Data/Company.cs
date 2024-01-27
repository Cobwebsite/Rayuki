using AventusSharp.Data;

namespace Core.Data
{
    public class Company : Storable<Company>
    {
        public string Name { get; set; } = "";
        public string Logo { get; set; } = "";
    }
}
