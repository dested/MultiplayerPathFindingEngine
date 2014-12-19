using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Pather.Common;
using Pather.Common.Models;
using Pather.Common.Utils;
using Pather.Server.Libraries.NodeJS;
using Pather.Server.Libraries.Socket.IO;

namespace Pather.Server
{
    public class Server
    {
        public Server()
        {
            Global.SetInterval(() => { Global.Console.Log("keep alive " + new DateTime().ToString().Substring(17, 24)); }, 10 * 1000);



            var game = new ServerGame();
            game.Init();

        }

        public static void Main()
        {
            new Server();
        }
    }



}