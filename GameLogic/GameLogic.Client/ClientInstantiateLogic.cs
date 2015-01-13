using Pather.Client;
using Pather.Client.GameFramework;
using Pather.Client.Utils;

namespace GameLogic.Client
{
    public class ClientInstantiateLogic : IClientInstantiateLogic
    {
        public ClientGameManager CreateClientGameManager()
        {
            return new LogicClientGameManager(this);
        }

        public ClientGame CreateClientGame(FrontEndTickManager frontEndTickManager, NetworkManager networkManager)
        {
            return new LogicClientGame(frontEndTickManager,networkManager);
        }
    }
}