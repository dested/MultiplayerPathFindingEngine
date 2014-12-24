using System;
using System.Collections.Generic;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameWorld;
using Pather.Common.Models.Gateway;
using Pather.Common.Models.Tick;
using Pather.Common.Models.Tick.Base;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.ServerLogging;

namespace Pather.Servers.TickServer
{
    public class TickServer
    {
        public TickServerTickManager TickManager;
        public TickPubSub TickPubSub;
        public IPubSub PubSub;

        public TickServer(IPubSub pubSub)
        {
            ServerLogger.InitLogger("Tick", "Tick");
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

            ServerLogger.LogInformation("Tick Server Ready.");
            TickPubSub.OnMessage += pubSubMessage;
        }

        private readonly JsDictionary<string, bool> recievedOriginHash = new JsDictionary<string, bool>();

        private void pubSubMessage(Tick_PubSub_Message message)
        {
            switch (message.Type)
            {
                case Tick_PubSub_MessageType.Ping:
                    ServerLogger.LogInformation("Received Ping", message);

                    var pingMessage = (Ping_Tick_PubSub_Message) message;
                    if (!recievedOriginHash.ContainsKey(pingMessage.Origin))
                    {
                        TickManager.ForceOnNextTick();
                        recievedOriginHash[pingMessage.Origin] = true;
                    }
                    object returnMessage;

                    switch (pingMessage.OriginType)
                    {
                        case Ping_Tick_PubSub_Message_OriginType.GameSegment:
                            returnMessage = new Pong_Tick_GameSegment_PubSub_Message();
                            break;
                        case Ping_Tick_PubSub_Message_OriginType.GameWorld:
                            returnMessage = new Pong_Tick_GameWorld_PubSub_Message();
                            break;
                        case Ping_Tick_PubSub_Message_OriginType.Gateway:
                            returnMessage = new Pong_Tick_Gateway_PubSub_Message();
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