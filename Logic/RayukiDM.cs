using AventusSharp.Data;
using AventusSharp.Data.Manager;
using AventusSharp.Data.Manager.DB;

namespace Core.Logic
{
    public class SimpleRayukiDM<U> : RayukiDM<SimpleRayukiDM<U>, U> where U : IStorable
    {

    }
    public abstract class RayukiDM<T, U> : DatabaseDM<T, U> where T : IGenericDM<U>, new() where U : IStorable
    {


        //protected override List<DataError> CanGetAll()
        //{
        //    return new List<DataError>()
        //    {
        //        new(DataErrorCode.UnknowError, "Test")
        //    };
        //}
    }
}
