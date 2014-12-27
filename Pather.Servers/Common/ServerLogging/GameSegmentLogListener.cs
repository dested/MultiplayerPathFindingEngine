using System;
using System.Serialization;
using Pather.Servers.Common.PubSub;
using Pather.Servers.GameSegment.Logger;

namespace Pather.Servers.Common.ServerLogging
{
    public class GameSegmentLogListener
    {
        private readonly PubSub.PubSub pubsub;

        public GameSegmentLogListener(Action<GameSegmentLogMessageContent> callback)
        {
            pubsub = new PubSub.PubSub();
            pubsub.DontLog();
            pubsub.Init()
                .Then(() =>
                {
                    pubsub.Subscribe(PubSubChannels.GameSegmentLogger(), (content) => callback(Json.Parse<GameSegmentLogMessageContent>(content)));
                });
        }

        public void Subscribe(string channel, Action<ServerLogMessage> callback)
        {
            pubsub.Subscribe(PubSubChannels.ServerLogger(channel), (content) => callback(Json.Parse<ServerLogMessage>(content)));
        }
    }
}