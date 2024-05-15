using System.Runtime.CompilerServices;
using AventusSharp.Tools;
using AventusSharp.Tools.Attributes;

namespace Core.Tools {
    [Typescript("Errors")]
    public enum CoreErrorCode
    {
        NotImplemented,
        NotAvailable,
        Impossible,
        NotAllowed,
    }
    
    [Typescript("Errors")]
    public class CoreError : GenericError<CoreErrorCode>
    {
        public CoreError(CoreErrorCode code, string message, [CallerFilePath] string callerPath = "", [CallerLineNumber] int callerNo = 0) : base(code, message, callerPath, callerNo)
        {
        }
    }
}