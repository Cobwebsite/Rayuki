using AventusSharp.Tools;
using Core.Data;
using Core.Logic;

namespace Core.Tools
{
    public static class HttpContextExtension
    {
        public static bool IsConnected(this HttpContext context)
        {
            return context.GetUserId() != null;
        }

        public static int? GetUserId(this HttpContext context)
        {
            return context.Session.GetInt32("userId");
        }

        public static void SetConnected(this HttpContext context, int userId)
        {
            context.Session.SetInt32("userId", userId);
        }
        public static void Disconnect(this HttpContext context)
        {
            context.Session.Remove("userId");
        }

        public static bool IsSuperAdmin(this HttpContext context)
        {
            return context.Session.Get("superAdmin") != null ? true : false;
        }

        public static void SetSuperAdmin(this HttpContext context, bool value)
        {
            if (value)
            {
                context.Session.SetInt32("superAdmin", 1);
            }
            else
            {
                context.Session.Remove("superAdmin");
            }
        }

        public static VoidWithError setUserId(this HttpContext context, IUserable userable)
        {
            VoidWithError result = new VoidWithError();
            int? userId = context.GetUserId();
            if (userId == null)
            {
                return new()
                {
                    Errors = new List<GenericError>() { CoreError.NotLogin }
                };
            }
            userable.UserId = (int)userId;
            return result;
        }
        public static VoidWithError setUserId(this HttpContext context, IUserableOrNull userable)
        {
            VoidWithError result = new VoidWithError();
            int? userId = context.GetUserId();
            if (userId == null)
            {
                return new()
                {
                    Errors = new List<GenericError>() { CoreError.NotLogin }
                };
            }
            userable.UserId = userId;
            return result;
        }

        public static bool Can(this HttpContext context, Enum value, string additionalInfo)
        {
            return PermissionDM.GetInstance().Can(context, value, additionalInfo);
        }
        public static bool Can(this HttpContext context, Enum value)
        {
            return PermissionDM.GetInstance().Can(context, value);
        }
    }
}
