using AventusSharp.Data;
using AventusSharp.Data.Attributes;
using AventusSharp.Tools.Attributes;

namespace Core.Data
{
    public class Group : Storable<Group>
    {
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public bool AssignationAuto { get; set; } = false;

        public List<User> Users { get; set; } = new List<User>();
    }
}
