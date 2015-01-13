using GameLogic.Common;
using Pather.Common.GameFramework;
using Pather.Servers.Common;
using Pather.Servers.GameSegmentServer;
using Pather.Servers.GameWorldServer;
using Pather.Servers.Utils;

namespace GameLogic.Server
{
    public class InstantiateLogic : IInstantiateLogic
    {
        public GameWorld CreateGameWorld(GameWorldPubSub gameWorldPubSub, BackEndTickManager backEndTickManager)
        {
            return new LogicGameWorld(gameWorldPubSub, backEndTickManager,this);
        }

        public ServerGame CreateServerGame(ServerGameManager serverGameManager, BackEndTickManager backEndTickManager)
        {
            return new LogicServerGame(serverGameManager, backEndTickManager);
        }

        public GameBoard CreateGameBoard()
        {
            return new LogicGameBoard();
        }
    }

}