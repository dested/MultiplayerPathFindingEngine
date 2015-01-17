using System;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Servers.Common.ServerLogging;
using Pather.Servers.Libraries.ExpressJS;

namespace Pather.Servers.AuthServer
{
    public class AuthServer
    {
        public ServerLogger ServerLogger;
        public AuthServer()
        {
            ServerLogger = new ServerLogger("Auth");

            var app = Global.Require<Func<Express>>("express")();
            
            app.Post("/auth", (req, res) =>
            {
            });

            if (ConnectionConstants.Production)
            {
                app.Listen(3222, ConnectionConstants.MainDomain);

            }
            else
            {
                app.Listen(3222);

            }



        }

    }
}