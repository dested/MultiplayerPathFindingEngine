using System;
using System.Collections.Generic;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameWorld;
using Pather.Common.Models.Gateway;
using Pather.Common.Models.Tick;
using Pather.Servers.Common.PubSub;
using Pather.Servers.GameWorldServer;

namespace Pather.Servers.TickServer
{
    public class TickServer
    {
        public TickServerTickManager TickManager;
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

            TickManager = new TickServerTickManager(TickPubSub);
            TickManager.Init(0);

            TickPubSub.OnMessage += pubSubMessage;
        }

        private void pubSubMessage(TickPubSubMessage message)
        {
            switch (message.Type)
            {
                case TickPubSubMessageType.Ping:

                    var pingMessage = (PingTickPubSubMessage) message;

                    object returnMessage;

                    switch (pingMessage.OriginType)
                    {
                        case PingTickPubSubMessageOriginType.GameSegment:
                            returnMessage = new PongGameSegmentPubSubMessage();
                            break;
                        case PingTickPubSubMessageOriginType.GameWorld:
                            returnMessage = new PongGameWorldPubSubMessage();
                            break;
                        case PingTickPubSubMessageOriginType.Gateway:
                            returnMessage = new PongGatewayPubSubMessage();
                            break;
                        default:
                            throw new ArgumentOutOfRangeException();
                    }
                    TickPubSub.PublishToOrigin(pingMessage.Origin, returnMessage);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
    }
}