using System.Collections.Generic;

namespace Pather.ServerManager.GameWorldServer
{
    public class GameWorldUser
    {
        public string UserId;
        public int X;
        public int Y;
        public string GatewayServer;
        public GameServer GameServer;
        public List<GameWorldUser> Neighbors { get; set; }
    }
}