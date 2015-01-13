using Pather.Common.Libraries.NodeJS;
using Pather.Servers.Common;
using Pather.Servers.GameWorldServer;

namespace GameLogic.Server
{
    public class LogicGameWorld : GameWorld
    {
        public LogicGameWorld(GameWorldPubSub gameWorldPubSub, BackEndTickManager backEndTickManager) : base(gameWorldPubSub, backEndTickManager)
        {
            Global.Console.Log("Hello logic!");
        }
    }
}