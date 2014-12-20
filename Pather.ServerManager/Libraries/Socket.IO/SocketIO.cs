using System.Runtime.CompilerServices;
using Pather.Common.Libraries.NodeJS;

namespace Pather.Server.Libraries.Socket.IO
{
    [IgnoreNamespace]
    [Imported()]
    [ModuleName("socket.io")]
    [GlobalMethods]
    public static class SocketIO
    {
        public static SocketIOClient Listen(HttpServer app)
        {
            return null;
        }
    }
}