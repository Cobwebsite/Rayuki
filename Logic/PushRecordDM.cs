using AventusSharp.Data.Manager.DB;
using AventusSharp.Tools;
using Core.Data;
using Core.Logic.Push;

namespace Core.Logic;

public class PushRecordDM : DatabaseDM<PushRecordDM, PushRecord>
{
    public async Task<ResultWithError<PushRecord>> Get(PushRecord record, int userId)
    {
        return await SingleWithError(p => p.EndPoint == record.EndPoint && p.UserId == userId);
    }
    public async Task<ResultWithError<PushRecord>> CreateOrUpdate(PushRecord record)
    {
        ResultWithError<PushRecord> result = new();
        PushRecord? dataToSave = null;
        await result.RunAsync(async () =>
        {
            ResultWithError<PushRecord> temp = await SingleWithError(p => p.EndPoint == record.EndPoint);
            if (temp.Success)
            {
                if (temp.Result != null)
                {
                    dataToSave = temp.Result;
                    dataToSave.UserId = record.UserId;
                    dataToSave.Auth = record.Auth;
                    dataToSave.P256dh = record.P256dh;
                }
                else
                {
                    dataToSave = record;
                }
            }
            return temp;
        });
        await result.ExtractAsync<PushRecord>(async () =>
        {
            ResultWithError<PushRecord> result = new();
            if (dataToSave != null)
            {
                result.Errors = dataToSave.Id != 0 ? await dataToSave.UpdateWithError() : await dataToSave.CreateWithError();
            }
            return result;
        });

        if (result.Success)
        {
            result.Result = dataToSave;
        }
        return result;
    }

    public async Task<ResultWithError<bool>> Destroy(PushRecord record, int userId)
    {
        ResultWithError<bool> result = new();

        ResultWithError<PushRecord> query = await SingleWithError(p => p.EndPoint == record.EndPoint);
        if (query.Success)
        {
            if (query.Result != null && query.Result.UserId == userId)
            {
                await result.RunAsync(() => DeleteWithError(record));
            }
        }
        result.Result = result.Success;
        return result;
    }


    public async Task<VoidWithError> NotifyAll()
    {
        Console.WriteLine("start");
        VoidWithError result = new();
        List<PushRecord> list = await GetAll();
        Notification notif = new Notification("salut");
        foreach (PushRecord item in list)
        {
            await PushNotification.SendMsg(item, notif);
        }
        Console.WriteLine("done");
        return result;
    }
}