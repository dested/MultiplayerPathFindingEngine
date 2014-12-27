using System;
using System.Collections.Generic;
using Pather.Common.Models.Common;
using Pather.Common.Models.GameSegment.Base;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class UserMoved_GameSegment_GameSegment_PubSub_Message : GameSegment_PubSub_Message
    {
        public UserMoved_GameSegment_GameSegment_PubSub_Message()
        {
            Type = GameSegment_PubSub_MessageType.UserMovedFromGameSegment;
        }
        public int X;
        public int Y;
        public long LockstepTick;
        public string UserId;

    }
}