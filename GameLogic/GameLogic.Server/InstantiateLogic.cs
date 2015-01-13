using Pather.Servers.Common;
using Pather.Servers.GameWorldServer;
using Pather.Servers.Utils;

namespace GameLogic.Server
{
    public class InstantiateLogic : IInstantiateLogic
    {
        public GameWorld CreateGameWorld(GameWorldPubSub gameWorldPubSub, BackEndTickManager backEndTickManager)
        {
            return new LogicGameWorld(gameWorldPubSub, backEndTickManager);
        }
    }
}