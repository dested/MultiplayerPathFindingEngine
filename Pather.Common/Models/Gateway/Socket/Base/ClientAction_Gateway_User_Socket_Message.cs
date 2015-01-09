using System;
using Pather.Common.Models.Common.Actions.ClientActions.Base;

namespace Pather.Common.Models.Gateway.Socket.Base
{
    [Serializable]
    public class ClientAction_Gateway_User_Socket_Message : Gateway_User_Socket_Message
    {
        public ClientAction_Gateway_User_Socket_Message()
        {
            GatewayUserMessageType = Gateway_User_Socket_MessageType.ClientAction;
        }

        public string UserId;
        public ClientAction Action;
    }
}