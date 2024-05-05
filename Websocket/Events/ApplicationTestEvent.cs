using AventusSharp.Tools.Attributes;
using AventusSharp.WebSocket.Attributes;
using AventusSharp.WebSocket.Event;
using Path = AventusSharp.WebSocket.Attributes.Path;

namespace Core.Websocket.Events
{
    [EndPoint<MainEndPoint>]
    public class ApplicationTestEvent : WsEvent<ApplicationTestEvent.Body>
    {
        protected override async Task<Body> Prepare()
        {
            return new Body() { id = 1, name = "test" };
        }

        [Typescript]
        public class Body
        {
            public int id;
            public string name;
        }
    }




    [Path("/application/test/2")]
    public class ApplicationTestEvent2 : WsEvent<string>
    {
        protected override async Task<string> Prepare()
        {
            return "hello world";
        }
    }
}
