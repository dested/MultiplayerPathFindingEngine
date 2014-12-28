using System;
using System.Runtime.CompilerServices;
using Pather.Common.Models.Common;
using Pather.Common.Utils.Promises;

namespace Pather.Servers.Common.PubSub
{
    public interface IPubSub
    {
        [IncludeGenericArguments(false)]
        void Publish<T>(string channel, T message) where T : IPubSub_Message;

        [IncludeGenericArguments(false)]
        void PublishForce<T>(string channel, T content) where T : IPubSub_Message;

        void Subscribe(string channel, Action<IPubSub_Message> callback);
        Promise Init(int port = 6379);
        void ReceivedMessage(string channel, IPubSub_Message message);
        void DontLog();
    }
}