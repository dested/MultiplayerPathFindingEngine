using System;
using Pather.Common.Models.Common;

namespace Pather.Common.Models.Gateway.PubSub.Base
{
    [Serializable]
    public class Gateway_PubSub_AllMessage : IPubSub_Message
    {
        public Gateway_PubSub_AllMessageType Type;
    }
}