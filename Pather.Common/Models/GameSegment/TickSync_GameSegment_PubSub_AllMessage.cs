using System;
using System.Collections.Generic;
using Pather.Common.Models.Common;
using Pather.Common.Models.GameSegment.Base;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class TickSync_GameSegment_PubSub_AllMessage : GameSegment_PubSub_AllMessage
    {
        public TickSync_GameSegment_PubSub_AllMessage(long lockstepTickNumber)
        {
            Type = GameSegment_PubSub_AllMessageType.TickSync;
            LockstepTickNumber = lockstepTickNumber;
        }

        public long LockstepTickNumber;
    }


    [Serializable]
    public class UserMovedCollection_GameSegment_GameSegment_PubSub_Message : GameSegment_PubSub_Message
    {
        public UserMovedCollection_GameSegment_GameSegment_PubSub_Message()
        {
            Type = GameSegment_PubSub_MessageType.UserMovedCollection;
        }

        public List<UserMovedMessage> Items;
    }
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