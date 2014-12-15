using System.Runtime.CompilerServices;

namespace Pather.Common
{
    public class SocketChannels
    {
        public static string ClientChannel(Client c)
        {
            return "Client." + c;
        }
        public static string ServerChannel(Server c)
        {
            return "Server." + c;
        }
        [NamedValues]
        public enum Client
        {
            Connect,
            Move
        }
        [NamedValues]
        public enum Server
        {
            Connect,
            NewPlayer,
            Move,
            PlayerLeft,
            PlayerList
        }
    }
}