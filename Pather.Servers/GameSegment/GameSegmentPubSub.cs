using System;
using System.Serialization;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameSegment.Base;
using Pather.Common.Models.GameWorld.Base;
using Pather.Common.Models.Gateway.PubSub.Base;
using Pather.Common.Models.Tick.Base;
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

        public Action<GameSegment_PubSub_Message> OnMessage;
        public Action<GameSegment_PubSub_AllMessage> OnAllMessage;

        public Promise Init()
        {
            var deferred = Q.Defer();

            PubSub.Subscribe(PubSubChannels.GameSegment(), (message) =>
            {
                var gameSegmentPubSubMessage = Json.Parse<GameSegment_PubSub_AllMessage>(message);
                OnAllMessage(gameSegmentPubSubMessage);
            });

            PubSub.Subscribe(PubSubChannels.GameSegment(GameSegmentId), (message) =>
            {
                var gameSegmentPubSubMessage = Json.Parse<GameSegment_PubSub_Message>(message);
                OnMessage(gameSegmentPubSubMessage);
            });

            deferred.Resolve();
            return deferred.Promise;
        }

        public void PublishToTickServer(Tick_PubSub_Message message)
        {
            PubSub.Publish(PubSubChannels.Tick(), message);
        }

        public void PublishToGateway(string gatewayId, Gateway_PubSub_Message message)
        {
            PubSub.Publish(PubSubChannels.Gateway(gatewayId), message);
        }

        public void PublishToGameWorld(GameWorld_PubSub_Message message)
        {
            PubSub.Publish(PubSubChannels.GameWorld(), message);
        }

        public void PublishToGameSegment(string gameSegmentId, GameSegment_PubSub_Message message)
        {
            PubSub.Publish(PubSubChannels.GameSegment(gameSegmentId), message);
        }
    }
}