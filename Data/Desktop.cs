using AventusSharp.Data;
using AventusSharp.Data.Attributes;
using AventusSharp.Tools.Attributes;
using Core.Logic;
using Nullable = AventusSharp.Data.Attributes.Nullable;

namespace Core.Data
{
    public enum BackgroundSize
    {
        Cover,
        Contain,
        ContainNoRepeat

    }
    public class Desktop : Storable<Desktop>
    {
        public string Name { get; set; }


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
        public string Background { get; set; } = "/img/default_wp.png";
        public BackgroundSize BackgroundSize { get; set; } = BackgroundSize.Cover;
        public bool SyncDesktop { get; set; } = false;

        public int SizeMobile { get; set; } = 75;
        public int SizeTablet { get; set; } = 75;
        public int SizeDesktop { get; set; } = 40;
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
