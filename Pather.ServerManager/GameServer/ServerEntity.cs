using Pather.Common;
using Pather.ServerManager.Libraries.Socket.IO;

namespace Pather.ServerManager.GameServer
{
    public class ServerEntity:Entity
    {
        public SocketIOConnection Socket ;
        public ServerEntity(Game game,string playerId) : base(game, playerId)
        {
        }
    }
}