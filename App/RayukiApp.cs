using Core.Migrations;
using Core.Permissions.Descriptions;

namespace Core.App
{
    public abstract class RayukiApp
    {
        internal List<Type> permissions;
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
        

        /// <summary>
        /// Define if the resource is accessible if the user isn't login
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public virtual bool LoginMiddleware(HttpRequest request, HttpContext context) {
            return false;
        }

        public virtual Seeder? DefineSeeder()
        {
            return null;
        }

        public virtual Migrator? DefineMigrator()
        {
            return null;
        }
    }
}
