using System;
using Pather.Common.Models.Common;

namespace Pather.Common.Models.Head.Base
{
    [Serializable]
    public abstract class Head_PubSub_Message : IPubSub_Message
    {
        public Head_PubSub_MessageType Type;
    }
}