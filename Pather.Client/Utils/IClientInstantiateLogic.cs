using Pather.Client.GameFramework;

namespace Pather.Client.Utils
{
    public interface IClientInstantiateLogic
    {
        ClientGameManager CreateClientGameManager();
        ClientGame CreateClientGame(FrontEndTickManager frontEndTickManager);
    }
}