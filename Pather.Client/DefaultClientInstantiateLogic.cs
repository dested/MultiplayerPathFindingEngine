using Pather.Client.GameFramework;
using Pather.Client.Utils;

namespace Pather.Client
{
    public class DefaultClientInstantiateLogic : IClientInstantiateLogic
    {
        public ClientGameManager CreateClientGameManager()
        {
            return new ClientGameManager(this);
        }
        public ClientGame CreateClientGame(FrontEndTickManager frontEndTickManager)
        {
            return new ClientGame(frontEndTickManager);
        }

    }
}