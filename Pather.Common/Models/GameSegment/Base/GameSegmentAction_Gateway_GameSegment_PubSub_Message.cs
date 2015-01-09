using System;
using Pather.Common.Models.Common.Actions.GameSegmentAction.Base;

namespace Pather.Common.Models.GameSegment.Base
{
    [Serializable]
    public class GameSegmentAction_Gateway_GameSegment_PubSub_Message : GameSegment_PubSub_Message
    {
        public GameSegmentAction_Gateway_GameSegment_PubSub_Message()
        {
            Type = GameSegment_PubSub_MessageType.GameSegmentAction;
        }

        public string UserId;
        public GameSegmentAction Action;
    }
}