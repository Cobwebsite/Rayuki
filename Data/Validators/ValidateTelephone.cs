using System.Text.RegularExpressions;
using AventusSharp.Data.Attributes;

namespace Core.Data.Validators
{
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property)]
    public class ValidateTelephone : ValidationAttribute
    {
        private bool espaceStrict = false;
        private bool forceIndicatif = false;
        public ValidateTelephone() {}
        public ValidateTelephone(bool espaceStrict, bool forceIndicatif) {
            this.espaceStrict = espaceStrict;
            this.forceIndicatif = forceIndicatif;
        }
        public override ValidationResult IsValid(object? value, ValidationContext context)
        {
            if (value == null) return ValidationResult.Success;
            if (value is string txt)
            {
                if (txt == "") return ValidationResult.Success;

                string pattern;
                if (forceIndicatif) {
                    pattern = @"^(\+41 \d{2} \d{3} \d{2} \d{2})|(0041 \d{2} \d{3} \d{2} \d{2})$";
                }
                else {
                    pattern = @"^(0\d{2} \d{3} \d{2} \d{2})|(0[78]\d{2} \d{3} \d{2} \d{2})|(\+41 \d{2} \d{3} \d{2} \d{2})|(0041 \d{2} \d{3} \d{2} \d{2})$";
                }

                if(!espaceStrict) {
                    pattern = pattern.Replace(" ", " ?");
                }
                Regex regex = new Regex(pattern);
                if (regex.IsMatch(txt))
                {
                    return ValidationResult.Success;
                }
            }
            return new ValidationResult("L'email n'a pas un format valide", context.FieldName);
        }
    }
}
