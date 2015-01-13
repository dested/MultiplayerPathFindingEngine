using Pather.Servers.Common;
using Pather.Servers.Utils;

namespace Pather.Servers.GameWorldServer
{
    public class DefaultInstanitateLogic : IInstantiateLogic
    {
        public GameWorld CreateGameWorld(GameWorldPubSub gameWorldPubSub, BackEndTickManager backEndTickManager)
        {
            return new GameWorld(gameWorldPubSub, backEndTickManager);
        }
    }
}