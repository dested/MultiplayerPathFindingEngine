using System;
using Pather.Common.Models.Common;

namespace Pather.Common.Models.GameSegment.Base
{
    [Serializable]
    public abstract class GameSegment_PubSub_AllMessage : IPubSub_Message
    {
        public GameSegment_PubSub_AllMessageType Type;
    }
}