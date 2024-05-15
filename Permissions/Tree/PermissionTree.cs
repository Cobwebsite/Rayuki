using AventusSharp.Tools.Attributes;

namespace Core.Permissions.Tree
{
    [Typescript]
    public class PermissionTree
    {
        public string AppName { get; set; }

        public string IconTagName { get; set; }

        public int PermissionId { get; set; }

        public List<PermissionTreeItem> Permissions { get; set; } = new List<PermissionTreeItem>();
    }

    [Typescript]
    public class PermissionTreeItem
    {
        public string DisplayName { get; set; } = "";
        public string Description { get; set; } = "";
        public string EnumName { get; set; } = "";
        public Enum Value { get; set; }
        public int PermissionId { get; set; }
        public List<PermissionTreeItem> Permissions { get; set; } = new List<PermissionTreeItem>();
    }
}