using System;

namespace Pather.Common.Models.ServerManager.Base
{
    [Serializable]
    public class CreateGameSegment_GameWorld_ServerManager_PubSub_ReqRes_Message : ServerManager_PubSub_ReqRes_Message
    {
        public CreateGameSegment_GameWorld_ServerManager_PubSub_ReqRes_Message()
        {
            Type = ServerManager_PubSub_MessageType.CreateGameSegment;
        }
    }
}