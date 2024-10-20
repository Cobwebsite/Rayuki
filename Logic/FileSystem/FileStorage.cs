using System.Text;
using AventusSharp.Data;
using AventusSharp.Tools;
using Path = System.IO.Path;

namespace Core.Logic.FileSystem
{

    public class FileStorage
    {
        public static string rootFolder
        {
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
                if (uri.StartsWith("/"))
                {
                    uri = uri.Substring(1);
                }
                string appUri = Path.GetFullPath(Path.Combine(Storage.rootFolder, AppName));
                string fullPath = Path.GetFullPath(Path.Combine(Storage.rootFolder, AppName, uri));
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
            if (uri.StartsWith("/"))
            {
                uri = uri.Substring(1);
            }
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

        public async Task<ResultWithError<bool>> Set(string uri, byte[] bytes)
        {
            ResultWithError<bool> result = new();
            result.Run(() => CheckPath(uri));

            if (!result.Success)
                return result;

            return await Storage.Set(GetPath(uri), bytes);
        }

        public async Task<ResultWithError<bool>> SetTxt(string uri, string text)
        {
            ResultWithError<bool> result = new();
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

        public ResultWithError<bool> DeleteFile(string uri)
        {
            ResultWithError<bool> result = new ResultWithError<bool>();
            result.Run(() => CheckPath(uri));

            if (!result.Success)
                return result;

            return Storage.DeleteFile(GetPath(uri));
        }


        public ResultWithError<bool> FileExists(string uri)
        {
            ResultWithError<bool> result = new ResultWithError<bool>();
            result.Run(() => CheckPath(uri));

            if (!result.Success)
                return result;

            return Storage.FileExists(GetPath(uri));
        }

        public ResultWithError<bool> CreateDir(string uri)
        {
            ResultWithError<bool> result = new ResultWithError<bool>();
            result.Run(() => CheckPath(uri));

            if (!result.Success)
                return result;

            return Storage.CreateDir(GetPath(uri));
        }

        public ResultWithError<bool> DeleteDir(string uri)
        {
            ResultWithError<bool> result = new ResultWithError<bool>();
            result.Run(() => CheckPath(uri));

            if (!result.Success)
                return result;

            return Storage.DeleteDir(GetPath(uri));
        }

        public ResultWithError<bool> Delete(string uri)
        {
            ResultWithError<bool> result = new ResultWithError<bool>();
            result.Run(() => CheckPath(uri));

            if (!result.Success)
                return result;

            return Storage.Delete(GetPath(uri));
        }

        public ResultWithError<FileDetails> GetFileInfo(string uri)
        {
            ResultWithError<FileDetails> result = new ResultWithError<FileDetails>();
            result.Run(() => CheckPath(uri));

            if (!result.Success)
                return result;

            return Storage.GetFileInfo(GetPath(uri));
        }

        public ResultWithError<List<FileDetails>> ReadDir(string uri)
        {
            ResultWithError<List<FileDetails>> result = new ResultWithError<List<FileDetails>>();
            result.Run(() => CheckPath(uri));

            if (!result.Success)
                return result;

            return Storage.ReadDir(GetPath(uri));
        }

        public ResultWithError<bool> Move(string uri, string toUri)
        {
            ResultWithError<bool> result = new ResultWithError<bool>();
            result.Run(() => CheckPath(uri));
            result.Run(() => CheckPath(toUri));

            if (!result.Success)
                return result;

            return Storage.Move(GetPath(uri), GetPath(toUri));
        }

    }

    internal class Storage
    {
        public static readonly string rootFolder = Path.Combine(Environment.CurrentDirectory, "Storage");
        private static List<IStorageValidator> plugins = new List<IStorageValidator>();

        protected static string CorrectUri(string uri)
        {
            if (uri.StartsWith("/"))
            {
                uri = uri.Substring(1);
            }
            return uri;
        }
        public static async Task<ResultWithError<byte[]>> Get(string uri)
        {
            uri = CorrectUri(uri);
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
            uri = CorrectUri(uri);
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

        public static async Task<ResultWithError<bool>> Set(string uri, byte[] bytes)
        {
            uri = CorrectUri(uri);
            ResultWithError<bool> result = new ResultWithError<bool>();
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
            result.Result = result.Success;
            return result;
        }

        public static async Task<ResultWithError<bool>> SetTxt(string uri, string txt)
        {
            return await Set(uri, Encoding.UTF8.GetBytes(txt));
        }
        public static ResultWithError<bool> SetFile(string uri, AventusFile file)
        {
            uri = CorrectUri(uri);
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

        public static ResultWithError<bool> Delete(string uri)
        {
            uri = CorrectUri(uri);
            uri = Path.GetFullPath(Path.Combine(rootFolder, uri));
            if (Directory.Exists(uri))
            {
                return DeleteDir(uri);
            }
            else
            {
                return DeleteFile(uri);
            }
        }
        public static ResultWithError<bool> DeleteFile(string uri)
        {
            uri = CorrectUri(uri);
            ResultWithError<bool> result = new();
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
            result.Result = result.Success;
            return result;
        }

        public static ResultWithError<bool> Move(string uri, string toUri)
        {
            uri = CorrectUri(uri);
            toUri = CorrectUri(toUri);
            ResultWithError<bool> result = new();
            result.Run(() => IsAllowed(uri, IsAllowedAction.Read));
            result.Run(() => IsAllowed(toUri, IsAllowedAction.Write));

            if (!result.Success)
                return result;

            uri = Path.GetFullPath(Path.Combine(rootFolder, uri));
            toUri = Path.GetFullPath(Path.Combine(rootFolder, toUri));
            // check exist
            if (File.Exists(uri))
            {
                try
                {
                    File.Move(uri, toUri, true);
                }
                catch (Exception e)
                {
                    result.Errors.Add(new StorageError(StorageErrorCode.UnknowError, e));
                }
            }
            result.Result = result.Success;
            return result;
        }
        public static ResultWithError<bool> FileExists(string uri)
        {
            uri = CorrectUri(uri);
            ResultWithError<bool> result = new();
            result.Run(() => IsAllowed(uri, IsAllowedAction.Read));

            if (!result.Success)
                return result;

            uri = Path.GetFullPath(Path.Combine(rootFolder, uri));
            result.Result = File.Exists(uri);

            return result;
        }

        public static ResultWithError<bool> CreateDir(string uri)
        {
            uri = CorrectUri(uri);
            ResultWithError<bool> result = new();
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

            result.Result = result.Success;
            return result;
        }

        public static ResultWithError<bool> DeleteDir(string uri)
        {
            uri = CorrectUri(uri);
            ResultWithError<bool> result = new();
            result.Run(() => IsAllowed(uri, IsAllowedAction.Delete));

            if (!result.Success)
                return result;

            uri = Path.GetFullPath(Path.Combine(rootFolder, uri));
            // check exist
            if (Directory.Exists(uri))
            {
                try
                {
                    Directory.Delete(uri, true);
                }
                catch (Exception e)
                {
                    result.Errors.Add(new StorageError(StorageErrorCode.UnknowError, e));
                }
            }
            result.Result = result.Success;
            return result;
        }

        public static ResultWithError<FileDetails> GetFileInfo(string uri)
        {
            uri = CorrectUri(uri);
            ResultWithError<FileDetails> result = new();
            result.Run(() => IsAllowed(uri, IsAllowedAction.Read));

            if (!result.Success)
                return result;

            try
            {
                uri = Path.GetFullPath(Path.Combine(rootFolder, uri));
                result.Result = FileDetails.Create(uri);
            }
            catch (Exception e)
            {
                result.Errors.Add(new StorageError(StorageErrorCode.UnknowError, e));
            }

            return result;
        }

        public static ResultWithError<List<FileDetails>> ReadDir(string uri)
        {
            uri = CorrectUri(uri);
            ResultWithError<List<FileDetails>> result = new();
            result.Run(() => IsAllowed(uri, IsAllowedAction.Read));

            if (!result.Success)
                return result;

            try
            {
                string fullUri = Path.GetFullPath(Path.Combine(rootFolder, uri));
                if (Directory.Exists(fullUri))
                {

                    string[] names = Directory.GetFileSystemEntries(fullUri);
                    result.Result = new List<FileDetails>();
                    foreach (string name in names)
                    {
                        ResultWithError<bool> queryAllowed = IsAllowed(Path.Combine(uri, name), IsAllowedAction.Read);
                        if (queryAllowed.Success && queryAllowed.Result)
                        {
                            string fullUri2 = Path.GetFullPath(Path.Combine(rootFolder, uri, name));
                            result.Result.Add(FileDetails.Create(fullUri2));
                        }
                    }
                }
                else
                {
                    result.Result = new List<FileDetails>();
                }
            }
            catch (Exception e)
            {
                result.Errors.Add(new StorageError(StorageErrorCode.UnknowError, e));
            }

            return result;
        }


        public static void Register(IStorageValidator plugin)
        {
            plugins.Add(plugin);
        }

        protected static ResultWithError<bool> IsAllowed(string uri, IsAllowedAction action)
        {
            ResultWithError<bool> result = new ResultWithError<bool>();
            string fullPath = Path.GetFullPath(Path.Combine(rootFolder, uri));
            if (!fullPath.StartsWith(rootFolder))
            {
                // error
                result.Errors.Add(new StorageError(StorageErrorCode.NotAllowed, "Vous n'êtes pas autorisée à voir ce contenu"));
                return result;
            }

            foreach (IStorageValidator plugin in plugins)
            {
                result.Run(() => plugin.IsAllowed(uri, action));
                if (!result.Success)
                {
                    break;
                }
            }
            result.Result = result.Success;
            return result;
        }


    }
}
