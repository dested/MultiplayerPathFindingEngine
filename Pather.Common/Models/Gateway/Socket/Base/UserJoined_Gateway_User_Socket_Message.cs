using System;

namespace Pather.Common.Models.Gateway.Socket.Base
{
    [Serializable]
    public class UserJoined_Gateway_User_Socket_Message : Gateway_User_Socket_Message
    {
        public UserJoined_Gateway_User_Socket_Message()
        {
            GatewayUserMessageType = Gateway_User_Socket_MessageType.UserJoined;
        }

        public string UserId;
        public double X;
        public double Y;
        public string[][] Grid;
        public long LockstepTickNumber;
        public int ServerLatency;
    }
}