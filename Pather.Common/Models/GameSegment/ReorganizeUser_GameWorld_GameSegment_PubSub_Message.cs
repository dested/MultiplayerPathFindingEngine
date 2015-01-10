using System;
using System.Collections.Generic;
using Pather.Common.Models.Common;
using Pather.Common.Models.GameSegment.Base;
using Pather.Common.Utils;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class ReorganizeUser_GameWorld_GameSegment_PubSub_Message : GameSegment_PubSub_Message
    {
        public ReorganizeUser_GameWorld_GameSegment_PubSub_Message()
        {
            Type = GameSegment_PubSub_MessageType.ReorganizeGameSegment;
        }

        public string NewGameSegmentId;
        public string UserId;
        public long SwitchAtLockstepNumber;
    }

    [Serializable]
    public class TransferUser_GameSegment_GameSegment_PubSub_Message : GameSegment_PubSub_Message
    {
        public TransferUser_GameSegment_GameSegment_PubSub_Message()
        {
            Type = GameSegment_PubSub_MessageType.TransferGameUser;
        }

        public string UserId;
        public JsDictionary<long, Point> LockstepMovePoints;
        public List<InProgressClientAction> InProgressActions;
        public long SwitchAtLockstepNumber;
    }

    [Serializable]
    public class TellTransferUser_GameSegment_GameSegment_PubSub_Message : GameSegment_PubSub_Message
    {
        public TellTransferUser_GameSegment_GameSegment_PubSub_Message()
        {
            Type = GameSegment_PubSub_MessageType.TellTransferUser;
        }

        public string UserId;
        public string NewGameSegmentId;
    }
}