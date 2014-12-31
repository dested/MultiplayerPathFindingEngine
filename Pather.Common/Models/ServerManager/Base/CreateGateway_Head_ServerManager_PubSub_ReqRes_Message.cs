using System;

namespace Pather.Common.Models.ServerManager.Base
{
    [Serializable]
    public class CreateGateway_Head_ServerManager_PubSub_ReqRes_Message : ServerManager_PubSub_ReqRes_Message
    {
        public CreateGateway_Head_ServerManager_PubSub_ReqRes_Message()
        {
            Type = ServerManager_PubSub_MessageType.CreateGateway;
        }
    }
}