using AventusSharp.Tools;
using Core.Data;
using Core.Logic.FileSystem;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using WebPush;

namespace Core.Logic.Push;


public class PushNotification
{
    public static WebPushClient webPush = new();

    public static string PublicKey => _publicKey;
    private static string _publicKey = "";
    private static string _privateKey = "";

    public static void Init()
    {
        try
        {
            FileStorage storage = FileStorage.GetCore();
            storage.CreateDir("webpush");

            ResultWithError<bool> hasFileQuery = storage.FileExists("webpush/keys.json");
            if (!hasFileQuery.Result)
            {
                VapidDetails keysTemp = VapidHelper.GenerateVapidKeys();
                JObject keys = new JObject
                {
                    { "public", keysTemp.PublicKey },
                    { "private", keysTemp.PrivateKey }
                };
                ResultWithError<bool> writeResult = storage.SetTxt("webpush/keys.json", keys.ToString());
                if (!writeResult.Success)
                {

                }
            }
            ResultWithError<string> keysReadQuery = storage.GetTxt("webpush/keys.json");
            if (!keysReadQuery.Success || keysReadQuery.Result == null)
            {
                return;
            }
            JObject keysObj = JObject.Parse(keysReadQuery.Result);

            _publicKey = keysObj["public"]?.ToString() ?? "";
            _privateKey = keysObj["private"]?.ToString() ?? "";

            webPush.SetVapidDetails("http://localhost:5001", _publicKey, _privateKey);



        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }

    public static async Task SendMsg(PushRecord record, Notification notification)
    {
        var sub = new PushSubscription(record.EndPoint, record.P256dh, record.Auth);
        await notification.Complete();
        webPush.SendNotification(sub, JsonConvert.SerializeObject(notification));
    }
}

public class Notification
{
    private static Notification? defaultValues;
    public string Title = "";
    public string Body;
    public string Icon = "";
    public string Badge = "";

    public Notification(string body)
    {
        Body = body;
    }

    public async Task Complete()
    {
        if (defaultValues == null)
        {
            Company company = await CompanyDM.GetInstance().GetMain();
            defaultValues = new Notification("");
            defaultValues.Title = company.Name;
            defaultValues.Icon = company.SiteUrl + company.Logo.Uri;
            defaultValues.Badge = company.SiteUrl + "/pwa/icons/logo-96.png";
        }

        if (string.IsNullOrWhiteSpace(Title)) Title = defaultValues.Title;
        if (string.IsNullOrWhiteSpace(Icon)) Icon = defaultValues.Icon;
        if (string.IsNullOrWhiteSpace(Badge)) Badge = defaultValues.Badge;
    }


}