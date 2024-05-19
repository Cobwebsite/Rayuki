
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

        public static void SetSuperAdmin(this HttpContext context, bool value) {
            if(value) {
                context.Session.SetInt32("superAdmin", 1);
            }
            else {
                context.Session.Remove("superAdmin");
            }
        }
    }
}
