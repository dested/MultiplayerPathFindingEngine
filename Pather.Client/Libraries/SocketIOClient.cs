using System.Runtime.CompilerServices;
using Pather.Common.Libraries.NodeJS;

namespace Pather.Client.Libraries
{
    [IgnoreNamespace]
    [Imported()]
    [ScriptName("io")]
    public class SocketIOClient : EventEmitter
    {
        [ScriptName("connect")]
        public static SocketIOClient Connect(string server, object options = null)
        {
            return null;
        }
    }
}