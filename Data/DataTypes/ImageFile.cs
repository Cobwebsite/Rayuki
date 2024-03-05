using System.Runtime.CompilerServices;
using AventusSharp.Data;
using AventusSharp.Tools;
using AventusSharp.Tools.Attributes;
using Core.Tools;
using FileTypeChecker;
using FileTypeChecker.Abstracts;
using FileTypeChecker.Extensions;
using FileTypeChecker.Types;
using SkiaSharp;

namespace Core.Data.DataTypes
{
    [Typescript]
    public class ImageFile : AventusFile
    {
        public VoidWithError ValidateAndSaveAsFile(string filePath, int? maxSize = null)
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

            result.Errors = SaveToFileOnUpload(filePath).Errors;
            if (result.Errors.Count > 0)
            {
                return result;
            }

            Uri = Upload.FilePath.Replace(HttpServer.wwwroot, "").Replace("\\", "/");
            Upload = null;

            return result;
        }
        public VoidWithError ValidateAndSaveToDir(string dirPath, int? maxSize = null)
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

            result.Errors = SaveToFolderOnUpload(dirPath).Errors;
            if (result.Errors.Count > 0)
            {
                return result;
            }

            Uri = Upload.FilePath.Replace(HttpServer.wwwroot, "").Replace("\\", "/");
            Upload = null;

            return result;

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
