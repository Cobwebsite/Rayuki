using AventusSharp.Data;
using AventusSharp.Data.Attributes;
using AventusSharp.Tools.Attributes;
using Core.Logic;
using Nullable = AventusSharp.Data.Attributes.Nullable;

namespace Core.Data
{
    public class Desktop : Storable<Desktop>
    {
        public string Name { get; set; }

        public string Background { get; set; }

        [ForeignKey<User>, Nullable]
        public int? UserId { get; set; }

        public bool SyncDesktop { get; set; } = false;

        [NotInDB]
        public List<DesktopAppIcon> Icons { get => DesktopDM.GetInstance().GetDesktopIcons(Id); }

        [NotInDB]
        public List<ApplicationOpen> Applications { get => DesktopDM.GetInstance().GetOpenApps(Id); }
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
