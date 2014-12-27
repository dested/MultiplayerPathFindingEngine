using System;
using System.Collections.Generic;
using Pather.Common.Models.GameSegment.Base;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message :
        GameSegment_PubSub_ReqRes_Message
    {
        public InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message()
        {
            Type = GameSegment_PubSub_MessageType.InitializeGameSegmentResponse;
            Response = true;
        }

        public List<string> GameSegmentIds;
        public List<InitialGameUser> AllUsers;
    }
    [Serializable]
    public class NewGameSegment_GameWorld_GameSegment_PubSub_Message :GameSegment_PubSub_Message
    {
        public NewGameSegment_GameWorld_GameSegment_PubSub_Message()
        {
            Type = GameSegment_PubSub_MessageType.NewGameSegment;
        }

        public string GameSegmentId;
    }
}