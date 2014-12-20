using Pather.Common;
using Pather.Server.Libraries.Socket.IO;

namespace Pather.Server
{
    public class ServerEntity:Entity
    {
        public SocketIOConnection Socket ;
        public ServerEntity(Game game,string playerId) : base(game, playerId)
        {
        }
    }
}