
using System.Runtime.CompilerServices;
using AventusSharp.Tools;
using AventusSharp.Tools.Attributes;

namespace Core.Logic.FileSystem
{
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