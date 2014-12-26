using System;

namespace Pather.Common.Models.GameSegment.Base
{
    [Serializable]
    public abstract class GameSegment_PubSub_Message
    {
        public GameSegment_PubSub_MessageType Type;
    }
}