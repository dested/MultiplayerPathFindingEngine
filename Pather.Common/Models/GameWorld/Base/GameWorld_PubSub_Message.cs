﻿using System;

namespace Pather.Common.Models.GameWorld.Base
{
    [Serializable]
    public abstract class GameWorld_PubSub_Message
    {
        public GameWorld_PubSub_MessageType Type;
    }
}