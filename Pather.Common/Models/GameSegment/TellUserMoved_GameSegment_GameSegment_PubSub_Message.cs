using System;
using Pather.Common.Models.GameSegment.Base;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class TellUserMoved_GameSegment_GameSegment_PubSub_Message : GameSegment_PubSub_Message
    {
        public TellUserMoved_GameSegment_GameSegment_PubSub_Message()
        {
            Type = GameSegment_PubSub_MessageType.TellUserMoved;
        }

        public string UserId;
        public int X;
        public int Y;
        public long LockstepTick;
    }
}