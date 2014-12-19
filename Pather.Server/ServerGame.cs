using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Models;
using Pather.Common.Utils;
using Pather.Server.Libraries.NodeJS;
using Pather.Server.Libraries.Socket.IO;

namespace Pather.Server
{
    public class ServerGame : Game
    {
        public ServerGame():base()
        {
            StepManager = new ServerStepManager(this, new ServerNetworkManager(this));
            Ready = true;
        }

        public virtual Entity CreatePlayer(string playerId)
        {
            return new ServerEntity(this, playerId);
        }

    }

    public class ServerStepManager : StepManager
    {
        public ServerNetworkManager ServerNetworkManager { get; set; }

        public ServerStepManager(Game game, ServerNetworkManager serverNetworkManager)
            : base(game)
        {
            ServerNetworkManager = serverNetworkManager;
            ServerNetworkManager.OnRecieveAction += ReceiveAction;
        }

        public void SendActionServer(IAction action)
        {
            SerializableAction serAction = new SerializableAction();
            serAction.Data = action.Data;
            serAction.LockstepTickNumber = action.LockstepTickNumber;
            serAction.Type = action.Type;
        }

        public override void ReceiveAction( SerializableAction serAction)
        {
            base.ReceiveAction(serAction);

            ServerNetworkManager.SendAction(serAction);
        }


        public override int NetworkPlayers
        {
            get { return Game.Players.Count; }
        }
    }


    public class ServerNetworkManager
    {
        public ServerGame Game { get; set; }
        public ServerCommunicator ServerCommunicator { get; set; }
        public Action< SerializableAction> OnRecieveAction { get; set; }

        public ServerNetworkManager(ServerGame game)
        {
            Game = game;
            ServerCommunicator = new ServerCommunicator();
            ServerCommunicator.OnNewConnection += OnNewConnection;
            ServerCommunicator.OnDisconnectConnection += OnDisconnectConnection;
        }
        private void OnNewConnection(SocketIOConnection socketIoConnection)
        {

            ServerCommunicator.SendMessage(socketIoConnection,
                SocketChannels.ServerChannel(SocketChannels.Server.Connect), new ConnectedModel()
                {
                    LockstepTickNumber = Game.LockstepTickNumber,
                    Grid = Game.Grid
                });


            ServerCommunicator.ListenOnChannel<PlayerJoinModel>(socketIoConnection,
                SocketChannels.ClientChannel(SocketChannels.Client.JoinPlayer), JoinPlayer);
            ServerCommunicator.ListenOnChannel<SerializableAction>(socketIoConnection,
                SocketChannels.ClientChannel(SocketChannels.Client.PostAction), PostAction);
        }


        private void OnDisconnectConnection(SocketIOConnection socketIoConnection)
        {

            Entity player = null;

            foreach (ServerEntity entity in Game.Players)
            {
                if (entity.Socket == socketIoConnection)
                {
                    player = entity;
                }
            }

            if (player == null)
            {
                return;
            }

            var playerSyncModel = new PlayerSyncModel()
            {
                LeftPlayers = new List<PlayerModel>()
                {
                    new PlayerModel()
                    {
                        PlayerId = player.PlayerId
                    }
                }
            };

            Game.Players.Remove(player);

            socketIoConnection.Broadcast.Emit(SocketChannels.ServerChannel(SocketChannels.Server.PlayerSync),
                playerSyncModel);
        }


        private void PostAction(SocketIOConnection socket, SerializableAction action)
        {
            Global.Console.Log("player action ", action);
            OnRecieveAction(action);

        }
        public void SendAction(SerializableAction action)
        {
            foreach (ServerEntity player in Game.Players )
            {
                ServerCommunicator.SendMessage(player.Socket, SocketChannels.ClientChannel(SocketChannels.Client.PostAction), action);
            }
        }

        private void JoinPlayer(SocketIOConnection socket, PlayerJoinModel model)
        {

            Global.Console.Log("new player " + model.PlayerId);

            var player = (ServerEntity) Game.CreatePlayer(model.PlayerId);
            player.Socket = socket;
            player.Init(0, 0);
            Game.Players.Add(player);

            foreach (ServerEntity entity in Game.Players)
            {
                if (entity.PlayerId != player.PlayerId)
                {
                    entity.Socket.Emit(SocketChannels.ServerChannel(SocketChannels.Server.PlayerSync),
                        new DataObject<PlayerSyncModel>(new PlayerSyncModel()
                        {
                            JoinedPlayers = new List<PlayerModel>()
                            {
                                new PlayerModel()
                                {
                                    PlayerId = player.PlayerId,
                                    X = player.X,
                                    Y = player.Y,
                                }
                            }
                        }));
                }
                else
                {
                    socket.Emit(SocketChannels.ServerChannel(SocketChannels.Server.PlayerSync),
                        new DataObject<PlayerSyncModel>(new PlayerSyncModel()
                        {
                            JoinedPlayers = Game.Players.Map(p => new PlayerModel()
                            {
                                PlayerId = p.PlayerId,
                                X = p.X,
                                Y = p.Y,
                            })
                        }));
                }

            }
        }
    }


    public class ServerCommunicator
    {
        public Action<SocketIOConnection> OnNewConnection { get; set; }
        public Action<SocketIOConnection> OnDisconnectConnection { get; set; }

        public void ListenOnChannel<T>(SocketIOConnection socket, string channel, Action<SocketIOConnection, T> callback)
        {
            socket.On<DataObject<T>>(channel, obj => callback(socket,obj.Data));
        }

        public void SendMessage(SocketIOConnection socket, string channel, object obj)
        {
            socket.Emit(channel, new DataObject<object>(obj));
        }

        public ServerCommunicator()
        {
            var http = Global.Require<Http>("http");

            var app = http.CreateServer((req, res) => res.End());
            var io = SocketIO.Listen(app);
            app.Listen(8998);

            io.Sockets.On("connection", (SocketIOConnection socket) =>
            {
                Global.Console.Log("new connection");
                OnNewConnection(socket);
                socket.On("disconnect", () =>
                {
                    OnDisconnectConnection(socket);
                });
            });
        }
    }


}