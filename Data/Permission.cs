using AventusSharp.Data;
using AventusSharp.Data.Attributes;

namespace Core.Data
{
    public class Permission : Storable<Permission>
    {
        public string EnumName { get; set; }

        [NotNullable]
        public string AdditionalInfo { get; set; } = "";

        [NotInDB]
        public Enum EnumValue
        {
            set
            {
                EnumName = value.GetType().FullName + "." + value.ToString() + ", " + value.GetType().Assembly.GetName().Name;
            }
        }
    }



}
