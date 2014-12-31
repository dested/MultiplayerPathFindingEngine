using System;
using Pather.Common.Models.Common;

namespace Pather.Common.Models.Gateway.PubSub.Base
{
    [Serializable]
    public abstract class Gateway_PubSub_Message : IPubSub_Message
    {
        public Gateway_PubSub_MessageType Type;
    }
}