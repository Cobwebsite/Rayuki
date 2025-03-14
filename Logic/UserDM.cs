using AventusSharp.Data;
using AventusSharp.Data.Manager;
using AventusSharp.Data.Manager.DB;
using AventusSharp.Tools;
using Core.App;
using Core.Data;
using Core.Logic.FileSystem;
using Scriban.Parsing;

namespace Core.Logic
{
    public class UserDM : DatabaseDM<UserDM, User>
    {

        protected string GetPictureDirPath(User user)
        {
            return Path.Combine(FileStorage.rootFolder, "Core", "users", user.Token);
        }

        protected override void BeforeCreate<X>(List<X> values)
        {
            base.BeforeCreate(values);
            foreach (X value in values)
            {
                if (string.IsNullOrEmpty(value.Token))
                {
                    value.Token = Guid.NewGuid().ToString().Replace("-", "");
                }
                PasswordManager.HashPassword(value);
            }
        }
        protected override List<GenericError> AfterCreateWithError<X>(List<X> values, ResultWithError<List<X>> result)
        {
            List<GenericError> baseResult = base.AfterCreateWithError(values, result);

            GroupDM.GetInstance().AssignDefaultGroup(values);
            return baseResult;
        }

        public ResultWithError<User> UpdateBasicInfo(User user)
        {
            ResultWithError<User> result = new ResultWithError<User>();
            if (result.Errors.Count > 0)
            {
                return result;
            }

            IUpdateBuilder<User> t = CreateUpdate<User>()
                .Field(u => u.Username)
                .Field(u => u.Firstname)
                .Field(u => u.Picture)
                .Field(u => u.Lastname);

            if (user.Password != "")
            {
                Console.WriteLine("change password to " + user.Password);
                PasswordManager.HashPassword(user);
                t.Field(u => u.Password);
            }

            t.Where(u => u.Id == user.Id);

            return t.RunWithErrorSingle(user).ToGeneric();
        }


        public ResultWithError<User> GetConnected(int? id)
        {
            if (id == null)
            {
                ResultWithError<User> result = new();
                result.Errors.Add(new LoginError(LoginCode.NotConnected, "You aren't connected"));
                return result;
            }
            ResultWithError<User> queryUser = GetByIdWithError((int)id).ToGeneric();
            if (queryUser.Success && queryUser.Result != null)
            {
                queryUser.Result.Password = "";
            }
            return queryUser;
        }
    }
}
