using AventusSharp.Data;
using AventusSharp.Data.Manager;
using AventusSharp.Data.Manager.DB;
using AventusSharp.Tools;
using Core.App;
using Core.Data;
using Core.Logic.FileSystem;
using Core.Permissions;
using Scriban.Parsing;

namespace Core.Logic
{
    public enum UserSettings
    {
        Lang
    }
    public class UserDM : DatabaseDM<UserDM, User>
    {

        protected string GetPictureDirPath(User user)
        {
            return Path.Combine(FileStorage.rootFolder, "Core", "users", user.Token);
        }

        protected override async Task BeforeCreate<X>(List<X> values)
        {
            await base.BeforeCreate(values);
            foreach (X value in values)
            {
                if (string.IsNullOrEmpty(value.Token))
                {
                    value.Token = Guid.NewGuid().ToString().Replace("-", "");
                }
                PasswordManager.HashPassword(value);
            }
        }
        protected override async Task<List<GenericError>> AfterCreateWithError<X>(List<X> values, ResultWithError<List<X>> result)
        {
            List<GenericError> baseResult = await base.AfterCreateWithError(values, result);

            await GroupDM.GetInstance().AssignDefaultGroup(values);
            return baseResult;
        }

        public async Task<ResultWithError<User>> UpdateBasicInfo(User user)
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

            return (await t.SingleWithError(user)).ToGeneric();
        }


        public async Task<ResultWithError<User>> GetConnected(int? id)
        {
            if (id == null)
            {
                ResultWithError<User> result = new();
                result.Errors.Add(new LoginError(LoginCode.NotConnected, "You aren't connected"));
                return result;
            }
            ResultWithError<User> queryUser = (await GetByIdWithError((int)id)).ToGeneric();
            if (queryUser.Success && queryUser.Result != null)
            {
                queryUser.Result.Password = "";
            }
            return queryUser;
        }

        public async Task<ResultWithError<string>> GetQuickToken(int id)
        {
            ResultWithError<string> result = new();
            ResultWithError<User> userQuery = await GetByIdWithError(id);
            if (!userQuery.Success || userQuery.Result == null)
            {
                result.Errors = userQuery.Errors;
                return result;
            }

            if (string.IsNullOrEmpty(userQuery.Result.QuickToken))
            {
                userQuery.Result.QuickToken = Guid.NewGuid().ToString().Replace("-", "");
                await userQuery.Result.Update();
            }
            result.Result = userQuery.Result.QuickToken;
            return result;
        }

        public async Task<User?> QuickLogin(string token)
        {
            ResultWithError<int> resultQuery = await SettingsDM.GetInstance().GetGlobalSettingsInt(OsPermission.QuickAuth);
            if (resultQuery.Result == 0) return null;
            User? user = await Single(p => p.QuickToken == token);

            if (resultQuery.Result == 1) return user;
            if (resultQuery.Result == 2 && user != null)
            {
                if (await PermissionDM.GetInstance().Can(user.Id, OsPermission.QuickAuth))
                {
                    return user;
                }
            }
            return null;
        }
    }
}
