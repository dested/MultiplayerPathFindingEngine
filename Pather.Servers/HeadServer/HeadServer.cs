using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Gateway.PubSub;
using Pather.Common.Models.Head;
using Pather.Common.Models.Head.Base;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.PushPop;
using Pather.Servers.Common.ServerLogging;
using Pather.Servers.Libraries.ExpressJS;
using Pather.Servers.Libraries.Socket.IO;
using Pather.Servers.Utils;

namespace Pather.Servers.HeadServer
{
    public class HeadServer
    {
        private HeadPubSub headPubSub;
        private List<Gateway> oldGateways = new List<Gateway>();
        private List<Gateway> gateways = new List<Gateway>();
 
        public HeadServer(IPubSub pubSub)
        {
            pubSub.Init().Then(() => ready(pubSub));
        }

        private void ready(IPubSub pubSub)
        {
            headPubSub = new HeadPubSub(pubSub);
            headPubSub.Init();

            var app = Global.Require<Func<Express>>("express")();
            var cors = Global.Require<Func<object>>("cors");

            app.Use(cors());

            Global.SetInterval(pingGateways, 1000);
            pingGateways();

            headPubSub.OnMessage += OnMessage;

            app.Get("/api", (req, res) =>
            {
                if (oldGateways.Count == 0)
                {
                    if (gateways.Count == 0)
                    {
                        res.Send("down");
                    }
                    else
                    {
                        res.Send(gateways[0].Address);
                    }
                }
                else
                {
                    res.Send(oldGateways[0].Address);
                }
            });

            app.Listen(2222);
        }

        private void pingGateways()
        {
            oldGateways=new List<Gateway>(gateways);
            gateways = new List<Gateway>();
            headPubSub.PublishToGateway(new Ping_Head_Gateway_PubSub_AllMessage());
        }

        private void OnMessage(Head_PubSub_Message message)
        {
            switch (message.Type)
            {
                case Head_PubSub_MessageType.Ping:
                    OnPingMessage(((Ping_Response_Gateway_Head_PubSub_Message) message));
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private void OnPingMessage(Ping_Response_Gateway_Head_PubSub_Message pingResponseMessage)
        {
            gateways.Add(new Gateway()
            {
                Address = pingResponseMessage.Address,
                LastPing = DateTime.Now,
                LiveConnections = pingResponseMessage.LiveConnections,
                GatewayId = pingResponseMessage.GatewayId
            });

            gateways.Sort((a,b)=>a.LiveConnections-b.LiveConnections);
        }
    }
}