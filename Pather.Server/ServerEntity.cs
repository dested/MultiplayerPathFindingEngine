using Pather.Common;
using Pather.Server.Libraries.Socket.IO;

namespace Pather.Server
{
    public class ServerEntity:Entity
    {
        public SocketIOConnection Socket { get; set; }
        public ServerEntity(Game game,string playerId) : base(game, playerId)
        {
        }
    }
}