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

        protected override ResultWithError<Desktop> DM_Create(HttpContext context, Desktop item)
        {
            ResultWithError<Desktop> result = new ResultWithError<Desktop>();
            result.Run(() => context.setUserId(item));
            result.Run(() => base.DM_Create(context, item));
            return result;
        }
    
    }
}
