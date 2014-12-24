using System;
using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameWorld;
using Pather.Common.Models.Gateway;
using Pather.Common.Models.Gateway.Base;
using Pather.Common.Models.Tick;
using Pather.Common.Utils;
using Pather.Servers.Common;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.ServerLogging;
using Pather.Servers.Common.SocketManager;

namespace Pather.Servers.GatewayServer
{
    public class GatewayServer
    {
        public string GatewayId;
        public ServerCommunicator ServerCommunicator;
        public GatewayPubSub GatewayPubSub;
        public ClientTickManager ClientTickManager;


        public GatewayServer(IPubSub pubsub, ISocketManager socketManager, string gatewayId, int port_)
        {
            GatewayId = gatewayId;
            ServerLogger.InitLogger("Gateway", GatewayId);

            Global.Console.Log(GatewayId);

            var port = 1800 + Math.Truncate((Math.Random()*4000d));
            port = port_;

            ServerCommunicator = new ServerCommunicator(socketManager, port);

            pubsub.Init().Then(() =>
            {
                GatewayPubSub = new GatewayPubSub(pubsub, GatewayId);
                GatewayPubSub.OnMessage += OnMessage;
                GatewayPubSub.OnAllMessage += OnAllMessage;
                GatewayPubSub.Init();


                ClientTickManager = new ClientTickManager();
                ClientTickManager.Init(SendPing, () =>
                {
                    Global.Console.Log("Connected To Tick Server");
                });
                ClientTickManager.StartPing();


                pubsubReady();
            });
        }

        private void SendPing()
        {
            GatewayPubSub.PublishToTickServer(new Ping_Tick_PubSub_Message()
            {
                Origin = PubSubChannels.Gateway(GatewayId),
                OriginType = Ping_Tick_PubSub_Message_OriginType.GameWorld
            });
        }

        private void OnAllMessage(Gateway_PubSub_AllMessage message)
        {
            switch (message.Type)
            {
                case Gateway_PubSub_AllMessageType.TickSync:
                    var tickSyncMessage = (TickSync_Tick_Gateway_PubSub_AllMessage) message;
                    ClientTickManager.SetLockStepTick(tickSyncMessage.LockstepTickNumber);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private void OnMessage(Gateway_PubSub_Message message)
        {
            switch (message.Type)
            {
                case Gateway_PubSub_MessageType.UserJoined:
                    var userJoinedMessage = (UserJoined_GameWorld_Gateway_PubSub_Message) message;
                    var gatewayUser = Users.First(user => user.UserId == userJoinedMessage.UserId);
                    gatewayUser.GameSegmentId = userJoinedMessage.GameSegmentId;
                    ServerCommunicator.SendMessage(gatewayUser.Socket, "Gateway.Join.Success", userJoinedMessage);

                    break;
                case Gateway_PubSub_MessageType.Pong:
                    var pongMessage = (Pong_Tick_Gateway_PubSub_Message) message;
                    ClientTickManager.OnPongReceived();

                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }


        private readonly List<GatewayUser> Users = new List<GatewayUser>();


        private void pubsubReady()
        {
            Global.Console.Log("pubsub ready");

            ServerCommunicator.OnDisconnectConnection += (socket) =>
            {
                Global.Console.Log("Disconnect", Users.Count);

                var gatewayUser = Users.First(a => a.Socket == socket);

                if (gatewayUser != null)
                {
                    Global.Console.Log("Left");
                    GatewayPubSub.PublishToGameWorld(new UserLeft_Gateway_GameWorld_PubSub_Message()
                    {
                        UserId = gatewayUser.UserId
                    });
                    Users.Remove(gatewayUser);
                }
            };

            ServerCommunicator.OnNewConnection += (socket) =>
            {
                var user = new GatewayUser()
                {
                    Socket = socket
                };
                Users.Add(user);
                ServerCommunicator.ListenOnChannel(socket, "Gateway.Message",
                    (ISocket cSocket, GatewaySocketMessageModel data) =>
                    {
                        Global.Console.Log("Socket message ", data);
                    });

                ServerCommunicator.ListenOnChannel(socket, "Gateway.Join",
                    (ISocket cSocket, GatewayJoinModel data) =>
                    {
                        user.UserId = data.UserToken;
                        GatewayPubSub.PublishToGameWorld(new UserJoined_Gateway_GameWorld_PubSub_Message()
                        {
                            GatewayChannel = GatewayId,
                            UserToken = data.UserToken
                        });
                    });
            };
        }
    }
}