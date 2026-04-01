using AventusSharp.Routes;
using AventusSharp.Routes.Attributes;
using AventusSharp.Tools;
using AventusSharp.Tools.Attributes;
using Core.Data;
using Core.Logic;
using Core.Tools;

namespace Core.Routes
{
    [Prefix("Core")]
    public class DesktopRouter : StorableRouter<Desktop>
    {
        [NoExport]
        public override async Task<ResultWithError<List<Desktop>>> GetAll(HttpContext context)
        {
            return await DesktopDM.GetInstance().GetAllByUser(context.GetUserId());
        }

        protected override async Task<ResultWithError<Desktop>> DM_Create(HttpContext context, Desktop item)
        {
            ResultWithError<Desktop> result = new ResultWithError<Desktop>();
            result.Run(() => context.setUserId(item));
            await result.RunAsync(() => base.DM_Create(context, item));
            return result;
        }
    
    }
}
