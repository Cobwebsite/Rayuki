using AventusSharp.Tools.Attributes;
using Core.Permissions.Descriptions;

namespace Core.Permissions
{
    public enum ApplicationPermission
    {
        DenyAccess
    }

    [Typescript]
    public class ApplicationPermissionQuery : PermissionQuery<ApplicationPermission>
    {

    }

    public class ApplicationPermissionDescription : PermissionDescription<ApplicationPermission>
    {
        public override bool isEditable()
        {
            return false;
        }

        protected override Dictionary<ApplicationPermission, PermissionDescriptionItem> DefineDescription()
        {
             return new Dictionary<ApplicationPermission, PermissionDescriptionItem>() {
                {
                    ApplicationPermission.DenyAccess,
                    new PermissionDescriptionItem() {
                        DisplayName = "",
                        Description = ""
                    }
                }
            };
        }
    }
}
