using System;
using Pather.Common.Models.Common;

namespace Pather.Common.Models.ServerManager.Base
{
    [Serializable]
    public abstract class ServerManager_PubSub_Message : IPubSub_Message
    {
        public ServerManager_PubSub_MessageType Type;
    }
    [Serializable]
    public class CreateGameSegment_GameWorld_ServerManager_PubSub_ReqRes_Message : ServerManager_PubSub_ReqRes_Message
    {
        public CreateGameSegment_GameWorld_ServerManager_PubSub_ReqRes_Message()
        {
            Type = ServerManager_PubSub_MessageType.CreateGameSegment;
        }
    }
    [Serializable]
    public class CreateGateway_Head_ServerManager_PubSub_ReqRes_Message : ServerManager_PubSub_ReqRes_Message
    {
        public CreateGateway_Head_ServerManager_PubSub_ReqRes_Message()
        {
            Type = ServerManager_PubSub_MessageType.CreateGateway;
        }
    }
}