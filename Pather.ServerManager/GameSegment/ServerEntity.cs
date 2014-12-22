using Pather.Common;
using Pather.ServerManager.Common.SocketManager;

namespace Pather.ServerManager.GameSegment
{
    public class ServerEntity : Entity
    {
        public ISocket Socket;

        public ServerEntity(Game game, string playerId) : base(game, playerId)
        {
        }
    }
}