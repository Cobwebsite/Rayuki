using AventusSharp.Data;
using Core.Data.DataTypes;

namespace Core.Data
{
    public class Company : Storable<Company>
    {
        public string Name { get; set; } = "";
        public ImageFile Logo { get; set; } = new ImageFile();
    }

}
