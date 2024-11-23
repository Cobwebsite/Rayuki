using AventusSharp.Routes;
using AventusSharp.Tools;
using AventusSharp.Tools.Attributes;
using Core.Data;
using Core.Logic;
using Core.Tools;

namespace Core.Routes
{
    public class DesktopRouter : StorableRouter<Desktop>
    {
        [NoExport]
        public override ResultWithError<List<Desktop>> GetAll(HttpContext context)
        {
            return DesktopDM.GetInstance().GetAllByUser(context.GetUserId());
        }
    }
}
