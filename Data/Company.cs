using AventusSharp.Data;
using AventusSharp.Tools.Attributes;
using Core.Data.DataTypes;
using Core.Logic.FileSystem;

namespace Core.Data
{
    public class Company : Storable<Company>
    {
        public string Name { get; set; } = "";
        public CompanyImage Logo { get; set; } = new CompanyImage();
        public int Version { get; set; } = 0;
        public string SiteUrl {get; set;} = "";
    }

    [Export]
    public class CompanyImage : ImageFile<Company>
    {
        protected override string DefineDirectory(Company instance)
        {
            return Path.Combine(FileStorage.rootFolder, "Core", "company");
        }

        protected override ImageSize? DefineMaxSize()
        {
            return null;
        }

        protected override FileStorage? DefineStorage(Company instance)
        {
            return null;
        }
    }

}
