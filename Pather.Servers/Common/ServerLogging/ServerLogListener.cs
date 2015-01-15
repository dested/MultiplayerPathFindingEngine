using System;
using Pather.Servers.Common.PubSub;

namespace Pather.Servers.Common.ServerLogging
{
    public class ServerLogListener
    {
        private readonly PubSub.PubSub pubsub;

        public ServerLogListener(string[] serverTypes, Action<ServerLogMessage> callback)
        {
            pubsub = new PubSub.PubSub();
            pubsub.DontLog();
            pubsub.Init(null,6380)
                .Then(() =>
                {
                    foreach (var serverType in serverTypes)
                    {
                        pubsub.Subscribe(PubSubChannels.ServerLogger(serverType), (content) => callback((ServerLogMessage) (content)));
                    }
                });
        }

        public void Subscribe(string channel, Action<ServerLogMessage> callback)
        {
            pubsub.Subscribe(PubSubChannels.ServerLogger(channel), (content) => callback((ServerLogMessage) (content)));
        }
    }
}