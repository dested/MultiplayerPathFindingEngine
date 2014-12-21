using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameWorld;
using Pather.Common.Models.Gateway;
using Pather.ServerManager.Common;
using Pather.ServerManager.Libraries.Socket.IO;
using Pather.ServerManager.Utils;

namespace Pather.ServerManager.GatewayServer
{
    public class GatewayServer
    {
        public ISocketManager SocketManager { get; set; }
        public string GatewayName;

        public GatewayServer(IPubSub pubsub,ISocketManager socketManager)
        {
            SocketManager = socketManager;
            GatewayName = "Gateway " + Guid.NewGuid();
            Global.Console.Log(GatewayName);
            
                        
            var port = 1800 + Math.Truncate((Math.Random() * 4000d));
            port = 1800;
            socketManager.Init(port);

            pubsub.Init(pubsubReady);


        }

        private void pubsubReady(IPubSub pubsub)
        {
            Global.Console.Log("pubsub ready");

            pubsub.Subscribe(GatewayName,gatewayMessage);


            SocketManager.Connections((socket) =>
            {
                socket.On("Gateway.Message",
                    (GatewaySocketMessageModel data) =>
                    {
                        Global.Console.Log("Socket message ", data);
                    });

                socket.On("Gateway.Join",
                    (GatewayJoinModel data) =>
                    {
                        pubsub.Publish(PubSubChannels.GameWorld, new UserJoinedGameWorldPubSubMessage()
                        {
                            Type = GameWorldMessageType.UserJoined,
                            GatewayChannel = GatewayName,
                            UserToken = data.UserToken
                        });
                    });
                socket.Disconnect(() => { });

            });


        }

        private void gatewayMessage(string message)
        {
            Global.Console.Log("message:",message);
        }
    }

    public class SocketIOManager : ISocketManager
    {
        private SocketIOClient io;

        public void Init(int port)
        {

            var http = Global.Require<Http>("http");

            var app = http.CreateServer((req, res) => res.End());

            io = SocketIO.Listen(app);


            List<string> networkIPs = ServerHelper.GetNetworkIPs();
            string currentIP = networkIPs[0] + ":" + port;
            string url;
            url = string.Format("http://{0}", currentIP);

            Global.Console.Log("Server URL", url);
            app.Listen(port);

        }

        public void Connections(Action<ISocket> action)
        {
            io.Sockets.On("connection", (SocketIOConnection socket) =>
            {
                action(new SocketIOSocket(socket));
            });

        }
    }



    public class SocketIOSocket : ISocket
    {
        public SocketIOConnection Socket { get; set; }

        public SocketIOSocket(SocketIOConnection socket)
        {
            Socket = socket;
        }

        public void On<T>(string channel, Action<T> callback)
        {
            Socket.On(channel, callback);
        }

        public void Disconnect(Action callback)
        {
            Socket.On("disconnect", callback);

        }
    }

    public interface ISocketManager
    {
        void Init(int port);
        void Connections(Action<ISocket> action);
    }

    public interface ISocket
    {
        [IncludeGenericArguments(false)]
        void On<T>(string channel, Action<T> callback);
        void Disconnect(Action callback);
    }
}