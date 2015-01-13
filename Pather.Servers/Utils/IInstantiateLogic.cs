using Pather.Servers.Common;
using Pather.Servers.GameWorldServer;

namespace Pather.Servers.Utils
{
    public interface IInstantiateLogic
    {
        GameWorld CreateGameWorld(GameWorldPubSub gameWorldPubSub, BackEndTickManager backEndTickManager);
    }
}