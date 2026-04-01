using AventusSharp.Data.Manager.DB;
using AventusSharp.Tools;
using Core.Data;
using Core.Tools;

namespace Core.Logic
{
    public class PermissionGroupDM : DatabaseDM<PermissionGroupDM, PermissionGroup>
    {

        public async Task<ResultWithError<List<PermissionGroup>>> GetAllByGroup(int groupId)
        {
            return await WhereWithError(p => p.GroupId == groupId);
        }


        public async Task<ResultWithError<bool>> EditPermission(List<PermissionGroup> created, List<PermissionGroup> updated, List<PermissionGroup> deleted)
        {
            return await RunInsideTransaction(async () =>
            {
                ResultWithError<bool> result = new();
                if (created.Count > 0)
                {
                    ResultWithError<List<PermissionGroup>> resultTemp = await CreateWithError(created);
                    result.Errors.AddRange(resultTemp.Errors);
                }
                if (updated.Count > 0)
                {
                    ResultWithError<List<PermissionGroup>> resultTemp = await UpdateWithError(updated);
                    result.Errors.AddRange(resultTemp.Errors);
                }
                if (deleted.Count > 0)
                {
                    ResultWithError<List<PermissionGroup>> resultTemp = await DeleteWithError(deleted);
                    result.Errors.AddRange(resultTemp.Errors);
                }
                result.Result = result.Success;
                return result;
            });
        }

        public async Task<ResultWithError<PermissionGroup>> HasPermissionGroup(int groupId, Enum @enum, string additionalInfo)
        {
            string name = @enum.GetFullName();
            return await SingleWithError(p => p.GroupId == groupId && p.Permission.EnumName == name && p.Permission.AdditionalInfo == additionalInfo);
        }
    }
}