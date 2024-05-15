using AventusSharp.Data;
using AventusSharp.Data.Attributes;

namespace Core.Data
{
    public class PermissionGroup : Storable<PermissionGroup>
    {
        public Permission Permission { get; set; }

        [ForeignKey<Group>]
        public int GroupId { get; set; }
    }
}
