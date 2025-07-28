using AventusSharp.Data.Manager;
using AventusSharp.Tools;
using AventusSharp.WebSocket;
using AventusSharp.WebSocket.Attributes;
using Core.Data;
using Core.Logic;
using Core.Tools;
using Path = AventusSharp.WebSocket.Attributes.Path;

namespace Core.Websocket.Routes;


[EndPoint<MainEndPoint>]
public class RecentRouter : StorableWsRouter<Recent>
{
    protected override IGenericDM<Recent>? GetDM()
    {
        return RecentDM.GetInstance();
    }

    protected override ResultWithError<List<Recent>> DM_GetAll(HttpContext context)
    {
        return RecentDM.GetInstance().GetAllForUser(context.GetUserId());
    }

    protected override ResultWithError<Recent> DM_Create(HttpContext context, Recent item)
    {
        int? userId = context.GetUserId();
        if (userId == null)
        {
            return new()
            {
                Errors = new List<GenericError>() {
                    new CoreError(CoreErrorCode.NotLogin, "You aren't logged in")
                }
            };
        }
        item.UserId = (int)userId;
        return base.DM_Create(context, item);
    }


    [Path("/[StorableName]/Save")]
    [Broadcast]
    public virtual ResultWithError<Recent> Save(HttpContext context, Recent item)
    {
        item = OnReceive(item);
        int? userId = context.GetUserId();
        if (userId == null)
        {
            return new()
            {
                Errors = new List<GenericError>() {
                    new CoreError(CoreErrorCode.NotLogin, "You aren't logged in")
                }
            };
        }
        item.UserId = (int)userId;
        return RecentDM.GetInstance().SaveWithError(item);
    }
}