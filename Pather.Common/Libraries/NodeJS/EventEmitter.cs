using System;
using System.Runtime.CompilerServices;

namespace Pather.Common.Libraries.NodeJS
{
    [IgnoreNamespace]
    [Imported]
    public class EventEmitter
    {
        [ScriptName("emit")]
        public void Emit(string channel, object content)
        {
        }

        [ScriptName("on")]
        public void On(string channel, Action callback)
        {
        }

        [ScriptName("on")]
        [IncludeGenericArguments(false)]
        public void On<T>(string channel, Action<T> callback)
        {
        }

        [ScriptName("on")]
        [IncludeGenericArguments(false)]
        public void On<T, T2>(string channel, Action<T, T2> callback)
        {
        }

        [ScriptName("on")]
        [IncludeGenericArguments(false)]
        public void On<T, T2, T3>(string channel, Action<T, T2, T3> callback)
        {
        }

        [ScriptName("removeAllListeners")]
        public void RemoveAllListeners()
        {
        }
    }
}