using System.Runtime.CompilerServices;
using System.Text;
using AventusSharp.Data;
using AventusSharp.Tools;
using AventusSharp.Tools.Attributes;
using Path = System.IO.Path;

namespace Core.Logic
{
    public enum IsAllowedAction
    {
        Read,
        Write,
        Delete
    }
    public interface IStoragePlugin
    {
        VoidWithError IsAllowed(string uri, IsAllowedAction action);
    }
    internal class Storage
    {
        public static readonly string rootFolder = Path.Combine(Environment.CurrentDirectory, "Storage");
        private static List<IStoragePlugin> plugins = new List<IStoragePlugin>();
        public static async Task<ResultWithError<byte[]>> Get(string uri)
        {
            ResultWithError<byte[]> result = new ResultWithError<byte[]>();
            result.Run(() => IsAllowed(uri, IsAllowedAction.Read));
            if (!result.Success)
                return result;

            uri = Path.GetFullPath(Path.Combine(rootFolder, uri));
            // check exist
            if (!File.Exists(uri))
            {
                result.Errors.Add(new StorageError(StorageErrorCode.NotFound, "Le fichier n'a pas pu être trouvé : " + uri));
                return result;
            }
            try
            {
                result.Result = await File.ReadAllBytesAsync(uri);
            }
            catch (Exception e)
            {
                result.Errors.Add(new StorageError(StorageErrorCode.UnknowError, e));
            }
            return result;
        }

        public static async Task<ResultWithError<string>> GetTxt(string uri)
        {
            ResultWithError<string> result = new ResultWithError<string>();
            ResultWithError<byte[]> getByte = await Get(uri);
            if (!getByte.Success || getByte.Result == null)
            {
                result.Errors = getByte.Errors;
                return result;
            }

            result.Result = Encoding.UTF8.GetString(getByte.Result);

            return result;
        }

        public static async Task<VoidWithError> Set(string uri, byte[] bytes)
        {
            VoidWithError result = new VoidWithError();
            result.Run(() => IsAllowed(uri, IsAllowedAction.Write));

            if (!result.Success)
                return result;

            uri = Path.GetFullPath(Path.Combine(rootFolder, uri));
            try
            {
                await File.WriteAllBytesAsync(uri, bytes);
            }
            catch (Exception e)
            {
                result.Errors.Add(new StorageError(StorageErrorCode.UnknowError, e));
            }
            return result;
        }

        public static async Task<VoidWithError> SetTxt(string uri, string txt)
        {
            return await Set(uri, Encoding.UTF8.GetBytes(txt));
        }
        public static ResultWithError<bool> SetFile(string uri, AventusFile file)
        {
            ResultWithError<bool> result = new ResultWithError<bool>();
            result.Run(() => IsAllowed(uri, IsAllowedAction.Write));

            if (!result.Success)
                return result;

            uri = Path.GetFullPath(Path.Combine(rootFolder, uri));
            try
            {
                result.Execute(() => file.SaveToFileOnUpload(uri));
            }
            catch (Exception e)
            {
                result.Errors.Add(new StorageError(StorageErrorCode.UnknowError, e));
            }
            return result;
        }


        public static VoidWithError Delete(string uri)
        {
            VoidWithError result = new();
            result.Run(() => IsAllowed(uri, IsAllowedAction.Delete));

            if (!result.Success)
                return result;

            uri = Path.GetFullPath(Path.Combine(rootFolder, uri));
            // check exist
            if (File.Exists(uri))
            {
                try
                {
                    File.Delete(uri);
                }
                catch (Exception e)
                {
                    result.Errors.Add(new StorageError(StorageErrorCode.UnknowError, e));
                }
            }

            return result;
        }

        public static ResultWithError<bool> FileExists(string uri)
        {
            ResultWithError<bool> result = new();
            result.Run(() => IsAllowed(uri, IsAllowedAction.Read));

            if (!result.Success)
                return result;

            uri = Path.GetFullPath(Path.Combine(rootFolder, uri));
            result.Result = File.Exists(uri);

            return result;
        }

        public static VoidWithError CreateDir(string uri)
        {
            VoidWithError result = new();
            result.Run(() => IsAllowed(uri, IsAllowedAction.Write));

            if (!result.Success)
                return result;

            try
            {
                uri = Path.GetFullPath(Path.Combine(rootFolder, uri));
                Directory.CreateDirectory(uri);
            }
            catch (Exception e)
            {
                result.Errors.Add(new StorageError(StorageErrorCode.UnknowError, e));
            }

            return result;
        }

        public static VoidWithError DeleteDir(string uri)
        {
            VoidWithError result = new();
            result.Run(() => IsAllowed(uri, IsAllowedAction.Delete));

            if (!result.Success)
                return result;

            uri = Path.GetFullPath(Path.Combine(rootFolder, uri));
            // check exist
            if (Directory.Exists(uri))
            {
                try
                {
                    Directory.Delete(uri);
                }
                catch (Exception e)
                {
                    result.Errors.Add(new StorageError(StorageErrorCode.UnknowError, e));
                }
            }

            return result;
        }


        public static void Register(IStoragePlugin plugin)
        {
            plugins.Add(plugin);
        }

