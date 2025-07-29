using AventusSharp.Data;
using AventusSharp.Data.Attributes;
using AventusSharp.Tools.Attributes;
using Core.Data.DataTypes;
using Core.Logic;
using Core.Logic.FileSystem;
using Nullable = AventusSharp.Data.Attributes.Nullable;

namespace Core.Data
{
    public enum BackgroundSize
    {
        Cover,
        Contain,
        Stretch

    }
    public class Desktop : Storable<Desktop>, IUserableOrNull
    {
        public string Name { get; set; }

        private string _Token;
        public string Token
        {
            get
            {
                return _Token;
            }
            set
            {
                Configuration.Token = value;
                _Token = value;
            }
        }
        [ForeignKey<User>, Nullable, DeleteOnCascade]
        public int? UserId { get; set; }

        private DekstopConfiguration _Configuration = new DekstopConfiguration();
        [AutoCRUD]
        public DekstopConfiguration Configuration
        {
            get
            {
                return _Configuration;
            }
            set
            {
                _Configuration = value;
                value.Token = Token;
            }
        }

        [NotInDB]
        public List<DesktopAppIcon> Icons { get => DesktopDM.GetInstance().GetDesktopIcons(Id); }

        [NotInDB]
        public List<ApplicationOpen> Applications { get => DesktopDM.GetInstance().GetOpenApps(Id); }
    }

    public class DekstopConfiguration : Storable<DekstopConfiguration>
    {
        [NotInDB, NoExport]
        public string Token { get; set; }
        public DesktopBackground Background { get; set; }
        public BackgroundSize BackgroundSize { get; set; } = BackgroundSize.Cover;
        public bool SyncDesktop { get; set; } = false;

        public int SizeMobile { get; set; } = 85;
        public int SizeTablet { get; set; } = 75;
        public int SizeDesktop { get; set; } = 65;

        public string? BackgroundColor { get; set; }

        public DekstopConfiguration()
        {
            Background = new DesktopBackground()
            {
                Uri = "/img/default_wp.png"
            };
        }
    }

    public enum DesktopLocation
    {
        Desktop,
        BottomBar,
        HomeFav
    }

    [Export]
    public class DesktopBackground : ImageFile<DekstopConfiguration>
    {
        protected override string DefineDirectory(DekstopConfiguration desktop)
        {
            return Path.Combine(FileStorage.rootFolder, "Core", "desktops", desktop.Token);
        }

        protected override ImageSize? DefineMaxSize()
        {
            return ImageSize.Size(1200);
        }

        protected override FileStorage? DefineStorage(DekstopConfiguration instance)
        {
            return FileStorage.GetCore();
        }
    }

    public class DesktopAppIcon : Storable<DesktopAppIcon>
    {
        public int Position { get; set; }
        [ForeignKey<Desktop>]
        public int DesktopId { get; set; }

        public string IconTag { get; set; }

        public DesktopLocation Location { get; set; }
    }

}
