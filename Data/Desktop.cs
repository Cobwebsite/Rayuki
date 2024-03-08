using AventusSharp.Data;
using AventusSharp.Data.Attributes;
using AventusSharp.Tools.Attributes;
using Core.Data.DataTypes;
using Core.Logic;
using Nullable = AventusSharp.Data.Attributes.Nullable;

namespace Core.Data
{
    public enum BackgroundSize
    {
        Cover,
        Contain,
        Stretch

    }
    public class Desktop : Storable<Desktop>
    {
        public string Name { get; set; }

        public string Token { get; set; }
        [ForeignKey<User>, Nullable]
        public int? UserId { get; set; }

        [AutoCRUD]
        public DekstopConfiguration Configuration { get; set; } = new DekstopConfiguration();

        [NotInDB]
        public List<DesktopAppIcon> Icons { get => DesktopDM.GetInstance().GetDesktopIcons(Id); }

        [NotInDB]
        public List<ApplicationOpen> Applications { get => DesktopDM.GetInstance().GetOpenApps(Id); }
    }

    public class DekstopConfiguration : Storable<DekstopConfiguration>
    {
        public ImageFile Background { get; set; }
        public BackgroundSize BackgroundSize { get; set; } = BackgroundSize.Cover;
        public bool SyncDesktop { get; set; } = false;

        public int SizeMobile { get; set; } = 85;
        public int SizeTablet { get; set; } = 75;
        public int SizeDesktop { get; set; } = 65;

        public string? BackgroundColor { get; set; }

        public DekstopConfiguration()
        {
            Background = new ImageFile()
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

    public class DesktopAppIcon : Storable<DesktopAppIcon>
    {
        public int Position { get; set; }
        [ForeignKey<Desktop>]
        public int DesktopId { get; set; }

        public string IconTag { get; set; }

        public DesktopLocation Location { get; set; }
    }

}
