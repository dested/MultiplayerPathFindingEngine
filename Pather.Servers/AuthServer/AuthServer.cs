using Pather.Servers.Common.ServerLogging;

namespace Pather.Servers.AuthServer
{
    public class AuthServer
    {
        public ServerLogger ServerLogger;
        public AuthServer()
        {
            ServerLogger = new ServerLogger("Auth");

        }

    }
}