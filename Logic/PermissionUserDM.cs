using AventusSharp.Data.Manager.DB;
using AventusSharp.Tools;
using Core.Data;
using Core.Tools;

namespace Core.Logic
{
    public class PermissionUserDM : DatabaseDM<PermissionUserDM, PermissionUser>
    {

        public ResultWithError<List<PermissionUser>> GetAllByUser(int userId)
        {
            return WhereWithError(p => p.UserId == userId);
        }


        public ResultWithError<bool> EditPermission(List<PermissionUser> created, List<PermissionUser> updated, List<PermissionUser> deleted)
        {
            return RunInsideTransaction(() =>
            {
                ResultWithError<bool> result = new();
                if (created.Count > 0)
                {
                    ResultWithError<List<PermissionUser>> resultTemp = CreateWithError(created);
                    result.Errors.AddRange(resultTemp.Errors);
                }
                if (updated.Count > 0)
                {
                    ResultWithError<List<PermissionUser>> resultTemp = UpdateWithError(updated);
                    result.Errors.AddRange(resultTemp.Errors);
                }
                if (deleted.Count > 0)
                {
                    ResultWithError<List<PermissionUser>> resultTemp = DeleteWithError(deleted);
                    result.Errors.AddRange(resultTemp.Errors);
                }
                result.Result = result.Success;
                return result;
            });
        }

        public ResultWithError<PermissionUser> HasPermissionGroup(int userId, Enum @enum, string additionalInfo)
        {
            string name = @enum.GetFullName();
            return SingleWithError(p => p.UserId == userId && p.Permission.EnumName == name && p.Permission.AdditionalInfo == additionalInfo);
        }
    }
}