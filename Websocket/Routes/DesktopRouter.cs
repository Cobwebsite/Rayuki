using AventusSharp.WebSocket;
using AventusSharp.WebSocket.Attributes;
using Core.Data;
using Core.Logic;
using Core.Websocket.Events;
using Path = AventusSharp.WebSocket.Attributes.Path;
using ListenOnBoot = AventusSharp.WebSocket.Attributes.ListenOnBoot;
using Core.Websocket.Attributes;
using AventusSharp.Tools;

namespace Core.Websocket.Routes
{
    [EndPoint<MainEndPoint>]
    public class DesktopRouter : WsRouter
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
        public async Task<DesktopAppIcon?> SetDesktopIcon(DesktopAppIcon icon)
        {
            if (icon.Id == 0)
            {
                if (!await icon.Create())
                {
                    return null;
                }
            }
            else
            {
                if (!await icon.Update())
                {
                    return null;
                }
            }
            return icon;
        }

        [Path("/desktop/RemoveDesktopIcon")]
        [ListenOnBoot]
        [UserBroadcast]
        public async Task<bool> RemoveDesktopIcon(DesktopAppIcon icon)
        {
            return await icon.Delete();
        }


    }
}
