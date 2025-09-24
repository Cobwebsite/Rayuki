using System.Text.RegularExpressions;
using AventusSharp.Data.Attributes;

namespace Core.Data.Validators
{
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property)]
    public class Range : ValidationAttribute
    {
        private float min;
        private float max;
        public Range(int min, int max)
        {
            this.min = min;
            this.max = max;
        }
        public Range(float min, float max)
        {
            this.min = min;
            this.max = max;
        }


        public override ValidationResult IsValid(object? value, ValidationContext context)
        {
            if (value == null) return ValidationResult.Success;
            if (value is float nb)
            {
                if (nb >= min && nb <= max)
                {
                    return ValidationResult.Success;
                }
            }
            else if (value is int nb2)
            {
                if (nb2 >= min && nb2 <= max)
                {
                    return ValidationResult.Success;
                }
            }
            return new ValidationResult("Le nombre doit être compris entre " + min + " et " + max, context.FieldName);
        }
    }
}
