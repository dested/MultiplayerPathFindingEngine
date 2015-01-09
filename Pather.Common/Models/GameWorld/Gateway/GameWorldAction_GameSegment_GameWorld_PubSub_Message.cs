using System;
using Pather.Common.Models.Common.Actions.GameWorldAction.Base;
using Pather.Common.Models.GameWorld.Base;

namespace Pather.Common.Models.GameWorld.Gateway
{
    [Serializable]
    public class GameWorldAction_GameSegment_GameWorld_PubSub_Message : GameWorld_PubSub_Message
    {
        public GameWorldAction_GameSegment_GameWorld_PubSub_Message()
        {
            Type = GameWorld_PubSub_MessageType.GameWorldAction;
        }

        public string UserId;
        public GameWorldAction Action;
        public string OriginatingGameSegmentId;
    }
}