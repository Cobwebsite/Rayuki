using AventusSharp.Data;

namespace Core.Data
{
    //exist only if have permission => deny first strategy
    public class PermissionUser : Storable<PermissionUser>
    {
        public Permission Permission { get; set; }

        public User User { get; set; }
    }
}
