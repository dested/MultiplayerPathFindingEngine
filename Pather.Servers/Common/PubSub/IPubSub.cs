using System;
using System.Runtime.CompilerServices;
using Pather.Common.Utils.Promises;

namespace Pather.Servers.Common.PubSub
{
    public interface IPubSub
    {
        void Publish(string channel, string content);

        [IncludeGenericArguments(false)]
        void Publish<T>(string channel, T content);

        void Subscribe(string channel, Action<string> callback);
        Promise Init();
        void ReceivedMessage(string channel, string message);
        void DontLog();
    }
}