using System;

namespace Pather.Common.Models.Gateway.Socket.Base
{
    [Serializable]
    public class MoveToLocation_User_Gateway_Socket_Message : User_Gateway_Socket_Message
    {
        public MoveToLocation_User_Gateway_Socket_Message()
        {
            UserGatewayMessageType = User_Gateway_Socket_MessageType.Move;
        }

        public int X;
        public int Y;
        public long LockstepTick;
    }
    [Serializable]
    public class Ping_User_Gateway_Socket_Message : User_Gateway_Socket_Message
    {
        public Ping_User_Gateway_Socket_Message()
        {
            UserGatewayMessageType = User_Gateway_Socket_MessageType.Ping;
        }

    }
}