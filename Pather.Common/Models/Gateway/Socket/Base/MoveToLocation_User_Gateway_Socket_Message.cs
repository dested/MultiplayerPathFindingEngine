using System;
using Pather.Common.Models.Common.UserActions;

namespace Pather.Common.Models.Gateway.Socket.Base
{
    [Serializable]
    public class UserAction_User_Gateway_Socket_Message : User_Gateway_Socket_Message
    {
        public UserAction_User_Gateway_Socket_Message()
        {
            UserGatewayMessageType = User_Gateway_Socket_MessageType.UserAction;
        }

        public UserAction Action;
    }
}