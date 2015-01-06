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
        public int[][] Grid;
        public long LockstepTickNumber;
        public int ServerLatency;
    }
}