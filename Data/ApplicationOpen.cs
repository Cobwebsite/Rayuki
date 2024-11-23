
using AventusSharp.Data.Attributes;
using AventusSharp.Tools.Attributes;

namespace Core.Data
{
    [Export]
    public class ApplicationOpen
    {
        public string id { get => applicationName + "$" + number; }
        public string applicationName { get; set; }
        public int number { get; set; }

        #region size
        //public int top { get; set; }
        //public int left { get; set; }
        //public int height { get; set; }
        //public int width { get; set; }
        //public bool isFullScreen { get; set; }
        #endregion

        [Size(SizeEnum.Text)]
        public string history { get; set; }

        public bool isHidden { get; set; }
    }

    [Export]
    public class ApplicationOpenInfo
    {
        public int DesktopId { get; set; }

        public ApplicationOpen Info { get; set; }
    }
}
