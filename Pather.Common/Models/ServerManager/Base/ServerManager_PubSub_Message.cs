using System;
using Pather.Common.Models.Common;

namespace Pather.Common.Models.ServerManager.Base
{
    [Serializable]
    public abstract class ServerManager_PubSub_Message : IPubSub_Message
    {
        public ServerManager_PubSub_MessageType Type;
    }
}