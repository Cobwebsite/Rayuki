using AventusSharp.Tools.Attributes;

namespace Core.Permissions
{
    public interface IPermissionQuery
    {
        Enum value { get; set; }
        string additionalInfo { get; set; }
    }
    public abstract class PermissionQuery<T> : IPermissionQuery where T : Enum
    {
        public T value { get; set; }
        public string additionalInfo { get; set; }
        Enum IPermissionQuery.value
        {
            get => value; set
            {
                if (value is T)
                {
                    this.value = (T)value;
                }
            }
        }
    }
}
