using System;
using System.Serialization;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameWorld;
using Pather.Common.Models.Gateway;
using Pather.Common.Models.Tick;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common.PubSub;

namespace Pather.Servers.TickServer
{
    public class TickPubSub
    {
        public IPubSub PubSub;

        public TickPubSub(IPubSub pubSub)
        {
            PubSub = pubSub;
        }

        public Action<TickPubSubMessage> OnMessage;

        public Promise Init()
        {
            var deferred = Q.Defer();

            PubSub.Subscribe(PubSubChannels.Tick(), (message) =>
            {
                var tickPubSubMessage = Json.Parse<TickPubSubMessage>(message);
                OnMessage(tickPubSubMessage);
            });

            deferred.Resolve();
            return deferred.Promise;
        }

        public void PublishToAllGameSegments(GameSegmentPubSubAllMessage message)
        {
            //todo test if its faster for redis to have one "tick" subscription for all relevent clients or not
            PubSub.Publish(PubSubChannels.GameSegment(), message);
        }


        public void PublishToAllGateways(GatewayPubSubAllMessage message)
        {
            //todo test if its faster for redis to have one "tick" subscription for all relevent clients or not
            PubSub.Publish(PubSubChannels.Gateway(), message);
        }

        public void PublishToGameWorld(GameWorldPubSubMessage message)
        {
            //todo test if its faster for redis to have one "tick" subscription for all relevent clients or not
            PubSub.Publish(PubSubChannels.GameWorld(), message);
        }

        public void PublishToOrigin(string origin, object message)
        {
            PubSub.Publish(origin, message);
        }
    }
}