using System;

namespace Pather.Common.Models.Gateway.Socket.Base
{
    [Serializable]
    public class UserJoined_User_Gateway_Socket_Message : User_Gateway_Socket_Message
    {
        public UserJoined_User_Gateway_Socket_Message()
        {
            UserGatewayMessageType = User_Gateway_Socket_MessageType.Join;
        }

        public string UserToken { get; set; }
    }
}