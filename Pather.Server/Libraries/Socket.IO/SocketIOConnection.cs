using System.Runtime.CompilerServices;
using Pather.Server.Libraries.NodeJS;

namespace Pather.Server.Libraries.Socket.IO
{
    [IgnoreNamespace]
    [Imported()]
    public class SocketIOConnection : EventEmitter
    {
        [IntrinsicProperty]
        public EventEmitter Broadcast { get; set; }
    }
}