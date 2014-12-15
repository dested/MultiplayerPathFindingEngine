using System.Runtime.CompilerServices;

namespace Pather.Server.Libraries.Socket.IO
{
    [IgnoreNamespace]
    [Imported()]
    public class SocketIOClient
    {
        [IntrinsicProperty]
        public Socket Sockets { get; set; }

        [ScriptName("set")]
        public void Set(string option, int value) {}
    }
}