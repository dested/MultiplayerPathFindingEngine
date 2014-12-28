using System;
using Pather.Common.Models.Common;

namespace Pather.Common.Models.Tick.Base
{
    [Serializable]
    public abstract class Tick_PubSub_Message : IPubSub_Message
    {
        public Tick_PubSub_MessageType Type;
    }
}