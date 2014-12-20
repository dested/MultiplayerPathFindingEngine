using System.Runtime.CompilerServices;
using Pather.Common.Libraries.NodeJS;

namespace Pather.Server.Libraries.Socket.IO
{
    [IgnoreNamespace]
    [Imported()]
    public class SocketIOConnection : EventEmitter
    {
        public EventEmitter Broadcast ;
    }
}