using Pather.Servers.Common.ServerLogging;

namespace Pather.Servers.AuthServer
{
    public class AuthServer
    {
        public AuthServer()
        {
            ServerLogger.InitLogger("Auth", "0");
        }
    }
}