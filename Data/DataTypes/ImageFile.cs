using AventusSharp.Data;
using AventusSharp.Routes.Request;
using AventusSharp.Tools;
using AventusSharp.Tools.Attributes;
using Core.Logic.FileSystem;
using Core.Tools;
using FileTypeChecker;
using FileTypeChecker.Extensions;

namespace Core.Data.DataTypes
{
    [Export]
    public abstract class ImageFile<T> : GenericFile<T> where T : IStorable
    {

        public override ResultWithError<bool> Save(T instance, HttpFile Upload)
        {
            ResultWithError<bool> result = IsImg(Upload);
            result.Run(() => Compress(DefineMaxSize(), Upload).ToGeneric());
            result.Run(() => base.Save(instance, Upload));
            return result;
        }
        protected abstract ImageSize? DefineMaxSize();
        protected VoidWithImageFileError Compress(ImageSize? maxSize, HttpFile Upload)
        {
            VoidWithImageFileError result = new VoidWithImageFileError();
            try
            {
                if (maxSize == null || (maxSize.Height == null && maxSize.Width == null))
                {
                    return result;
                }
                if (Upload == null)
                    return result;
                ResultWithImageFileError<string> compressAction = Image.Compress(Upload.FilePath, maxSize.Height, maxSize.Width);
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
        protected ResultWithError<bool> IsImg(HttpFile Upload)
        {
            if (Upload.FilePath.EndsWith(".svg"))
            {
                return Image.IsSvg(Upload.FilePath).ToGeneric();
            }

            bool isValidImg = false;
            FileStream fileStream = File.OpenRead(Upload.FilePath);
            if (FileTypeValidator.IsTypeRecognizable(fileStream))
            {
                isValidImg = fileStream.IsImage();
            }
            fileStream.Close();
            fileStream.Dispose();

            return new ResultWithError<bool>()
            {
                Result = isValidImg,
                Errors = isValidImg ? new() : new() {
                    new ImageFileError(ImageFileErrorCode.NotValidImage, "The file " + Upload.FileName + " isn't valid")
                }
            };

        }

    }

    public class ImageSize
    {
        public static ImageSize Size(int value)
        {
            return new ImageSize() { Width = value, Height = value };
        }
        public int? Width;
        public int? Height;
    }
}
