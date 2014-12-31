using System;

namespace Pather.Common.Models.Gateway.Socket.Base
{
    [Serializable]
    public class Ping_User_Gateway_Socket_Message : User_Gateway_Socket_Message
    {
        public Ping_User_Gateway_Socket_Message()
        {
            UserGatewayMessageType = User_Gateway_Socket_MessageType.Ping;
        }
    }
}