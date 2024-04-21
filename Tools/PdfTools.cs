using System.Runtime.CompilerServices;
using AventusSharp.Tools;
using AventusSharp.Tools.Attributes;
using PuppeteerSharp;

namespace Core.Tools
{
    [Typescript("Errors")]
    public enum PdfErrorCode
    {
        UnknowError,
        NoNameProvided
    }
    [Typescript("Errors")]
    public class PdfError : GenericError<PdfErrorCode>
    {
        public PdfError(PdfErrorCode code, string message, [CallerFilePath] string callerPath = "", [CallerLineNumber] int callerNo = 0) : base(code, message, callerPath, callerNo)
        {
        }

        public PdfError(PdfErrorCode code, Exception e, [CallerFilePath] string callerPath = "", [CallerLineNumber] int callerNo = 0) : base(code, e, callerPath, callerNo)
        {
        }
    }

    public class VoidWithPdfError : VoidWithError<PdfError> { }
    public class ResultWithPdfError<T> : ResultWithError<T, PdfError> { }


    public static class PdfTools
    {
        public static bool IsInit { get; private set; }
        public static async Task<VoidWithError> Init()
        {
            if (IsInit) return new VoidWithError();
            
            VoidWithError result = new VoidWithError();
            
            try
            {
                await new BrowserFetcher().DownloadAsync();
                IsInit = true;
            }
            catch (Exception e)
            {
                result.Errors.Add(new PdfError(PdfErrorCode.UnknowError, e));    
            }
            return result;
        }
    }
}