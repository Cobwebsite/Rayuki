using AventusSharp.Tools.Attributes;
using AventusSharp.WebSocket.Attributes;
using AventusSharp.WebSocket.Event;

namespace Core.Websocket.Events
{
    [EndPoint<MainEndPoint>]
    public class TransactionCancelledEvent : WsEvent<TransactionCancelledEvent.Body>
    {
        private string guid;
        public TransactionCancelledEvent(string guid)
        {
            this.guid = guid;
        }
        protected override Task<Body> Prepare()
        {
            return Task.FromResult(new Body() { guid = guid });
        }

        [Typescript]
        public class Body
        {
            public string guid;
        }
    }



}
