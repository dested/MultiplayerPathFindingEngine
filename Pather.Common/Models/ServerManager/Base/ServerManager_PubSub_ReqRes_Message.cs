using System;
using Pather.Common.Models.Common;
using Pather.Common.Utils;

namespace Pather.Common.Models.ServerManager.Base
{
    [Serializable]
    public abstract class ServerManager_PubSub_ReqRes_Message : ServerManager_PubSub_Message, IPubSub_ReqRes_Message
    {
        public ServerManager_PubSub_ReqRes_Message()
        {
            MessageId = Utilities.UniqueId();
        }

        public bool Response { get; set; }
        public string MessageId { get; set; }
    }
}