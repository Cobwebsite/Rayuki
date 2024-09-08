using System.Runtime.CompilerServices;
using System.Text;
using AventusSharp.Tools;
using AventusSharp.Tools.Attributes;
using Microsoft.VisualStudio.OLE.Interop;
using SkiaSharp;
using SkiaSharp.Extended.Svg;
using SKSvg = SkiaSharp.Extended.Svg.SKSvg;

namespace Core.Tools
{
    [Typescript("Errors")]
    public enum ImageFileErrorCode
    {
        UnknowError,
        NotValidImage,
        FileNotSvg,
        NoSize,
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
                ResultWithImageFileError<bool> isSvgResult = IsSvg(path);
                if (!isSvgResult.Success)
                {
                    result.Errors = isSvgResult.Errors;
                    return result;
                }

                if (isSvgResult.Success)
                {
                    result.Result = path;
                    return result;
                }

                long previousSize = new FileInfo(path).Length;
                using SKBitmap skImage = SKBitmap.Decode(new FileStream(path, FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.None));

                int sourceWidth = skImage.Width;
                // Get the image current height
                int sourceHeight = skImage.Height;
                if (sourceHeight < maxSize && sourceWidth < maxSize)
                {
                    result.Result = path;
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

        public static ResultWithImageFileError<string> Resize(string path, int? width = null, int? height = null, string? savePath = null)
        {
            ResultWithImageFileError<string> result = new ResultWithImageFileError<string>();
            try
            {

                ResultWithImageFileError<bool> isSvgResult = IsSvg(path);
                if (!isSvgResult.Success)
                {
                    result.Errors = isSvgResult.Errors;
                    return result;
                }
                if (isSvgResult.Result)
                {
                    if (savePath != null)
                    {
                        File.Copy(path, savePath);
                        path = savePath;
                    }
                    result.Result = path;
                    return result;
                }

                using FileStream sourceStream = new FileStream(path, FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.None);
                using SKData data = SKData.Create(sourceStream);
                using SKCodec codec = SKCodec.Create(data);
                SKEncodedImageFormat format = codec.EncodedFormat;

                using SKBitmap skImage = SKBitmap.Decode(data);

                int sourceWidth = skImage.Width;
                // Get the image current height
                int sourceHeight = skImage.Height;
                if (sourceHeight == height && sourceWidth == width)
                {
                    result.Result = path;
                    return result;
                }
                int destWidth, destHeight;
                if (width != null && height != null)
                {
                    destWidth = (int)width;
                    destHeight = (int)height;
                }
                else if (width != null && height == null)
                {
                    destWidth = (int)width;
                    destHeight = destWidth * sourceHeight / sourceWidth;
                }
                else if (width == null && height != null)
                {
                    destHeight = (int)height;
                    destWidth = destHeight * sourceWidth / sourceHeight;
                }
                else
                {
                    result.Errors.Add(new ImageFileError(ImageFileErrorCode.NoSize, "You must provide at least width or height to resize"));
                    return result;
                }



                using SKBitmap scaledBitmap = skImage.Resize(new SKImageInfo(destWidth, destHeight), SKFilterQuality.None);
                using SKImage image = SKImage.FromBitmap(scaledBitmap);
                using SKData encodedImage = image.Encode(format, 100);

                if (savePath == null)
                {
                    savePath = "";
                }

                using (FileStream fs = new FileStream(savePath, FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.None))
                {
                    encodedImage.SaveTo(fs);
                    result.Result = savePath;
                }
            }
            catch (Exception e)
            {
                result.Errors.Add(new ImageFileError(ImageFileErrorCode.UnknowError, e));
            }
            return result;
        }
        public static ResultWithImageFileError<string> SvgTo(string path, SKEncodedImageFormat format, int width, int height, string? savePath = null)
        {
            ResultWithImageFileError<string> result = new ResultWithImageFileError<string>();
            try
            {
                ResultWithImageFileError<bool> isSvgResult = IsSvg(path);
                if (!isSvgResult.Success)
                {
                    result.Errors = isSvgResult.Errors;
                    return result;
                }
                if (!isSvgResult.Result)
                {
                    result.Errors.Add(new ImageFileError(ImageFileErrorCode.FileNotSvg, "File isn't a valid svg"));
                    return result;
                }
                using (var stream = new FileStream(path, FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.None))
                {
                    SKSvg svg = new SKSvg();
                    svg.Load(stream);

                    SKImageInfo imageInfo = new SKImageInfo(width, height);
                    using (var surface = SKSurface.Create(imageInfo))
                    using (var canvas = surface.Canvas)
                    {
                        // calculate the scaling need to fit to screen
                        float scaleX = width / svg.Picture.CullRect.Width;
                        float scaleY = height / svg.Picture.CullRect.Height;
                        SKMatrix matrix = SKMatrix.CreateScale(scaleX, scaleY);

                        // draw the svg
                        canvas.Clear(SKColors.Transparent);
                        canvas.DrawPicture(svg.Picture, ref matrix);
                        canvas.Flush();

                        using (SKImage data = surface.Snapshot())
                        using (SKData pngImage = data.Encode(format, 100))
                        {
                            if (savePath == null)
                            {
                                string? name = Enum.GetName<SKEncodedImageFormat>(format);
                                if (name == null)
                                {
                                    result.Errors.Add(new ImageFileError(ImageFileErrorCode.UnknowError, "File format isn't inside extension enum"));
                                    return result;
                                }
                                savePath = path.Replace(".svg", "." + name.ToLower());
                            }

                            using (FileStream outputStream = new FileStream(savePath, FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.None))
                            {
                                pngImage.SaveTo(outputStream);
                                result.Result = savePath;
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                result.Errors.Add(new ImageFileError(ImageFileErrorCode.UnknowError, e));
            }
            return result;

        }
        public static ResultWithImageFileError<bool> IsSvg(string path)
        {
            ResultWithImageFileError<bool> result = new ResultWithImageFileError<bool>();
            try
            {
                int count = 10;
                using (var stream = File.OpenRead(path))
                using (var reader = new StreamReader(stream, Encoding.UTF8))
                {
                    char[] buffer = new char[count];
                    int n = reader.ReadBlock(buffer, 0, count);

                    string resultTxt = String.Join("", buffer);
                    result.Result = resultTxt.StartsWith("<?xml ") || resultTxt.StartsWith("<svg ");
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
