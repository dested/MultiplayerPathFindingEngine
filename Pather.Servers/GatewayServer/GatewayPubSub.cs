using System;
using System.Serialization;
using Pather.Common.Models.GameWorld;
using Pather.Common.Models.Gateway;
using Pather.Common.Models.Tick;
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
    }
}