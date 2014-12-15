using System.Runtime.CompilerServices;

namespace SocketIOWebLibrary
{
    [IgnoreNamespace]
    [Imported()]
    [ScriptName("io")]
    public class SocketIOClient : EventEmitter
    {
        [ScriptName("connect")]
        public static SocketIOClient Connect(string server)
        {
            return null;
        }
    }
}