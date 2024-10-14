using AventusSharp.Data;
using AventusSharp.Tools;
using AventusSharp.Tools.Attributes;
using Core.Logic.FileSystem;
using Core.Tools;
using FileTypeChecker;
using FileTypeChecker.Extensions;

namespace Core.Data.DataTypes
{
    [Typescript]
    public class ImageFile : AventusFile
    {

        public ImageFile()
        {
            this.Uri = DefineDefaultUri();
        }
        public override void SetUriFromStorage(string uri)
        {
            Uri = string.IsNullOrEmpty(uri) ? DefineDefaultUri() : uri;
        }

        protected virtual string DefineDefaultUri()
        {
            return "";
        }

        public ResultWithError<bool> SaveToFolderOnUpload(string folderPath, FileStorage storage)
        {
            if (Upload == null)
            {
                ResultWithError<bool> resultTemp = new ResultWithError<bool>();
                resultTemp.Result = true;
                return resultTemp;
            }
            string savePath = Path.Combine(folderPath, Upload.FileName);
            ResultWithError<bool> result = storage.SetFile(savePath, this);
            return result;
        }

        public ResultWithError<bool> SaveToFileOnUpload(string filePath, FileStorage storage)
        {
            if (Upload == null)
            {
                ResultWithError<bool> resultTemp = new ResultWithError<bool>();
                resultTemp.Result = true;
                return resultTemp;
            }
            ResultWithError<bool> result = storage.SetFile(filePath, this);
            return result;
        }

        public VoidWithError ValidateAndSaveAsFile(string filePath, int? maxSize = null, FileStorage? storage = null)
        {
            if (Upload == null)
            {
                return new VoidWithError();
            }

            VoidWithError result = Validate(maxSize).ToGeneric();
            if (result.Errors.Count > 0)
            {
                return result;
            }

            if (storage == null)
            {
                result.Errors = SaveToFileOnUpload(filePath).Errors;
            }
            else
            {
                result.Errors = SaveToFileOnUpload(filePath, storage).Errors;
            }
            if (result.Errors.Count > 0)
            {
                return result;
            }

            UploadToUri();
            Upload = null;

            return result;
        }
        public VoidWithError ValidateAndSaveToDir(string dirPath, int? maxSize = null, FileStorage? storage = null)
        {
            if (Upload == null)
            {
                return new VoidWithError();
            }

            VoidWithError result = Validate(maxSize).ToGeneric();
            if (result.Errors.Count > 0)
            {
                return result;
            }
            if (storage != null)
            {
                result.Errors = SaveToFolderOnUpload(dirPath, storage).Errors;
            }
            else
            {
                result.Errors = SaveToFolderOnUpload(dirPath).Errors;
            }
            if (result.Errors.Count > 0)
            {
                return result;
            }

            UploadToUri();
            Upload = null;

            return result;

        }

        protected void UploadToUri()
        {
            if (Upload != null)
            {
                Uri = Upload.FilePath
                .Replace(HttpServer.wwwroot, "")
                .Replace(Storage.rootFolder, "/storage")
                .Replace("\\", "/");
            }
        }

        public VoidWithImageFileError Compress(int maxSize)
        {
            VoidWithImageFileError result = new VoidWithImageFileError();
            try
            {
                if (Upload == null)
                    return result;
                ResultWithImageFileError<string> compressAction = Image.Compress(Upload.FilePath, maxSize);
                if (!compressAction.Success || compressAction.Result == null)
                {
                    result.Errors.AddRange(compressAction.Errors);
                    return result;
                }

                Upload.FilePath = compressAction.Result;
                Upload.FileName = Path.GetFileName(Upload.FilePath);

                return result;
            }
            catch (Exception e)
            {
                result.Errors.Add(new ImageFileError(ImageFileErrorCode.UnknowError, e));
            }
            return result;
        }

        public VoidWithImageFileError Validate(int? maxSize = null)
        {
            VoidWithImageFileError result = new VoidWithImageFileError();
            if (Upload == null)
            {
                return result;
            }

            bool isValidImg = false;
            FileStream fileStream = File.OpenRead(Upload.FilePath);

            if (FileTypeValidator.IsTypeRecognizable(fileStream))
            {
                isValidImg = fileStream.IsImage();
            }
            fileStream.Close();
            fileStream.Dispose();

            if (!isValidImg)
            {
                result.Errors.Add(new ImageFileError(ImageFileErrorCode.NotValidImage, "The file " + Upload.FileName + " isn't valid"));
                return result;
            }

            if (maxSize != null)
            {
                return Compress((int)maxSize);
            }

            return result;
        }
    }
}
