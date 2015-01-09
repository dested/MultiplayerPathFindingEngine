using System;
using Pather.Common.Models.Common.Actions.TellGameSegmentAction.Base;

namespace Pather.Common.Models.GameSegment.Base
{
    [Serializable]
    public class TellGameSegmentAction_GameSegment_GameSegment_PubSub_Message : GameSegment_PubSub_Message
    {
        public TellGameSegmentAction_GameSegment_GameSegment_PubSub_Message()
        {
            Type = GameSegment_PubSub_MessageType.TellGameSegmentAction;
        }

        public string UserId;
        public TellGameSegmentAction Action;
        public string OriginatingGameSegmentId;
    }
}