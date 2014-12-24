using System;
using Pather.Common.Models.GameWorld.Base;

namespace Pather.Common.Models.GameWorld
{
    [Serializable]
    public class Pong_Tick_GameWorld_PubSub_Message : GameWorld_PubSub_Message
    {
        public Pong_Tick_GameWorld_PubSub_Message()
        {
            Type = GameWorld_PubSub_MessageType.Pong;
        }
    }
}