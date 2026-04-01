using AventusSharp.Data;
using AventusSharp.Tools;
using AventusSharp.Tools.Attributes;
using Core.Data;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Identity;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;

namespace Core.Logic
{
    [Export("Errors")]
    public enum LoginCode
    {
        OK,
        WrongCredentials,
        Unknown,
        NotConnected
    }

    [Export("Errors")]
    public class LoginError : GenericError<LoginCode>
    {
        public LoginError(LoginCode code, string message, [CallerFilePath] string callerPath = "", [CallerLineNumber] int callerNo = 0) : base(code, message, callerPath, callerNo)
        {
        }
    }

    public static class PasswordManager
    {
        private static readonly PasswordHasher<User> hasher = new PasswordHasher<User>();


        public static void HashPassword(User user)
        {
            if (user.Password != null)
            {
                user.Password = hasher.HashPassword(user, user.Password);
            }
        }

        public static PasswordVerificationResult VerifyHashedPassword(User user, string providedPassword)
        {
            if (user.Password == null) return PasswordVerificationResult.Failed;
            return hasher.VerifyHashedPassword(user, user.Password, providedPassword);
        }


        public static async Task<ResultWithError<User>> Login(string username, string password)
        {
            ResultWithError<User> result = new();
            ResultWithError<User> userQuery = await User.SingleWithError(user => user.Username == username);
            if (!userQuery.Success)
            {
                result.Errors.AddRange(userQuery.Errors);
                return result;
            }
            if (userQuery.Result == null)
            {
                result.Errors.Add(new LoginError(LoginCode.WrongCredentials, "Username and password doesn't match"));
                return result;
            }

            User user = userQuery.Result;
            if (VerifyHashedPassword(user, password) == PasswordVerificationResult.Failed)
            {
                result.Errors.Add(new LoginError(LoginCode.WrongCredentials, "Username and password doesn't match"));
                return result;
            }
            result.Result = user;
            return result;
        }
    }
}
