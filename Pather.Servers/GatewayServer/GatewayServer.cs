using System;
using System.Collections.Generic;
using System.Serialization;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameWorld;
using Pather.Common.Models.Gateway;
using Pather.Common.Models.Tick;
using Pather.Servers.Common;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.SocketManager;

namespace Pather.Servers.GatewayServer
{
    public class GatewayServer
    {
        public string GatewayId;
        public ServerCommunicator ServerCommunicator;
        public GatewayPubSub GatewayPubSub;
        public ClientTickManager ClientTickManager;


        public GatewayServer(IPubSub pubsub, ISocketManager socketManager)
        {
            GatewayId = Pather.Common.Common.UniqueId();
            Global.Console.Log(GatewayId);

            var port = 1800 + Math.Truncate((Math.Random() * 4000d));
            port = 1800;

            ServerCommunicator = new ServerCommunicator(socketManager, port);

            pubsub.Init().Then(() =>
            {
                GatewayPubSub = new GatewayPubSub(pubsub, GatewayId);
                GatewayPubSub.OnMessage += OnMessage;
                GatewayPubSub.OnAllMessage += OnAllMessage;
                GatewayPubSub.Init();


                ClientTickManager = new ClientTickManager();
                ClientTickManager.Init(SendPing, () => { Global.Console.Log("Connected To Tick Server"); });
                ClientTickManager.StartPing();


                pubsubReady();
            });
        }

        private void SendPing()
        {
            GatewayPubSub.PublishToTickServer(new PingTickPubSubMessage() { Origin = PubSubChannels.Gateway + GatewayId, OriginType = PingTickPubSubMessageOriginType.GameWorld });
        }

        private void OnAllMessage(GatewayPubSubAllMessage message)
        {
            switch (message.Type)
            {
                case GatewayPubSubAllMessageType.TickSync:
                    var tickSyncMessage = (TickSyncGatewayPubSubAllMessage)message;
                    ClientTickManager.SetLockStepTick(tickSyncMessage.LockstepTickNumber);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

        }

        private void OnMessage(GatewayPubSubMessage message)
        {

            switch (message.Type)
            {
                case GatewayPubSubMessageType.UserJoined:
                    var userJoinedMessage = (UserJoinedGatewayPubSubMessage)message;


                    foreach (var gatewayUser in Users)
                    {
                        if (gatewayUser.UserToken == userJoinedMessage.UserId)
                        {
                            ServerCommunicator.SendMessage(gatewayUser.Socket, "Gateway.Join.Success", userJoinedMessage);
                            break;
                        }
                    }

                    break;
                case GatewayPubSubMessageType.Pong:
                    var pongMessage = (PongGatewayPubSubMessage)message;
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
                foreach (var gatewayUser in Users)
                {
                    if (gatewayUser.Socket == socket)
                    {
                        Global.Console.Log("Left");
                        Users.Remove(gatewayUser);
                        break;
                    }
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
                        user.UserToken = data.UserToken;
                        GatewayPubSub.PublishToGameWorld(new UserJoinedGameWorldPubSubMessage()
                        {
                            Type = GameWorldPubSubMessageType.UserJoined,
                            GatewayChannel = GatewayId,
                            UserToken = data.UserToken
                        });
                    });
            };
        }


    }
}