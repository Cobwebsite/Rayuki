using System.Text.RegularExpressions;
using AventusSharp.Data.Attributes;

namespace Core.Data.Validators
{
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property)]
    public class ValidateEmail : ValidationAttribute
    {
        public override Task<ValidationResult> IsValid(object? value, ValidationContext context)
        {
            if (value == null) return Task.FromResult(ValidationResult.Success);
            if (value is string txt)
            {
                if (txt == "") return Task.FromResult(ValidationResult.Success);

                string pattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
                Regex regex = new Regex(pattern);
                if (regex.IsMatch(txt))
                {
                    return Task.FromResult(ValidationResult.Success);
                }
            }
            return Task.FromResult(new ValidationResult("L'email n'a pas un format valide", context.FieldName));
        }
    }
}
