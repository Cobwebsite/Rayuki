using AventusSharp.WebSocket;
using AventusSharp.WebSocket.Attributes;
using Core.Data;
using Core.Logic;
using Core.Websocket.Events;
using Path = AventusSharp.WebSocket.Attributes.Path;
using ListenOnBoot = AventusSharp.WebSocket.Attributes.ListenOnBoot;
using Core.Tools;
using Core.Websocket.Attributes;

namespace Core.Websocket.Routes
{
    [EndPoint<MainEndPoint>("desktop")]
    public class DesktopRouter : WsRoute
    {

        [Path("/desktop/RegisterOpenApp")]
        [ListenOnBoot]
        [UserBroadcast]
        public ApplicationOpenInfo RegisterOpenApp(HttpContext context, ApplicationOpenInfo appInfo)
        {
            DesktopDM.GetInstance().RegisterOpenApp(appInfo.DesktopId, appInfo.Info);
            return appInfo;
        }

        [Path("/desktop/RemoveApp")]
        [ListenOnBoot]
        [UserBroadcast]
        public ApplicationOpenInfo RemoveApp(HttpContext context, ApplicationOpenInfo appInfo)
        {
            DesktopDM.GetInstance().RemoveApp(appInfo.DesktopId, appInfo.Info);
            return appInfo;
        }


        [Path("/desktop/SetDesktopIcon")]
        [ListenOnBoot]
        [UserBroadcast]
        public DesktopAppIcon? SetDesktopIcon(DesktopAppIcon icon)
        {
            if (icon.Id == 0)
            {
                if(!icon.Create())
                {
                    return null;
                }
            }
            else
            {
                if (!icon.Update())
                {
                    return null;
                }
            }
            return icon;
        }

        [Path("/desktop/RemoveDesktopIcon")]
        [ListenOnBoot]
        [UserBroadcast]
        public bool RemoveDesktopIcon(DesktopAppIcon icon)
        {
            return icon.Delete();
        }
    
        
    }
}
