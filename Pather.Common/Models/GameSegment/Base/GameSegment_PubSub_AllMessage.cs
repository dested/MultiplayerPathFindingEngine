using System;

namespace Pather.Common.Models.GameSegment.Base
{
    [Serializable]
    public abstract class GameSegment_PubSub_AllMessage
    {
        public GameSegment_PubSub_AllMessageType Type;
    }
}