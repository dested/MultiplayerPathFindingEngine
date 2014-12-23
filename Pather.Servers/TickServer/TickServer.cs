using System;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameWorld;
using Pather.Common.Models.Gateway;
using Pather.Common.Models.Tick;
using Pather.Servers.Common.PubSub;

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

        private void pubSubMessage(Tick_PubSub_Message message)
        {
            switch (message.Type)
            {
                case Tick_PubSub_MessageType.Ping:

                    var pingMessage = (Ping_Tick_PubSub_Message) message;

                    object returnMessage;

                    switch (pingMessage.OriginType)
                    {
                        case Ping_Tick_PubSub_Message_OriginType.GameSegment:
                            returnMessage = new Pong_GameSegment_PubSub_Message();
                            break;
                        case Ping_Tick_PubSub_Message_OriginType.GameWorld:
                            returnMessage = new Pong_GameWorld_PubSub_Message();
                            break;
                        case Ping_Tick_PubSub_Message_OriginType.Gateway:
                            returnMessage = new Pong_Gateway_PubSub_Message();
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