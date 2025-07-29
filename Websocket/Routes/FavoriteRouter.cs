using AventusSharp.Data.Manager;
using AventusSharp.Tools;
using AventusSharp.WebSocket;
using AventusSharp.WebSocket.Attributes;
using Core.Data;
using Core.Logic;
using Core.Tools;

namespace Core.Websocket.Routes;


[EndPoint<MainEndPoint>]
public class FavoriteRouter : StorableWsRouter<Favorite>
{
    protected override IGenericDM<Favorite>? GetDM()
    {
        return FavoriteDM.GetInstance();
    }

    protected override ResultWithError<List<Favorite>> DM_GetAll(HttpContext context)
    {
        return FavoriteDM.GetInstance().GetAllForUser(context.GetUserId());
    }

    protected override ResultWithError<Favorite> DM_Create(HttpContext context, Favorite item)
    {
        ResultWithError<Favorite> result = new ResultWithError<Favorite>();
        result.Run(() => context.setUserId(item)); 
        result.Run(() => base.DM_Create(context, item)); 
        return result;
    }
}