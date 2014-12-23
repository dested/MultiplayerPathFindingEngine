using System;

namespace Pather.Common.Models.GameWorld
{
    [Serializable]
    public class CreateGameSegment_Response_GameWorld_PubSub_Message : GameWorld_PubSub_ReqRes_Message
    {
        public CreateGameSegment_Response_GameWorld_PubSub_Message()
        {
            Type = GameWorld_PubSub_MessageType.CreateGameSegmentResponse;
        }

        public string GameSegmentId;
    }
}