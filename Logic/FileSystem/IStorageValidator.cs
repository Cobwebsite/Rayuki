using AventusSharp.Tools;

namespace Core.Logic.FileSystem
{
    public interface IStorageValidator
    {
        VoidWithError IsAllowed(string uri, IsAllowedAction action);
    }

}