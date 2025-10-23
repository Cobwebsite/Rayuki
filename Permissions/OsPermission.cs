using AventusSharp.Tools.Attributes;
using Core.Permissions.Descriptions;

namespace Core.Permissions;

public enum OsPermission
{
    ConnectAs,
    ReorderApps,
    QuickAuth,
    CanHaveVirtualDesktop,
    PassKey,
}

[Export]
public class OsPermissionQuery : PermissionQuery<OsPermission>
{

    public override PermissionDescription<OsPermission>? Description()
    {
        return new OsPermissionDescription();
    }
}
public class OsPermissionDescription : PermissionDescription<OsPermission>
{
    protected override Dictionary<OsPermission, PermissionDescriptionItem> DefineDescription()
    {
        return new Dictionary<OsPermission, PermissionDescriptionItem>() {
                {
                    OsPermission.ConnectAs,
                    new PermissionDescriptionItem() {
                        DisplayName = "Connect en tant que",
                        Description = "Permet à l'utilisateur de se connecter en tant que"
                    }
                },
                {
                    OsPermission.ReorderApps,
                    new PermissionDescriptionItem() {
                        DisplayName = "Réorganisation des apps",
                        Description = "Permet à l'utilisateur de réorganiser l'ordre d'apparition des applications"
                    }
                },
                {
                    OsPermission.QuickAuth,
                    new PermissionDescriptionItem() {
                        DisplayName = "Autorisation des connexions permanentes",
                        Description = "Permet à l'utilisateur de rester connecter de manière permanente"
                    }
                },
                {
                    OsPermission.CanHaveVirtualDesktop,
                    new PermissionDescriptionItem() {
                        DisplayName = "Gestion de bureaux multiples",
                        Description = "Permet de gérer des bureaux virtuels"
                    }
                }
            };
    }
}