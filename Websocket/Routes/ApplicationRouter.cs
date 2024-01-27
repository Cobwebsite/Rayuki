using AventusSharp.WebSocket;
using AventusSharp.WebSocket.Attributes;
using Core.Data;
using Core.Logic;
using Core.Websocket.Events;
using Path = AventusSharp.WebSocket.Attributes.Path;
using ListenOnBoot = AventusSharp.WebSocket.Attributes.ListenOnBoot;
using Core.Tools;

namespace Core.Websocket.Routes
{
    [EndPoint<MainEndPoint>("application")]
    public class ApplicationRouter : WsRoute
    {

        [Path("/application2"), ListenOnBoot]
        public async Task<List<ApplicationData>> GetAll2(WebSocketConnection connection)
        {
            int userId = connection.GetContext().GetUserId() ?? 1;
            return ApplicationDM.GetInstance().GetAllAllowed(userId);
        }

        [Path("/application3")]
        public List<ApplicationData> GetAll3(int userId)
        {
            return ApplicationDM.GetInstance().GetAllAllowed(userId);
        }

        [Path("/application4")]
        public void GetAll4()
        {
        }

        public ApplicationTestEvent GetAll5()
        {
            return new ApplicationTestEvent();
        }
    }
}
