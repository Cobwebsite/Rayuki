namespace Core.Data.DataTypes;

using System.Runtime.CompilerServices;
using AventusSharp.Data;
using AventusSharp.Routes.Request;
using AventusSharp.Tools;
using AventusSharp.Tools.Attributes;
using Core.Logic.FileSystem;
using FileTypeChecker;
using FileTypeChecker.Abstracts;

[Export]
public abstract class GenericFile<T> : AventusSharp.Data.CustomTableMembers.GenericFile<T> where T : IStorable
{
    public GenericFile()
    {
        Uri = DefineDefaultUri();
    }
    public override void SetUriFromStorage(string uri)
    {
        Uri = string.IsNullOrEmpty(uri) ? DefineDefaultUri() : uri;
    }
    public override sealed ResultWithError<bool> BeforeSave(T instance)
    {
        if (Upload == null)
        {
            return new() { Result = true };
        }
        return Save(instance, Upload);
    }
    public virtual ResultWithError<bool> Save(T instance, HttpFile Upload)
    {
        ResultWithError<bool> result;
        FileStorage? storage = DefineStorage(instance);
        string savePath = Path.Combine(DefineDirectory(instance), DefineFileName(instance, Upload));
        if (storage != null)
        {
            result = storage.SetFile(savePath, this);
        }
        else
        {
            result = Upload.MoveWithError(savePath).ToGeneric();
        }
        Uri = savePath
            .Replace(HttpServer.wwwroot, "")
            .Replace(Storage.rootFolder, "/storage")
            .Replace("\\", "/");
        this.Upload = null;
        return result;
    }
    protected override sealed string DefineFileSave(HttpFile file)
    {
        throw new NotImplementedException();
    }

    protected abstract FileStorage? DefineStorage(T instance);
    protected abstract string DefineDirectory(T instance);
    protected virtual string DefineFileName(T instance, HttpFile file)
    {
        return file.FileName;
    }
    protected virtual string DefineDefaultUri()
    {
        return "";
    }

    public VoidWithError Download(T instance, string uri)
    {
        // TODO ecrire le code de Download
        VoidWithError result = new VoidWithError();
        try
        {
            if (string.IsNullOrEmpty(uri) || !uri.StartsWith("http"))
            {
                result.Errors.Add(new FileError(FileErrorCode.InvalidUri, "L'URI fourni est invalide."));
                return result;
            }


            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = client.GetAsync(uri).Result;
                if (!response.IsSuccessStatusCode)
                {
                    result.Errors.Add(new FileError(FileErrorCode.DownloadFailed, $"Échec du téléchargement depuis {uri}."));
                    return result;
                }

                string fileName = Path.GetFileName(uri).Split("?").First();
                byte[] fileBytes = response.Content.ReadAsByteArrayAsync().Result;
                try
                {
                    IFileType fileType = FileTypeValidator.GetFileType(fileBytes);
                    fileName = fileName.Split(".").First() + "." + fileType.Extension;
                }
                catch { }

                string tempFolder = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "temp");
                if (!Directory.Exists(tempFolder))
                {
                    Directory.CreateDirectory(tempFolder);
                }
                string filePath = Path.Combine(tempFolder, fileName);
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }

                File.WriteAllBytes(filePath, fileBytes);
                Upload = new HttpFile("download", fileName, filePath, response.Content.Headers.ContentType?.ToString() ?? "application/octet-stream");
                
                ResultWithError<bool> saveResult = Save(instance, Upload);

                if (!saveResult.Success || !saveResult.Result)
                {
                    result.Errors.AddRange(saveResult.Errors);
                }
            }
        }
        catch (Exception ex)
        {
            result.Errors.Add(new FileError(FileErrorCode.DownloadFailed, ex));
        }

        return result;
    }
}


[Export]
public enum FileErrorCode
{
    InvalidUri,
    DownloadFailed
}

public class FileError : GenericError<FileErrorCode>
{
    public FileError(FileErrorCode code, string message, [CallerFilePath] string callerPath = "", [CallerLineNumber] int callerNo = 0) : base(code, message, callerPath, callerNo)
    {
    }

    public FileError(FileErrorCode code, Exception exception, [CallerFilePath] string callerPath = "", [CallerLineNumber] int callerNo = 0) : base(code, "", callerPath, callerNo)
    {
        Message = exception.Message;
    }
}