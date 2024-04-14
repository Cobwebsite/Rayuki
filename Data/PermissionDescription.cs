using AventusSharp.Data;
using AventusSharp.Data.Attributes;

namespace Core.Data
{
    public class PermissionDescriptionItem
    {
        public string DisplayName { get; set; }
        public string Description { get; set; }
        public List<Enum> Dependances { get; set; } = new List<Enum>();
    }
    public interface IPermissionDescription
    {
        public Dictionary<object, PermissionDescriptionItem> Descriptions { get; set; }
    }

    public abstract class PermissionDescription : IPermissionDescription
    {
        public virtual bool isGlobal() => true;

        public Dictionary<object, PermissionDescriptionItem> Descriptions { get; set; } = new Dictionary<object, PermissionDescriptionItem>();
    }
    public abstract class PermissionDescription<T> : PermissionDescription where T : Enum
    {

        public PermissionDescription()
        {
            Descriptions = DefineDescription().ToDictionary(p => (object)p.Key, p => p.Value);
        }

        protected abstract Dictionary<T, PermissionDescriptionItem> DefineDescription();

    }

    public enum DemoEnum
    {
        Value1, // ceci est ma valeur 1 et je suis important
        Value2, // ceci est ma valeur 2 et je ne suis pas important
    }
    public class DemoDescription : PermissionDescription<DemoEnum>
    {
        protected override Dictionary<DemoEnum, PermissionDescriptionItem> DefineDescription()
        {
            return new Dictionary<DemoEnum, PermissionDescriptionItem>() {
                {
                    DemoEnum.Value1,
                    new PermissionDescriptionItem() {
                        DisplayName = "Value 1",
                        Description = "My value 1"
                    }
                },
                {
                    DemoEnum.Value2,
                    new PermissionDescriptionItem() {
                        DisplayName = "Value 2",
                        Description = "My value 2"
                    }
                },
            };
        }
    }
}
