using AventusSharp.Data;
using AventusSharp.Data.Attributes;

namespace Core.Data
{
    // exist only if have permission => deny first strategy
    // mabye add true or false to override deny first strategy to have a better management with group 
    public class PermissionUser : Storable<PermissionUser>
    {
        public Permission Permission { get; set; }

        [ForeignKey<User>]
        public int UserId { get; set; }

        public bool Allow { get; set; }
    }
}
