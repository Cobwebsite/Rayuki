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
}