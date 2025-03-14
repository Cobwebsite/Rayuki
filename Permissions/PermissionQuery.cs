using AventusSharp.Tools.Attributes;
using Core.Permissions.Descriptions;

namespace Core.Permissions
{
    public interface IPermissionQuery
    {
        [NoExport]
        Type enumType { get; }
        Enum value { get; set; }
        string additionalInfo { get; set; }

        PermissionDescription? Description();
    }

    public abstract class PermissionQuery<T> : IPermissionQuery where T : Enum
    {

        public T value { get; set; }
        public string additionalInfo { get; set; }

        [NoExport]
        public Type enumType { get => typeof(T); }

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

        public abstract PermissionDescription<T>? Description();

        PermissionDescription? IPermissionQuery.Description()
        {
            return Description();
        }
    }

}
