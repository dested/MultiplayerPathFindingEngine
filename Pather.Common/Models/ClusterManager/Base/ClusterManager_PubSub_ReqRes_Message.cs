using System;
using Pather.Common.Models.Common;
using Pather.Common.Utils;

namespace Pather.Common.Models.ClusterManager.Base
{
    [Serializable]
    public abstract class ClusterManager_PubSub_ReqRes_Message : ClusterManager_PubSub_Message, IPubSub_ReqRes_Message
    {
        public ClusterManager_PubSub_ReqRes_Message()
        {
            MessageId = Utilities.UniqueId();
        }

        public string MessageId { get; set; }
        public bool Response { get; set; }
    }
}