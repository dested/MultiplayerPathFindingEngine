using System;
using System.Runtime.CompilerServices;

namespace Pather.ServerManager.Common
{
    public interface IPubSub
    {
        void Publish(string channel, string content);
        [IncludeGenericArguments(false)]
        void Publish<T>(string channel, T content);
        void Subscribe(string channel, Action<string> callback);
        void Init(Action<IPubSub> pubsubReady);
    }
}