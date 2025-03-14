using AventusSharp.Tools.Attributes;
using Core.Permissions.Descriptions;

namespace Core.Permissions
{
    public enum DesktopPermission
    {
        CanHaveVirtualDesktop,
    }

    [Export]
    public class DesktopPermissionQuery : PermissionQuery<DesktopPermission>
    {
        public override PermissionDescription<DesktopPermission>? Description()
        {
            return new DesktopPermissionDescription();
        }
    }

    public class DesktopPermissionDescription : PermissionDescription<DesktopPermission>
    {
        protected override Dictionary<DesktopPermission, PermissionDescriptionItem> DefineDescription()
        {
            return new Dictionary<DesktopPermission, PermissionDescriptionItem>() {
                {
                    DesktopPermission.CanHaveVirtualDesktop,
                    new PermissionDescriptionItem() {
                        DisplayName = "Gestion de bureaux multiples",
                        Description = "Permet de gérer des bureaux virtuels"
                    }
                }
            };
        }
    }

}
