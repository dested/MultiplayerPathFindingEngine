using System;
using System.Serialization;
using Pather.Servers.Common.PubSub;

namespace Pather.Servers.Common.ServerLogging
{
    public class ServerLogListener
    {
        private readonly PubSub.PubSub pubsub;
        private readonly string ServerType;

        public ServerLogListener(string serverType, Action<ServerLogMessage> callback)
        {
            ServerType = serverType;
            pubsub = new PubSub.PubSub();
            pubsub.DontLog();
            pubsub.Init()
                .Then(() =>
                {
                    pubsub.Subscribe(PubSubChannels.ServerLogger(ServerType), (content) => callback(Json.Parse<ServerLogMessage>(content)));
                });
        }
    }
}