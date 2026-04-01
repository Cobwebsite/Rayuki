using AventusSharp.Data.Manager.DB;
using AventusSharp.Tools;
using Core.Data;
using Core.Tools;

namespace Core.Logic
{
    public class PermissionUserDM : DatabaseDM<PermissionUserDM, PermissionUser>
    {

        public async Task<ResultWithError<List<PermissionUser>>> GetAllByUser(int userId)
        {
            return await WhereWithError(p => p.UserId == userId);
        }


        public async Task<ResultWithError<bool>> EditPermission(List<PermissionUser> created, List<PermissionUser> updated, List<PermissionUser> deleted)
        {
            return await RunInsideTransaction(async () =>
            {
                ResultWithError<bool> result = new();
                if (created.Count > 0)
                {
                    ResultWithError<List<PermissionUser>> resultTemp = await CreateWithError(created);
                    result.Errors.AddRange(resultTemp.Errors);
                }
                if (updated.Count > 0)
                {
                    ResultWithError<List<PermissionUser>> resultTemp = await UpdateWithError(updated);
                    result.Errors.AddRange(resultTemp.Errors);
                }
                if (deleted.Count > 0)
                {
                    ResultWithError<List<PermissionUser>> resultTemp = await DeleteWithError(deleted);
                    result.Errors.AddRange(resultTemp.Errors);
                }
                result.Result = result.Success;
                return result;
            });
        }

        public async Task<ResultWithError<PermissionUser>> HasPermissionGroup(int userId, Enum @enum, string additionalInfo)
        {
            string name = @enum.GetFullName();
            return await SingleWithError(p => p.UserId == userId && p.Permission.EnumName == name && p.Permission.AdditionalInfo == additionalInfo);
        }
    }
}