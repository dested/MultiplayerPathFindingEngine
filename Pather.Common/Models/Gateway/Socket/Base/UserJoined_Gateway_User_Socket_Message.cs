using System;
using System.Collections.Generic;
using Pather.Common.Models.Common;

namespace Pather.Common.Models.Gateway.Socket.Base
{
    [Serializable]
    public class UserJoined_Gateway_User_Socket_Message : Gateway_User_Socket_Message
    {
        public UserJoined_Gateway_User_Socket_Message()
        {
            GatewayUserMessageType = Gateway_User_Socket_MessageType.UserJoined;
        }

        public string GameSegmentId;
        public string UserId;
        public int X;
        public int Y;
    }
    [Serializable]
    public class UpdateNeighbors_Gateway_User_Socket_Message : Gateway_User_Socket_Message
    {
        public UpdateNeighbors_Gateway_User_Socket_Message()
        {
            GatewayUserMessageType = Gateway_User_Socket_MessageType.UpdateNeighbors;
        }

        public List<string> Removed;
        public List<UpdatedNeighbor> Added;
    }
    [Serializable]
    public class TickSync_Gateway_User_Socket_Message : Gateway_User_Socket_Message
    {
        public TickSync_Gateway_User_Socket_Message()
        {
            GatewayUserMessageType = Gateway_User_Socket_MessageType.TickSync;
        }

        public long LockstepTickNumber;
    }
    [Serializable]
    public class Pong_Gateway_User_PubSub_Message : Gateway_User_Socket_Message
    {
        public Pong_Gateway_User_PubSub_Message()
        {
            GatewayUserMessageType = Gateway_User_Socket_MessageType.Pong;
        }

        public long GatewayLatency;
    }
    
}