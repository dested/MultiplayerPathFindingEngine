using System;
using Pather.Common.Models.Common;

namespace Pather.Common.Models.ClusterManager.Base
{
    [Serializable]
    public abstract class ClusterManager_PubSub_Message : IPubSub_Message
    {
        public ClusterManager_PubSub_MessageType Type;
    }
}