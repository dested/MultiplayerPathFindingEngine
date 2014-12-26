using System;

namespace Pather.Common.Models.Gateway.Socket.Base
{
    [Serializable]
    public abstract class User_Gateway_Socket_Message : Gateway_Socket_Message
    {
        public User_Gateway_Socket_MessageType UserGatewayMessageType;
    }
}