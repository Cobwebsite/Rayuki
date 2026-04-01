using AventusSharp.Data.Manager.DB;
using AventusSharp.Tools;
using Core.Data;

namespace Core.Logic
{
    public class GroupDM : DatabaseDM<GroupDM, Group>
    {

        public async Task<List<GenericError>> AssignDefaultGroup<X>(List<X> users) where X : User
        {
            ResultWithError<List<Group>> groupsResult = await WhereWithError(p => p.AssignationAuto);
            if (!groupsResult.Success || groupsResult.Result == null)
            {
                return groupsResult.Errors;
            }

            VoidWithError groupBindings = await RunInsideTransaction(async () =>
            {
                VoidWithError resultTemp = new();
                foreach (Group group in groupsResult.Result)
                {
                    group.Users.AddRange(users);
                    await resultTemp.RunAsync(() => group.UpdateWithError());
                }
                return resultTemp;
            });



            return groupBindings.Errors;
        }
    }
}