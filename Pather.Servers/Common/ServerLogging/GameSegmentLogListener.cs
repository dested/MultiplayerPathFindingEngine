using System;
using System.Serialization;
using Pather.Servers.Common.PubSub;
using Pather.Servers.GameSegmentServer.Logger;

namespace Pather.Servers.Common.ServerLogging
{
    public class GameSegmentLogListener
    {
        private readonly PubSub.PubSub pubsub;

        public GameSegmentLogListener(Action<GameSegmentLogMessageContent> callback)
        {
            pubsub = new PubSub.PubSub();
            pubsub.DontLog();
            pubsub.Init(6380)
                .Then(() =>
                {
                    pubsub.Subscribe(PubSubChannels.GameSegmentLogger(), (content) => callback((GameSegmentLogMessageContent)(content)));
                });
        }

        public void Subscribe(string channel, Action<ServerLogMessage> callback)
        {
            pubsub.Subscribe(PubSubChannels.ServerLogger(channel), (content) => callback((ServerLogMessage)(content)));
        }
    }
}