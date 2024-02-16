
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
    }
}
