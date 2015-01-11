using System;
using Pather.Common.Models.GameSegment.Base;

namespace Pather.Common.Models.GameSegment
{
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