using System;

namespace Pather.Common.Models.Gateway.Socket.Base
{
    [Serializable]
    public class Pong_Gateway_User_PubSub_Message : Gateway_User_Socket_Message
    {
        public Pong_Gateway_User_PubSub_Message()
        {
            GatewayUserMessageType = Gateway_User_Socket_MessageType.Pong;
        }

        public int GatewayLatency;
    }
}