        protected static VoidWithError IsAllowed(string uri, IsAllowedAction action)
        {
            VoidWithError result = new VoidWithError();
            string fullPath = Path.GetFullPath(Path.Combine(rootFolder, uri));
            if (!fullPath.StartsWith(rootFolder))
            {
                // error
                result.Errors.Add(new StorageError(StorageErrorCode.NotAllowed, "Vous n'êtes pas autorisée à voir ce contenu"));
                return result;
            }

            foreach (IStoragePlugin plugin in plugins)
            {
                result.Run(() => plugin.IsAllowed(uri, action));
                if (!result.Success)
                {
                    break;
                }
            }
            return result;
        }

    }

    public class FileStorage
    {
        public static string rootFolder {
            get => Storage.rootFolder;
        }
        public static FileStorage Get<T>()
        {
            return new FileStorage(typeof(T));
        }
        public static FileStorage Get()
        {
            return new FileStorage("");
        }

        public static FileStorage GetCore()
        {
            return new FileStorage();
        }

        private string AppName { get; set; } = "";
        private FileStorage()
        {
            AppName = "Core";
        }
        private FileStorage(string appName)
        {
            AppName = appName;
        }
        private FileStorage(Type type)
        {
            AppName = type.Assembly.GetName().Name ?? "";
        }

        protected VoidWithError CheckPath(string uri)
        {
            VoidWithError result = new VoidWithError();
            if (!string.IsNullOrEmpty(AppName))
            {
                string appUri = Path.GetFullPath(Path.Combine(Storage.rootFolder, AppName));
                string fullPath = Path.GetFullPath(Path.Combine(Storage.rootFolder, AppName, uri));
                Console.WriteLine(appUri);
                Console.WriteLine(fullPath);
                if (!fullPath.StartsWith(appUri))
                {
                    result.Errors.Add(new StorageError(StorageErrorCode.NotAllowed, "Vous ne pouvez pas travailler sur un fichier hors de l'application"));
                    return result;
                }
            }
            return result;
        }

        protected string GetPath(string uri)
        {
            if (!string.IsNullOrEmpty(AppName))
            {
                return Path.Combine(AppName, uri);
            }
            return uri;
        }

        public async Task<ResultWithError<byte[]>> Get(string uri)
        {
            ResultWithError<byte[]> result = new ResultWithError<byte[]>();
            result.Run(() => CheckPath(uri));

            if (!result.Success)
                return result;

            return await Storage.Get(GetPath(uri));
        }

        public async Task<ResultWithError<string>> GetTxt(string uri)
        {
            ResultWithError<string> result = new ResultWithError<string>();
            result.Run(() => CheckPath(uri));

            if (!result.Success)
                return result;

            return await Storage.GetTxt(GetPath(uri));
        }

        public async Task<VoidWithError> Set(string uri, byte[] bytes)
        {
            VoidWithError result = new();
            result.Run(() => CheckPath(uri));

            if (!result.Success)
                return result;

            return await Storage.Set(GetPath(uri), bytes);
        }

        public async Task<VoidWithError> SetTxt(string uri, string text)
        {
            VoidWithError result = new();
            result.Run(() => CheckPath(uri));

            if (!result.Success)
                return result;

            return await Storage.SetTxt(GetPath(uri), text);
        }

        public ResultWithError<bool> SetFile(string uri, AventusFile file)
        {
            ResultWithError<bool> result = new();
            result.Run(() => CheckPath(uri));

            if (!result.Success)
                return result;

            return Storage.SetFile(GetPath(uri), file);
        }

        public VoidWithError Delete(string uri)
        {
            VoidWithError result = new VoidWithError();
            result.Run(() => CheckPath(uri));

            if (!result.Success)
                return result;

            return Storage.Delete(GetPath(uri));
        }


        public ResultWithError<bool> FileExists(string uri)
        {
            ResultWithError<bool> result = new ResultWithError<bool>();
            result.Run(() => CheckPath(uri));

            if (!result.Success)
                return result;

            return Storage.FileExists(GetPath(uri));
        }

        public VoidWithError CreateDir(string uri)
        {
            VoidWithError result = new VoidWithError();
            result.Run(() => CheckPath(uri));

            if (!result.Success)
                return result;

            return Storage.CreateDir(GetPath(uri));
        }

        public VoidWithError DeleteDir(string uri)
        {
            VoidWithError result = new VoidWithError();
            result.Run(() => CheckPath(uri));

            if (!result.Success)
                return result;

            return Storage.DeleteDir(GetPath(uri));
        }

        //    AppFileStorage.FileInfo(url);
    }


    [Typescript("Errors")]
    public enum StorageErrorCode
    {
        UnknowError,
        NotAllowed,
        NotFound
    }

    [Typescript("Errors")]
    public class StorageError : GenericError<StorageErrorCode>
    {
        public StorageError(StorageErrorCode code, string message, [CallerFilePath] string callerPath = "", [CallerLineNumber] int callerNo = 0) : base(code, message, callerPath, callerNo)
        {
        }

        public StorageError(StorageErrorCode code, Exception e, [CallerFilePath] string callerPath = "", [CallerLineNumber] int callerNo = 0) : base(code, e, callerPath, callerNo)
        {
        }
    }

}
