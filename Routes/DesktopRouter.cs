using AventusSharp.Data;
using AventusSharp.Routes;
using AventusSharp.Routes.Attributes;
using AventusSharp.Tools;
using AventusSharp.Tools.Attributes;
using Core.Data;
using Core.Logic;
using Core.Tools;
using Path = AventusSharp.Routes.Attributes.Path;

namespace Core.Routes
{
    public class DesktopRouter : StorableRoute<Desktop>
    {
        [NoTypescript]
        public override ResultWithError<List<Desktop>> GetAll(HttpContext context)
        {
            return DesktopDM.GetInstance().GetAllByUser(context.GetUserId());
        }
    }
}
