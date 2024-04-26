using AventusSharp.WebSocket;
using Core.Tools;
using System.Net.WebSockets;

namespace Core.Websocket
{
    public abstract class RayukiEndPoint : WsEndPoint
    {
        private Dictionary<int, List<WebSocketConnection>> connectionsByUser = new();

        public override string DefinePath()
        {
            return "/ws/" + DefineAppName();
        }

        public abstract string DefineAppName();

        public override bool Main()
        {
            return false;
        }

        public override bool CanOpenConnection(HttpContext context, WebSocket webSocket)
        {
            return context.IsConnected();
        }

        protected override Task OnConnectionClose(WebSocketConnection connection)
        {
            int? userIdTemp = connection.GetContext().GetUserId();
            if (userIdTemp != null)
            {
                int userId = (int)userIdTemp;
                connectionsByUser[userId].Remove(connection);
            }
            return base.OnConnectionClose(connection);
        }

        protected override Task OnConnectionOpen(WebSocketConnection connection)
        {
            int? userIdTemp = connection.GetContext().GetUserId();
            if (userIdTemp != null)
            {
                int userId = (int)userIdTemp;
                if (!connectionsByUser.ContainsKey(userId))
                {
                    connectionsByUser[userId] = new List<WebSocketConnection>();
                }
                connectionsByUser[userId].Add(connection);
            }
            return base.OnConnectionOpen(connection);
        }

        public List<WebSocketConnection> GetConnectionsByUser(int userId)
        {
            if (connectionsByUser.ContainsKey(userId))
            {
                return connectionsByUser[userId];
            }
            return new List<WebSocketConnection>();
        }
    }
}
