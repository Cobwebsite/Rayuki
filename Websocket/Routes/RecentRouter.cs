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
        ResultWithError<Recent> result = new ResultWithError<Recent>();
        result.Run(() => context.setUserId(item)); 
        result.Execute(() => base.DM_Create(context, item)); 
        return result;
    }


    [Path("/[StorableName]/Save")]
    [Broadcast]
    public virtual ResultWithError<Recent> Save(HttpContext context, Recent item)
    {
        item = OnReceive(item);
        ResultWithError<Recent> result = new ResultWithError<Recent>();
        result.Run(() => context.setUserId(item)); 
        result.Run(() => RecentDM.GetInstance().SaveWithError(item)); 
        return result;
    }
}