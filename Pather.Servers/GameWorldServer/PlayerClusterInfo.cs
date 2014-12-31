using System;
using System.Collections.Generic;
using Pather.Servers.GameWorldServer.Models;

namespace Pather.Servers.GameWorldServer
{
    internal class PlayerClusterInfo
    {
        public PlayerClusterInfo(GameWorldUser player)
        {
            Player = player;
            Neighbors = new List<Tuple<double, GameWorldUser>>();
        }

        public GameWorldUser Player;
        public List<Tuple<double, GameWorldUser>> Neighbors;
    }
}