using System;

namespace Pather.Common.Models.Gateway.Socket.Base
{
    [Serializable]
    public abstract class Gateway_User_Socket_Message : User_Socket_Message
    {
        public Gateway_User_Socket_MessageType GatewayUserMessageType;
    }
}