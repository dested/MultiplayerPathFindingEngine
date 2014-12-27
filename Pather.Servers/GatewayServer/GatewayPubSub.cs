using System;
using System.Serialization;
using Pather.Common.Models.GameSegment.Base;
using Pather.Common.Models.GameWorld.Base;
using Pather.Common.Models.Gateway.PubSub.Base;
using Pather.Common.Models.Tick.Base;
using Pather.Servers.Common.PubSub;

namespace Pather.Servers.GatewayServer
{
    public class GatewayPubSub
    {
        public string GatewayId { get; set; }
        public IPubSub PubSub;

        public GatewayPubSub(IPubSub pubSub, string gatewayId)
        {
            GatewayId = gatewayId;
            PubSub = pubSub;
        }

        public Action<Gateway_PubSub_Message> OnMessage;
        public Action<Gateway_PubSub_AllMessage> OnAllMessage;

        public void Init()
        {
            PubSub.Subscribe(PubSubChannels.Gateway(), (message) =>
            {
                var gameWorldPubSubAllMessage = Json.Parse<Gateway_PubSub_AllMessage>(message);
                OnAllMessage(gameWorldPubSubAllMessage);
            });

            PubSub.Subscribe(PubSubChannels.Gateway(GatewayId), (message) =>
            {
                var gameWorldPubSubMessage = Json.Parse<Gateway_PubSub_Message>(message);
                OnMessage(gameWorldPubSubMessage);
            });
        }


        public void PublishToTickServer(Tick_PubSub_Message message)
        {
            PubSub.Publish(PubSubChannels.Tick(), message);
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