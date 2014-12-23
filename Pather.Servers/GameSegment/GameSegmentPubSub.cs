using System;
using System.Serialization;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.Tick;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common.PubSub;

namespace Pather.Servers.GameSegment
{
    public class GameSegmentPubSub
    {
        public string GameSegmentId;
        public IPubSub PubSub;

        public GameSegmentPubSub(IPubSub pubSub, string gameSegmentId)
        {
            GameSegmentId = gameSegmentId;
            PubSub = pubSub;
        }

        public Action<GameSegmentPubSubMessage> OnMessage;
        public Action<GameSegmentPubSubAllMessage> OnAllMessage;

        public Promise Init()
        {
            var deferred = Q.Defer();

            PubSub.Subscribe(PubSubChannels.GameSegment, (message) =>
            {
                var gameSegmentPubSubMessage = Json.Parse<GameSegmentPubSubAllMessage>(message);
                OnAllMessage(gameSegmentPubSubMessage);
            });

            PubSub.Subscribe(PubSubChannels.GameSegment + GameSegmentId, (message) =>
            {
                var gameSegmentPubSubMessage = Json.Parse<GameSegmentPubSubMessage>(message);
                OnMessage(gameSegmentPubSubMessage);
            });

            deferred.Resolve();
            return deferred.Promise;
        }
        public void PublishToTickServer(TickPubSubMessage message)
        {
            PubSub.Publish(PubSubChannels.Tick, message);
        }
    }
}