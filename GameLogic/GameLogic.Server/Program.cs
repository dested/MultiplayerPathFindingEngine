using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pather.Common.Models.GameWorld.Gateway;
using Pather.Servers;

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
}
