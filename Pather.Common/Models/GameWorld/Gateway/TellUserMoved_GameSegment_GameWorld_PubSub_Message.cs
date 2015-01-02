using System;
using Pather.Common.Models.Common.UserActions;
using Pather.Common.Models.GameWorld.Base;

namespace Pather.Common.Models.GameWorld.Gateway
{
    [Serializable]
    public class TellUserAction_GameSegment_GameWorld_PubSub_Message : GameWorld_PubSub_Message
    {
        public TellUserAction_GameSegment_GameWorld_PubSub_Message()
        {
            Type = GameWorld_PubSub_MessageType.TellUserAction;
        }

        public string UserId;
        public UserAction Action;
        public string OriginatingGameSegmentId;
    }
}