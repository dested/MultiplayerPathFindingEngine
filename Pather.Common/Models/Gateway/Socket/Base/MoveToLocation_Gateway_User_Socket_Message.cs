using System;

namespace Pather.Common.Models.Gateway.Socket.Base
{
    [Serializable]
    public class MoveToLocation_Gateway_User_Socket_Message : Gateway_User_Socket_Message
    {
        public MoveToLocation_Gateway_User_Socket_Message()
        {
            GatewayUserMessageType = Gateway_User_Socket_MessageType.Move;
        }

        public int X;
        public int Y;
        public long LockstepTick;
        public string UserId;
    }
}