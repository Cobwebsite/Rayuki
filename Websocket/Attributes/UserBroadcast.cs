using AventusSharp.WebSocket;
using AventusSharp.WebSocket.Attributes;
using Core.Tools;

namespace Core.Websocket.Attributes
{
    public class UserBroadcast : Custom
    {
        public override List<WebSocketConnection> GetConnections(WsEndPoint endPoint, WebSocketConnection? connection)
        {
            int userId = connection?.GetContext().GetUserId() ?? 0;
            if (endPoint is MainEndPoint mainEndPoint && userId != 0)
            {
                return mainEndPoint.GetConnectionsByUser(userId);
            }
            return new List<WebSocketConnection>();
        }
    }
}
