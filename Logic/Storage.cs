using AventusSharp.Data;
using AventusSharp.Data.Manager;
using AventusSharp.Data.Manager.DB;
using AventusSharp.Routes.Attributes;

namespace Core.Logic
{
    public interface IStoragePlugin
    {
        Task<bool> IsAllowed(string uri);
    }
    public class Storage
    {
        private static readonly string rootFolder = System.IO.Path.Combine(Environment.CurrentDirectory, "Storage");
        private static List<IStoragePlugin> plugins = new List<IStoragePlugin>();
        public static void Get(string uri)
        {

        }

        public static void Register(IStoragePlugin plugin)
        {
            plugins.Add(plugin);
        }

        protected static async Task<bool> IsAllowed(string uri)
        {
            foreach (IStoragePlugin plugin in plugins)
            {
                if (!(await plugin.IsAllowed(uri)))
                {
                    return false;
                }
            }
            return true;
        }
    }
}
