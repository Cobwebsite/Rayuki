using AventusSharp.Routes;
using AventusSharp.Routes.Response;
using Core.Data;
using System.Reflection;
using System.Text;

namespace Core.Routes
{
    public class Component : IResponse
    {

        private string tagName;
        public Component(string name)
        {
            Init(name, Assembly.GetCallingAssembly());
        }
        public Component(string name, Assembly assembly)
        {
            Init(name, assembly);
        }
        public Component(string name, string prefix)
        {
            Init(name, prefix);
        }

        private void Init(string name, Assembly assembly)
        {
            string prefix = ApplicationData.ParseTag(assembly.GetName().Name ?? "");
            Init(name, prefix);
        }
        private void Init(string name, string prefix)
        {
            string tag = ApplicationData.ParseTag(name);
            if (prefix != "")
            {
                tagName = prefix + "-" + tag;
            }
            else
            {
                tagName = tag;
            }
        }


        public async Task send(HttpContext context, IRoute route)
        {
            string txt = $"<{tagName}></{tagName}>";
            byte[] bytes = Encoding.UTF8.GetBytes(txt);
            context.Response.ContentType = "text/html";
            context.Response.StatusCode = 200;
            await context.Response.Body.WriteAsync(bytes, 0, bytes.Length);
        }
    }
}
