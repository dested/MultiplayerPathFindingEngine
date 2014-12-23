using System;
using System.Collections.Generic;
using System.Serialization;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameWorld;
using Pather.Common.Models.Gateway;
using Pather.Servers.Common;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.SocketManager;

namespace Pather.Servers.GatewayServer
{
    public class GatewayServer
    {
        public IPubSub Pubsub { get; set; }
        public string GatewayName;
        public ServerCommunicator ServerCommunicator { get; set; }

        public GatewayServer(IPubSub pubsub, ISocketManager socketManager)
        {
            Pubsub = pubsub;
            GatewayName = "Gateway " + Guid.NewGuid();
            Global.Console.Log(GatewayName);

            var port = 1800 + Math.Truncate((Math.Random()*4000d));
            port = 1800;

            ServerCommunicator = new ServerCommunicator(socketManager, port);


            pubsub.Init().Then(pubsubReady);
        }


        private readonly List<GatewayUser> Users = new List<GatewayUser>();


        private void pubsubReady()
        {
            Global.Console.Log("pubsub ready");

            Pubsub.Subscribe(GatewayName, gatewayMessage);
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
                        Pubsub.Publish(PubSubChannels.GameWorld, new UserJoinedGameWorldPubSubMessage()
                        {
                            Type = GameWorldPubSubMessageType.UserJoined,
                            GatewayChannel = GatewayName,
                            UserToken = data.UserToken
                        });
                    });
            };
        }

        private void gatewayMessage(string message)
        {
            Global.Console.Log("message:", message);

            var gMessage = Json.Parse<GatewayPubSubMessage>(message);
            switch (gMessage.Type)
            {
                case GatewayPubSubMessageType.UserJoined:
                    var userJoinedMessage = (UserJoinedGatewayPubSubMessage) gMessage;


                    foreach (var gatewayUser in Users)
                    {
                        if (gatewayUser.UserToken == userJoinedMessage.UserId)
                        {
//                            this is only sending once idk why
                            ServerCommunicator.SendMessage(gatewayUser.Socket, "Gateway.Join.Success", userJoinedMessage);
                            break;
                        }
                    }

                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
    }
}