using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Gateway.PubSub;
using Pather.Common.Models.Head;
using Pather.Common.Models.Head.Base;
using Pather.Common.Models.ServerManager.Base;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.PushPop;
using Pather.Servers.Common.ServerLogging;
using Pather.Servers.HeadServer.Models;
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
            Global.SetInterval(shouldSpinUpNewGateway, 4000);
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

        private int isCurrentlySpawning = 0;
        private void shouldSpinUpNewGateway()
        {

            if (isCurrentlySpawning == 0)
            {

                int totalConnections = 0;
                foreach (var gateway in oldGateways)
                {
                    totalConnections += gateway.LiveConnections;
                }
                if (totalConnections > oldGateways.Count*Constants.MaxConnectionsPerGateway - Constants.GatewayConnectionSpawnThreshold)
                {
                    isCurrentlySpawning = 1;
                    headPubSub.PublishToServerManagerWithCallback<CreateGateway_Response_ServerManager_Head_PubSub_ReqRes_Message>(
                        new CreateGateway_Head_ServerManager_PubSub_ReqRes_Message()
                        )
                        .Then(response =>
                        {
                            isCurrentlySpawning = 0;
                            //todo idk, the new gateway has been created. it shoudl begin accepting pings and stuff.
                        });
                }
            }
            else
            {
                isCurrentlySpawning++;
                if (isCurrentlySpawning == 10)
                {
                    isCurrentlySpawning = 0;
                    Global.Console.Log("Failed to create a new gateway.");
                }
            }
        }

        private void pingGateways()
        {
            oldGateways = new List<Gateway>(gateways);
            gateways = new List<Gateway>();
            headPubSub.PublishToGateway(new Ping_Head_Gateway_PubSub_AllMessage());
        }

        private void OnMessage(Head_PubSub_Message message)
        {
            switch (message.Type)
            {
                case Head_PubSub_MessageType.Ping:
                    OnPingMessage(((Ping_Response_Gateway_Head_PubSub_Message)message));
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

            gateways.Sort((a, b) => a.LiveConnections - b.LiveConnections);
        }
    }
}