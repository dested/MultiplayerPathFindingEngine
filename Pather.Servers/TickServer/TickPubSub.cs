using System;
using Pather.Common.Models.Common;
using Pather.Common.Models.GameSegment.Base;
using Pather.Common.Models.GameWorld.Base;
using Pather.Common.Models.Gateway.PubSub.Base;
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
                OnMessage((Tick_PubSub_Message) message);
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

        public void PublishToOrigin(string origin, IPubSub_Message message)
        {
            PubSub.Publish(origin, message);
        }
    }
}