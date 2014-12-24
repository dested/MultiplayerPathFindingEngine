using System;
using System.Serialization;
using Pather.Common.Models.GameSegment.Base;
using Pather.Common.Models.GameWorld.Base;
using Pather.Common.Models.Gateway.Base;
using Pather.Common.Models.Tick.Base;
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

        public Action<Tick_PubSub_Message> OnMessage;

        public Promise Init()
        {
            var deferred = Q.Defer();

            PubSub.Subscribe(PubSubChannels.Tick(), (message) =>
            {
                var tickPubSubMessage = Json.Parse<Tick_PubSub_Message>(message);
                OnMessage(tickPubSubMessage);
            });

            deferred.Resolve();
            return deferred.Promise;
        }

        public void PublishToAllGameSegments(GameSegment_PubSub_AllMessage message)
        {
            //todo test if its faster for redis to have one "tick" subscription for all relevent clients or not
            PubSub.Publish(PubSubChannels.GameSegment(), message);
        }


        public void PublishToAllGateways(Gateway_PubSub_AllMessage message)
        {
            //todo test if its faster for redis to have one "tick" subscription for all relevent clients or not
            PubSub.Publish(PubSubChannels.Gateway(), message);
        }

        public void PublishToGameWorld(GameWorld_PubSub_Message message)
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