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
    public async Task<ResultWithError<PushRecord>> Get(HttpContext context, PushRecord record)
    {
        return await PushRecordDM.GetInstance().Get(record, (int)context.GetUserId()!);
    }
    public async Task<ResultWithError<PushRecord>> CreateOrUpdate(HttpContext context, PushRecord record)
    {
        record.UserId = (int)context.GetUserId()!;
        return await PushRecordDM.GetInstance().CreateOrUpdate(record);
    }

    public async Task<ResultWithError<bool>> Destroy(HttpContext context, PushRecord record)
    {
        return await PushRecordDM.GetInstance().Destroy(record, (int)context.GetUserId()!);
    }
}