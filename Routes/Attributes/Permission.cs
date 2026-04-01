

using AventusSharp.Routes;
using AventusSharp.Routes.Attributes;
using Core.Tools;

namespace Core.Routes.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class Permission<T> : Middleware where T : Enum
    {
        public T value;
        public Permission(T value)
        {
            this.value = value;
        }

        public override async Task Run(HttpContext context, RouteInfo info, Func<Task> next)
        {
            if (info.action.GetCustomAttributes(false).Any(p => p is NoPermission))
            {
                await next();
            }
            else if (!await context.Can(value))
            {
                context.Response.StatusCode = 401;
            }
            else
            {
                await next();
            }
        }
    }

    [AttributeUsage(AttributeTargets.Method)]
    public class NoPermission : Attribute
    {

    }
}