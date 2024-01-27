using AventusSharp.Data;
using AventusSharp.Data.Manager.DB;
using AventusSharp.Tools;
using Core.App;
using Core.Data;

namespace Core.Logic
{
    public class UserDM : DatabaseDM<UserDM, User>
    {

        protected async override Task<VoidWithDataError> Initialize()
        {
            VoidWithDataError result = await base.Initialize();
            CreateDefaultAdmin();
            //new User()
            //{
            //    Firstname = "Maxime",
            //    Lastname = "Bétrisey",
            //    Password = "Pass$1234",
            //    Username = "maxime.betrisey",
            //    IsSuperAdmin = true,
            //}.Create();
            return result;
        }

        protected override void BeforeCreate<X>(List<X> values)
        {
            base.BeforeCreate(values);
            foreach (X value in values)
            {
                PasswordManager.HashPassword(value);
            }
        }

        private void CreateDefaultAdmin()
        {
            if (!User.Exist(u => u.IsSuperAdmin))
            {
                new User()
                {
                    Firstname = "Maxime",
                    Lastname = "Bétrisey",
                    Password = "Pass$1234",
                    Username = "maxime.betrisey",
                    IsSuperAdmin = true,
                }.Create();
            }
        }

            public ResultWithError<User> UpdateBasicInfo(User user)
        {
            var t = CreateUpdate<User>()
                .Field(u => u.Username)
                .Field(u => u.Firstname)
                .Field(u => u.Picture)
                .Field(u => u.Lastname);

            if(user.Password != "")
            {
                PasswordManager.HashPassword(user);
                t.Field(u => u.Password);
            }

            t.Where(u => u.Id == user.Id);

            return t.RunWithErrorSingle(user).ToGeneric();
        }

    }
}
