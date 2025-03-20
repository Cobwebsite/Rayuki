using AventusSharp.Data.Manager.DB;
using AventusSharp.Tools;
using Core.Data;
using Core.Logic.Push;

namespace Core.Logic;

public class PushRecordDM : DatabaseDM<PushRecordDM, PushRecord>
{
    public ResultWithError<PushRecord> Get(PushRecord record, int userId)
    {
        return SingleWithError(p => p.EndPoint == record.EndPoint && p.UserId == userId);
    }
    public ResultWithError<PushRecord> CreateOrUpdate(PushRecord record)
    {
        ResultWithError<PushRecord> result = new();
        PushRecord? dataToSave = null;
        result.Run(() =>
        {
            ResultWithError<PushRecord> temp = SingleWithError(p => p.EndPoint == record.EndPoint);
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
        result.Execute(() =>
        {
            ResultWithError<PushRecord> result = new();
            if (dataToSave != null)
            {
                result.Errors = dataToSave.Id != 0 ? dataToSave.UpdateWithError() : dataToSave.CreateWithError();
            }
            return result;
        });

        if (result.Success)
        {
            result.Result = dataToSave;
        }
        return result;
    }

    public ResultWithError<bool> Destroy(PushRecord record, int userId)
    {
        ResultWithError<bool> result = new();

        ResultWithError<PushRecord> query = SingleWithError(p => p.EndPoint == record.EndPoint);
        if (query.Success)
        {
            if (query.Result != null && query.Result.UserId == userId)
            {
                result.Run(() => DeleteWithError(record));
            }
        }
        result.Result = result.Success;
        return result;
    }


    public VoidWithError NotifyAll()
    {
        Console.WriteLine("start");
        VoidWithError result = new();
        List<PushRecord> list = GetAll();
        Notification notif = new Notification("salut");
        foreach (PushRecord item in list)
        {
            PushNotification.SendMsg(item, notif);
        }
        Console.WriteLine("done");
        return result;
    }
}