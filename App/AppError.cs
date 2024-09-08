using AventusSharp.Data;
using AventusSharp.Tools;
using AventusSharp.Tools.Attributes;
using System.Runtime.CompilerServices;

namespace Core.App
{
    public enum AppErrorCode
    {
        AppFileNotFound,
        MoreThanOneAppFileFound,
        NoAppFileFound,
        NoIconFileFound,
        WrongVersionFormat,
        NoName,
        UnknowError,
        NotZipFile,
        NotInManagement
    }
    public class AppError : GenericError<AppErrorCode>
    {
        public AppError(AppErrorCode code, string message, [CallerFilePath] string callerPath = "", [CallerLineNumber] int callerNo = 0) : base(code, message, callerPath, callerNo)
        {
        }

        public AppError(AppErrorCode code, Exception exception, [CallerFilePath] string callerPath = "", [CallerLineNumber] int callerNo = 0) : base(code, "", callerPath, callerNo)
        {
            Message = exception.Message;
        }
    }
}
