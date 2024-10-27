using Core.Migrations;
using Core.Permissions.Descriptions;

namespace Core.App
{
    public abstract class RayukiPlugin
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


        /// <summary>
        /// Define if the resource is accessible if the user isn't login
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public virtual bool LoginMiddleware(HttpRequest request, HttpContext context) {
            return false;
        }


        public virtual Migrator? DefineMigrator()
        {
            return null;
        }
    }
}
