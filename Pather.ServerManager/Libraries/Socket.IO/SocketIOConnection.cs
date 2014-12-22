using System.Runtime.CompilerServices;
using Pather.Common.Libraries.NodeJS;

namespace Pather.ServerManager.Libraries.Socket.IO
{
    [IgnoreNamespace]
    [Imported()]
    public class SocketIOConnection : EventEmitter
    {
        public EventEmitter Broadcast;
    }
}