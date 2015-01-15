using Pather.Common.GameFramework;
using Pather.Servers.Common;
using Pather.Servers.Common.ServerLogging;
using Pather.Servers.GameSegmentServer;
using Pather.Servers.Utils;

namespace Pather.Servers.GameWorldServer
{
    public class DefaultInstanitateLogic : IInstantiateLogic
    {
        public GameWorld CreateGameWorld(GameWorldPubSub gameWorldPubSub, BackEndTickManager backEndTickManager, ServerLogger serverLogger)
        {
            return new GameWorld(gameWorldPubSub, backEndTickManager, this, serverLogger);
        }

        public ServerGame CreateServerGame(ServerGameManager serverGameManager, BackEndTickManager backEndTickManager)
        {
            return new ServerGame(serverGameManager, backEndTickManager);
        }

        public GameBoard CreateGameBoard()
        {
            
            return new GameBoard();
        }
    }
}