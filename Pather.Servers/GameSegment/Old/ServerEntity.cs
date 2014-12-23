﻿using Pather.Common;
using Pather.Servers.Common.SocketManager;

namespace Pather.Servers.GameSegment.Old
{
    public class ServerEntity : Entity
    {
        public ISocket Socket;

        public ServerEntity(Game game, string playerId) : base(game, playerId)
        {
        }
    }
}