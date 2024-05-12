using Core.Logic;
using Core.Permissions.Descriptions;

namespace Core.App
{
    public abstract class RayukiApp
    {
        internal Action<Type, PermissionDescription?> action;
        public virtual Task OnStart()
        {
            return Task.CompletedTask;
        }

        public virtual Task OnStop()
        {
            return Task.CompletedTask;
        }

        public abstract int Version();
        public abstract string DisplayName();
        public virtual void DefinePermissions()
        {

        }

        public virtual Seeder? DefineSeeder()
        {
            return null;
        }
        protected void RegisterPermissions<T, U>() where T : Enum where U : PermissionDescription<T>
        {
            object? description = Activator.CreateInstance(typeof(U));
            if (description is PermissionDescription<T> descriptionCasted)
            {
                action(typeof(T), descriptionCasted);
            }
            else {
                action(typeof(T), null);
            }
        }
        protected void RegisterPermissions<T>() where T : Enum
        {
            action(typeof(T), null);
        }
    }
}
