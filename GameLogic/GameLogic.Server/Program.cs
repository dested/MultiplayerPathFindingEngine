using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameWorld.Gateway;
using Pather.Servers;
using Pather.Servers.Common;
using Pather.Servers.GameWorldServer;
using Pather.Servers.Utils;

namespace GameLogic.Server
{
    class Program
    {
        static void Main()
        {
            var serverStarter = new ServerStarter();
            serverStarter.Start(new InstantiateLogic());
        }
    }


    public class InstantiateLogic : IInstantiateLogic
    {
        public GameWorld CreateGameWorld(GameWorldPubSub gameWorldPubSub, BackEndTickManager backEndTickManager)
        {
            return new LogicGameWorld(gameWorldPubSub, backEndTickManager);
        }
    }


    public class LogicGameWorld : GameWorld
    {
        public LogicGameWorld(GameWorldPubSub gameWorldPubSub, BackEndTickManager backEndTickManager) : base(gameWorldPubSub, backEndTickManager)
        {
            Global.Console.Log("Hello logic!");
        }
    }
}
