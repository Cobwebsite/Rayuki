using AventusSharp.Data;
using AventusSharp.Data.Attributes;
using Core.Tools;

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
                EnumName = value.GetFullName();
            }
        }
    }



}
