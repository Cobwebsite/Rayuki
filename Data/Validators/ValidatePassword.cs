using AventusSharp.Data.Attributes;

namespace Core.Data.Validators
{
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property)]
    public class ValidatePassword : ValidationAttribute
    {
        public override ValidationResult IsValid(object? value, ValidationContext context)
        {
            if(value == null)  return ValidationResult.Success;


            if (value is string txt)
            {
                
            }

            return ValidationResult.Success;
        }
    }
}
