using System;
using Pather.Common.Models.Common.UserActions;

namespace Pather.Common.Models.Gateway.Socket.Base
{
    [Serializable]
    public class UserAction_Gateway_User_Socket_Message : Gateway_User_Socket_Message
    {
        public UserAction_Gateway_User_Socket_Message()
        {
            GatewayUserMessageType = Gateway_User_Socket_MessageType.UserAction;
        }

        public string UserId;
        public UserAction Action;
    }
}