using AventusSharp.Tools.Attributes;
using Core.Permissions.Descriptions;

namespace Core.Permissions
{
    public enum DesktopPermission
    {
        CanEdit,
    }

    [Typescript]
    public class DesktopPermissionQuery : PermissionQuery<DesktopPermission>
    {

    }

    public class DesktopPermissionDescription : PermissionDescription<DesktopPermission>
    {
        protected override Dictionary<DesktopPermission, PermissionDescriptionItem> DefineDescription()
        {
            return new Dictionary<DesktopPermission, PermissionDescriptionItem>() {
                {
                    DesktopPermission.CanEdit,
                    new PermissionDescriptionItem() {
                        DisplayName = "Gestion de bureaux multiples",
                        Description = "Permet de gérer des bureaux virtuels"
                    }
                }
            };
        }
    }

}
