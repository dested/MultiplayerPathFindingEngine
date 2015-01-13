using Pather.Common.GameFramework;
using Pather.Servers.Common;
using Pather.Servers.GameSegmentServer;
using Pather.Servers.GameWorldServer;

namespace Pather.Servers.Utils
{
    public interface IInstantiateLogic
    {
        GameWorld CreateGameWorld(GameWorldPubSub gameWorldPubSub, BackEndTickManager backEndTickManager);
        ServerGame CreateServerGame(ServerGameManager serverGameManager, BackEndTickManager backEndTickManager);
        GameBoard CreateGameBoard();
    }
}