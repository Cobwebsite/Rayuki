﻿using AventusSharp.Data;
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

        protected async override Task<VoidWithError> Initialize()
        {
            VoidWithError result = await base.Initialize();
            CreateDefaultAdmin();
            return result;
        }

        protected string GetPictureDirPath(User user)
        {
            return Path.Combine(FileStorage.rootFolder, "Core", "users", user.Token);
        }

        protected override List<GenericError> BeforeCreateWithError<X>(List<X> values)
        {
            List<GenericError> errors = base.BeforeCreateWithError(values);
            foreach (X value in values)
            {
                value.Token = Guid.NewGuid().ToString().Replace("-", "");
                errors.AddRange(value.Picture.ValidateAndSaveToDir(GetPictureDirPath(value), 1200, FileStorage.GetCore()).Errors);
            }
            return errors;
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
                DefaultUserConfig result = HttpServer.DefaultUser;
                new User()
                {
                    Firstname = result.Firstname,
                    Lastname = result.Lastname,
                    Password = result.Password,
                    Username = result.Username,
                    IsSuperAdmin = true,
                }.Create();
            }
        }

        public ResultWithError<User> UpdateBasicInfo(User user)
        {
            ResultWithError<User> result = new ResultWithError<User>();
            result.Errors = user.Picture.ValidateAndSaveToDir(GetPictureDirPath(user), 1200, FileStorage.GetCore()).Errors;
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
