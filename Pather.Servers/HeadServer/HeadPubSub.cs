using System;
using Pather.Common.Models.Gateway.PubSub.Base;
using Pather.Common.Models.Head.Base;
using Pather.Servers.Common.PubSub;

namespace Pather.Servers.HeadServer
{
    public class HeadPubSub
    {
        public IPubSub PubSub;

        public HeadPubSub(IPubSub pubSub)
        {
            PubSub = pubSub;
        }

        public Action<Head_PubSub_Message> OnMessage;

        public void Init()
        {
          
            PubSub.Subscribe(PubSubChannels.Head(), (message) =>
            {
                var headPubSubMessage = (Head_PubSub_Message)(message);
                OnMessage(headPubSubMessage);
            });
        }


        public void PublishToGateway(string gatewayId, Gateway_PubSub_Message message)
        {
            PubSub.Publish(PubSubChannels.Gateway(gatewayId), message);
        }
        public void PublishToGateway( Gateway_PubSub_AllMessage message)
        {
            PubSub.Publish(PubSubChannels.Gateway(), message);
        }
    }
}