using AventusSharp.Data;
using AventusSharp.Data.Attributes;
using Core.Logic;

namespace Core.Data
{
    public class User : Storable<User>
    {
        public string Firstname { get; set; } = "";
        public string Lastname { get; set; } = "";
        public string Username { get; set; } = "";

        [Size(1, SizeEnum.Text), ValidatePassword]
        public string Password { get; set; } = "";
        public string Token { get; set; } = "";
        public string Picture { get; set; } = "";
        public bool IsSuperAdmin { get; set; } = false;

        public bool Can(Enum value, string additionalInfo)
        {
            return PermissionDM.GetInstance().Can(this.Id, value, additionalInfo);
        }
    }


    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property)]
    public class ValidatePassword : ValidationAttribute
    {
        public override ValidationResult IsValid(object? value, ValidationContext context)
        {
            return ValidationResult.Success;
        }
    }
}
