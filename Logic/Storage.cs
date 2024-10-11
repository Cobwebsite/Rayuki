using AventusSharp.Data;
using AventusSharp.Data.Manager;
using AventusSharp.Data.Manager.DB;
using AventusSharp.Routes.Attributes;

namespace Core.Logic
{
    
    public interface IStoragePlugin
    {
        Task<bool> IsAllowedRead(string uri);
        Task<bool> IsAllowedWrite(string uri);
    }
    public class Storage
    {
        private static readonly string rootFolder = System.IO.Path.Combine(Environment.CurrentDirectory, "Storage");
        private static List<IStoragePlugin> plugins = new List<IStoragePlugin>();
        public static async Task Get(string uri)
        {
            if (!await IsAllowedRead(uri))
            {
                return;
            }

            // check exist

            // return file content => byte or txt??
        }

        public static async Task Set(string uri)
        {
            if (!await IsAllowedWrite(uri))
            {
                return;
            }
        }

        public static void Register(IStoragePlugin plugin)
        {
            plugins.Add(plugin);
        }

        protected static async Task<bool> IsAllowedRead(string uri)
        {
            foreach (IStoragePlugin plugin in plugins)
            {
                if (!await plugin.IsAllowedRead(uri))
                {
                    return false;
                }
            }
            return true;
        }

        protected static async Task<bool> IsAllowedWrite(string uri)
        {
            foreach (IStoragePlugin plugin in plugins)
            {
                if (!await plugin.IsAllowedRead(uri))
                {
                    return false;
                }
            }
            return true;
        }
    }

    public class FileStorage
    {
        public static FileStorage Get<T>()
        {
            return new FileStorage(typeof(T));
        }

        private string AppName { get; set; }
        private FileStorage(Type type)
        {
            AppName = type.Assembly.GetName().Name ?? "";
        }

        public void LoadFile(string uri)
        {
            Storage.Get(AppName + uri);
        }

        // AppFileStorage.LoadFile(url);
        //    AppFileStorage.SaveFile(url);
        //    AppFileStorage.DeleteFile(url);
        //    AppFileStorage.FileExist(url);
        //    AppFileStorage.MakeDir(url);
        //    AppFileStorage.DeleteDir(url);
        //    AppFileStorage.FileInfo(url);
    }
}
