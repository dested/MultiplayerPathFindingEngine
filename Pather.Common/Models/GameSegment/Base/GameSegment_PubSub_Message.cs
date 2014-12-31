using System;
using Pather.Common.Models.Common;

namespace Pather.Common.Models.GameSegment.Base
{
    [Serializable]
    public abstract class GameSegment_PubSub_Message : IPubSub_Message
    {
        public GameSegment_PubSub_MessageType Type;
    }
}