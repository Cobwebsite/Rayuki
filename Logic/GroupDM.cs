using AventusSharp.Data.Manager.DB;
using AventusSharp.Tools;
using Core.Data;

namespace Core.Logic
{
    public class GroupDM : DatabaseDM<GroupDM, Group>
    {

        public List<GenericError> AssignDefaultGroup<X>(List<X> users) where X : User
        {
            ResultWithError<List<Group>> groupsResult = WhereWithError(p => p.AssignationAuto);
            if (!groupsResult.Success || groupsResult.Result == null)
            {
                return groupsResult.Errors;
            }

            VoidWithError groupBindings = RunInsideTransaction(() =>
            {
                VoidWithError resultTemp = new();
                foreach (Group group in groupsResult.Result)
                {
                    group.Users.AddRange(users);
                    resultTemp.Run(() => group.UpdateWithError());
                }
                return resultTemp;
            });



            return groupBindings.Errors;
        }
    }
}