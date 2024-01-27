using AventusSharp.Data;

namespace Core.Data
{
    public class PermissionGroup : Storable<PermissionUser>
    {
        public Permission Permission { get; set; }

        public Group Group { get; set; }
    }
}
