using System;
using System.Collections.Generic;
using Pather.Servers.GameWorldServer.Models;

namespace Pather.Servers.GameWorldServer
{
    internal class UserAndNeighbors
    {
        public UserAndNeighbors(GameWorldUser player)
        {
            Player = player;

            Neighbors = new List<GameWorldNeighbor>();
        }

        public GameWorldUser Player;
        public List<GameWorldNeighbor> Neighbors;
    }
}