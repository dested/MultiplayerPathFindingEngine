using System;
using System.Runtime.CompilerServices;
using Pather.Common.Libraries.NodeJS;

namespace Pather.ServerManager.Libraries.Redis
{
    [Imported]
    [IgnoreNamespace]
    public class RedisClient : EventEmitter
    {
        public void Publish(string channel, object content)
        {
        }

        public void Subscribe(string channel)
        {
        }

        [ScriptName("rpush")]
        public void RPush(string channel, object value)
        {
        }

        [ScriptName("monitor")]
        public void Monitor(Action<string, object> action)
        {
        }

        [ScriptName("blpop")]
        public void BLPop(object[] objectsAndTimeout, Action<string, string[]> action)
        {
        }
    }
}