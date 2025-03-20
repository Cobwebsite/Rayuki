using AventusSharp.Routes;
using AventusSharp.Routes.Attributes;
using AventusSharp.Tools;
using Core.Data;
using Core.Logic;
using Core.Tools;

namespace Core.Routes;

[Prefix("push")]
public class PushRecordRouter : Router
{
    public ResultWithError<PushRecord> Get(HttpContext context, PushRecord record)
    {
        return PushRecordDM.GetInstance().Get(record, (int)context.GetUserId()!);
    }
    public ResultWithError<PushRecord> CreateOrUpdate(HttpContext context, PushRecord record)
    {
        record.UserId = (int)context.GetUserId()!;
        return PushRecordDM.GetInstance().CreateOrUpdate(record);
    }

    public ResultWithError<bool> Destroy(HttpContext context, PushRecord record)
    {
        return PushRecordDM.GetInstance().Destroy(record, (int)context.GetUserId()!);
    }
}