using System;
using Pather.Common.Models.Common.Actions.NeighborGameSegmentAction.Base;

namespace Pather.Common.Models.GameSegment.Base
{
    [Serializable]
    public class NeighborGameSegmentAction_GameSegment_GameSegment_PubSub_Message : GameSegment_PubSub_Message
    {
        public NeighborGameSegmentAction_GameSegment_GameSegment_PubSub_Message()
        {
            Type = GameSegment_PubSub_MessageType.GameSegmentAction;
        }

        public string UserId;
        public NeighborGameSegmentAction Action;
        public string OriginatingGameSegmentId;
    }
}