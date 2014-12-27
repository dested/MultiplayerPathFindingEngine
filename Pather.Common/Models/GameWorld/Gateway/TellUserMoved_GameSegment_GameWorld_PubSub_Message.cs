using System;
using Pather.Common.Models.GameWorld.Base;

namespace Pather.Common.Models.GameWorld.Gateway
{
    [Serializable]
    public class TellUserMoved_GameSegment_GameWorld_PubSub_Message : GameWorld_PubSub_Message
    {
        public TellUserMoved_GameSegment_GameWorld_PubSub_Message()
        {
            Type = GameWorld_PubSub_MessageType.TellUserMoved;
        }

        public string UserId;
        public int X;
        public int Y;
        public long LockstepTick;
    }
}