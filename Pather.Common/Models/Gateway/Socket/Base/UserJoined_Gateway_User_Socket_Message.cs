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
        public int X;
        public int Y;
        public int[][] Grid;
        public long LockstepTickNumber;
        public int ServerLatency;
    }
}