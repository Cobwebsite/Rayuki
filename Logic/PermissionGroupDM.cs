using AventusSharp.Data.Manager.DB;
using AventusSharp.Tools;
using Core.Data;
using Core.Tools;

namespace Core.Logic
{
    public class PermissionGroupDM : DatabaseDM<PermissionGroupDM, PermissionGroup>
    {

        public ResultWithError<List<PermissionGroup>> GetAllByGroup(int groupId)
        {
            return WhereWithError(p => p.GroupId == groupId);
        }


        public ResultWithError<bool> EditPermission(List<PermissionGroup> created, List<PermissionGroup> updated, List<PermissionGroup> deleted)
        {
            return RunInsideTransaction(() =>
            {
                ResultWithError<bool> result = new();
                if (created.Count > 0)
                {
                    ResultWithError<List<PermissionGroup>> resultTemp = CreateWithError(created);
                    result.Errors.AddRange(resultTemp.Errors);
                }
                if (updated.Count > 0)
                {
                    ResultWithError<List<PermissionGroup>> resultTemp = UpdateWithError(updated);
                    result.Errors.AddRange(resultTemp.Errors);
                }
                if (deleted.Count > 0)
                {
                    ResultWithError<List<PermissionGroup>> resultTemp = DeleteWithError(deleted);
                    result.Errors.AddRange(resultTemp.Errors);
                }
                result.Result = result.Success;
                return result;
            });
        }

        public ResultWithError<PermissionGroup> HasPermissionGroup(int groupId, Enum @enum, string additionalInfo)
        {
            string name = @enum.GetFullName();
            return SingleWithError(p => p.GroupId == groupId && p.Permission.EnumName == name && p.Permission.AdditionalInfo == additionalInfo);
        }
    }
}