using System;
using System.Collections.Generic;
using Pather.Common.Models.Tick;
using Pather.Servers.Common.PubSub;
using Pather.Servers.GameWorldServer;

namespace Pather.Servers.TickServer
{
    public class TickServer
    {
        public TickManager TickManager;
        public TickPubSub TickPubSub;
        public IPubSub PubSub;

        public TickServer(IPubSub pubSub)
        {
            PubSub = pubSub;

            pubSub.Init().Then(() =>
            {
                TickPubSub = new TickPubSub(pubSub);
                TickPubSub.Init().Then(ready);
            });
        }

        private void ready()
        {

            TickManager = new TickManager(TickPubSub);
            TickManager.Init(0);

            TickPubSub.OnMessage += pubSubMessage;
        }

        private void pubSubMessage(TickPubSubMessage message)
        {
            switch (message.Type)
            {
                case TickPubSubMessageType.Ping:

                    var pingMessage = (PingTickPubSubMessage) message;

                    TickPubSub.PublishToOrigin(pingMessage.Origin, null);
                    
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
    }
}