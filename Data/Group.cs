using AventusSharp.Data;

namespace Core.Data
{
    public class Group : Storable<Group>
    {
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";

        public List<User> Users { get; set; } = new List<User>();

        public Group? parentGroup { get; set; }
    }
}
