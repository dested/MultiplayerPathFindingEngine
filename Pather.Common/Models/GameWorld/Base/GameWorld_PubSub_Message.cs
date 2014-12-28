using System;
using Pather.Common.Models.Common;

namespace Pather.Common.Models.GameWorld.Base
{
    [Serializable]
    public abstract class GameWorld_PubSub_Message : IPubSub_Message
    {
        public GameWorld_PubSub_MessageType Type;
    }
}