using System;
using Pather.Common.Models.Gateway.PubSub.Base;

namespace Pather.Common.Models.Gateway.PubSub
{
    [Serializable]
    public class Pong_Tick_Gateway_PubSub_Message : Gateway_PubSub_Message
    {
        public Pong_Tick_Gateway_PubSub_Message()
        {
            Type = Gateway_PubSub_MessageType.Pong;
        }
    }
    [Serializable]
    public class UserMoved_GameSegment_Gateway_PubSub_Message : Gateway_PubSub_Message
    {
        public UserMoved_GameSegment_Gateway_PubSub_Message()
        {
            Type = Gateway_PubSub_MessageType.UserMoved;
        }

        public string UserId;
        public int X;
        public int Y;
        public long LockstepTick;
    }

}