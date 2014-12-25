using System;

namespace Pather.Common.Models.GameSegment.Base
{
    [Serializable]
    public abstract class GameSegment_PubSub_Message
    {
        public GameSegment_PubSub_MessageType Type;
    }

    [Serializable]
    public class UserMoved_Gateway_GameSegment_PubSub_Message : GameSegment_PubSub_Message
    {
        public UserMoved_Gateway_GameSegment_PubSub_Message()
        {
            Type = GameSegment_PubSub_MessageType.UserMoved;
        }

        public string UserId;
        public int X;
        public int Y;
        public long LockstepTick;
    }
}