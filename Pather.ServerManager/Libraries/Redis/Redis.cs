using System.Runtime.CompilerServices;
using Pather.Common.Libraries.NodeJS;

namespace Pather.ServerManager.Libraries.Redis
{
    [Imported]
    [IgnoreNamespace]
    public class Redis : NodeModule
    {
        [ScriptName("debug_mode")] public bool DebugMode;

        public RedisClient CreateClient(int port, string ip)
        {
            return null;
        }
    }
}