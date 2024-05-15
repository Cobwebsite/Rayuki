using AventusSharp.Data;
using AventusSharp.Data.Attributes;

namespace Core.Permissions.Descriptions
{
    public class PermissionDescriptionItem
    {
        internal int PermissionId { get; set; }
        internal Enum Enum { get; set; }
        public string DisplayName { get; set; } = "";
        public string Description { get; set; } = "";
        public Enum? Parent { get; set; }
    }
    public interface IPermissionDescription
    {
        public Dictionary<Enum, PermissionDescriptionItem> Descriptions { get; set; }
    }

    public abstract class PermissionDescription : IPermissionDescription
    {
        public virtual bool isEditable() => true;

        public Dictionary<Enum, PermissionDescriptionItem> Descriptions { get; set; } = new Dictionary<Enum, PermissionDescriptionItem>();
    }
    public abstract class PermissionDescription<T> : PermissionDescription where T : Enum
    {

        public PermissionDescription()
        {
            Descriptions = DefineDescription().ToDictionary(p => (Enum)p.Key, p => p.Value);
        }

        protected abstract Dictionary<T, PermissionDescriptionItem> DefineDescription();

    }

    internal class DefaultPermissionDescription : PermissionDescription
    {

    }

}
