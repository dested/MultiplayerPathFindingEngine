using System;
using Pather.Common.Models.Common.UserActions;

namespace Pather.Common.Models.GameSegment.Base
{
    [Serializable]
    public class TellUserAction_GameSegment_GameSegment_PubSub_Message : GameSegment_PubSub_Message
    {
        public TellUserAction_GameSegment_GameSegment_PubSub_Message()
        {
            Type = GameSegment_PubSub_MessageType.TellGameSegmentAction;
        }
        public string UserId;
        public UserAction Action;
        public string OriginatingGameSegmentId;
    }
}