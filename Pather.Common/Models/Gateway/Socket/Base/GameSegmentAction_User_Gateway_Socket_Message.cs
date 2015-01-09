using System;
using Pather.Common.Models.Common.Actions.GameSegmentAction.Base;

namespace Pather.Common.Models.Gateway.Socket.Base
{
    [Serializable]
    public class GameSegmentAction_User_Gateway_Socket_Message : User_Gateway_Socket_Message
    {
        public GameSegmentAction_User_Gateway_Socket_Message()
        {
            UserGatewayMessageType = User_Gateway_Socket_MessageType.GameSegmentAction;
        }

        public GameSegmentAction GameSegmentAction;
    }
}