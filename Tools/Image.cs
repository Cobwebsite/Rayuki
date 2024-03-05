using System.Runtime.CompilerServices;
using AventusSharp.Tools;
using AventusSharp.Tools.Attributes;
using Microsoft.VisualStudio.OLE.Interop;
using SkiaSharp;

namespace Core.Tools
{
    [Typescript("Errors")]
    public enum ImageFileErrorCode
    {
        UnknowError,
        NotValidImage
    }
    [Typescript("Errors")]
    public class ImageFileError : GenericError<ImageFileErrorCode>
    {
        public ImageFileError(ImageFileErrorCode code, string message, [CallerFilePath] string callerPath = "", [CallerLineNumber] int callerNo = 0) : base(code, message, callerPath, callerNo)
        {
        }

        public ImageFileError(ImageFileErrorCode code, Exception e, [CallerFilePath] string callerPath = "", [CallerLineNumber] int callerNo = 0) : base(code, e, callerPath, callerNo)
        {
        }
    }

    public class VoidWithImageFileError : VoidWithError<ImageFileError> { }
    public class ResultWithImageFileError<T> : ResultWithError<T, ImageFileError> { }
    public static class Image
    {
        public static ResultWithImageFileError<string> Compress(string path, int maxSize)
        {
            ResultWithImageFileError<string> result = new ResultWithImageFileError<string>();
            try
            {
                long previousSize = new FileInfo(path).Length;
                using SKBitmap skImage = SKBitmap.Decode(new FileStream(path, FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.None));

                int sourceWidth = skImage.Width;
                // Get the image current height
                int sourceHeight = skImage.Height;
                if (sourceHeight < maxSize && sourceWidth < maxSize)
                {
                    return result;
                }
                float nPercent = 0;
                float nPercentW = 0;
                float nPercentH = 0;
                // Calculate width and height with new desired size
                nPercentW = (float)maxSize / (float)sourceWidth;
                nPercentH = (float)maxSize / (float)sourceHeight;
                nPercent = Math.Min(nPercentW, nPercentH);
                // New Width and Height
                int destWidth = (int)(sourceWidth * nPercent);
                int destHeight = (int)(sourceHeight * nPercent);
                using SKBitmap scaledBitmap = skImage.Resize(new SKImageInfo(destWidth, destHeight), SKFilterQuality.None);
                using SKImage image = SKImage.FromBitmap(scaledBitmap);
                using SKData encodedImage = image.Encode(SKEncodedImageFormat.Webp, 75);

                if (encodedImage.Size < previousSize)
                {
                    List<string> pathPng = path.Split('.').ToList();
                    pathPng.RemoveAt(pathPng.Count - 1);
                    pathPng.Add("webp");
                    string newPath = string.Join(".", pathPng);

                    FileStream fs = new FileStream(newPath, FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.None);

                    encodedImage.SaveTo(fs);

                    if (newPath != path)
                    {
                        File.Delete(path);
                    }
                    fs.Close();
                    fs.Dispose();
                    result.Result = newPath;
                }
                else
                {
                    result.Result = path;
                }

            }
            catch (Exception e)
            {
                result.Errors.Add(new ImageFileError(ImageFileErrorCode.UnknowError, e));
            }
            return result;

        }
    }
}
