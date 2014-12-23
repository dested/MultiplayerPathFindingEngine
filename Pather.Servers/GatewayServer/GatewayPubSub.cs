using System;
using System.Collections.Generic;
using System.Serialization;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameSegmentCluster;
using Pather.Common.Models.GameWorld;
using Pather.Common.Models.Gateway;
using Pather.Common.Models.Tick;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common.PubSub;

namespace Pather.Servers.GatewayServer
{
    public class GatewayPubSub
    {
        public string GatewayId { get; set; }
        public IPubSub PubSub;

        public GatewayPubSub(IPubSub pubSub,string gatewayId)
        {
            GatewayId = gatewayId;
            PubSub = pubSub;
        }

        public Action<GatewayPubSubMessage> OnMessage;
        public Action<GatewayPubSubAllMessage> OnAllMessage;

        public void Init()
        {
            PubSub.Subscribe(PubSubChannels.Gateway(), (message) =>
            {
                var gameWorldPubSubAllMessage = Json.Parse<GatewayPubSubAllMessage>(message);
                OnAllMessage(gameWorldPubSubAllMessage);
            });

            PubSub.Subscribe(PubSubChannels.Gateway(GatewayId), (message) =>
            {
                var gameWorldPubSubMessage = Json.Parse<GatewayPubSubMessage>(message);
                OnMessage(gameWorldPubSubMessage);
            });

        }
         

        public void PublishToTickServer(TickPubSubMessage message)
        {
            PubSub.Publish(PubSubChannels.Tick(), message);
        }

        public void PublishToGameWorld(GameWorld_PubSub_Message message)
        {
            PubSub.Publish(PubSubChannels.GameWorld(), message);
        }
    }
}