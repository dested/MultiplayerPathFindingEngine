using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Game;
using Pather.ServerManager.Common;
using Pather.ServerManager.Common.SocketManager;

namespace Pather.ServerManager.GameSegment
{
    public class ServerNetworkManager
    {
        public ServerGame Game;
        public ServerCommunicator ServerCommunicator;
        public Action<SerializableAction> OnRecieveAction;

        public ServerNetworkManager(ServerGame game, ISocketManager socketManager)
        {
            Game = game;
            Game.SyncLockstep += OnSyncLockstep;
            ServerCommunicator = new ServerCommunicator(socketManager, 8991);
            ServerCommunicator.OnNewConnection += OnNewConnection;
            ServerCommunicator.OnDisconnectConnection += OnDisconnectConnection;
        }

        private void OnSyncLockstep(long lockStepTick)
        {
            if (lockStepTick%15 == 0 || forceSyncNextLockstep.Count > 0)
            {
                foreach (var socketIoConnection in forceSyncNextLockstep)
                {
                    ServerCommunicator.SendMessage(socketIoConnection,
                        SocketChannels.ServerChannel(SocketChannels.Server.SyncLockstep),
                        new SyncLockstepModel()
                        {
                            LockstepTickNumber = lockStepTick
                        });
                }

                foreach (ServerEntity player in Game.Players)
                {
                    if (forceSyncNextLockstep.IndexOf(player.Socket) == -1)
                    {
                        ServerCommunicator.SendMessage(player.Socket,
                            SocketChannels.ServerChannel(SocketChannels.Server.SyncLockstep),
                            new SyncLockstepModel()
                            {
                                LockstepTickNumber = lockStepTick
                            });
                    }
                }

                forceSyncNextLockstep.Clear();
            }
        }

        private readonly List<ISocket> forceSyncNextLockstep = new List<ISocket>();

        private void OnNewConnection(ISocket socketIoConnection)
        {
            ServerCommunicator.SendMessage(socketIoConnection,
                SocketChannels.ServerChannel(SocketChannels.Server.Connect), new ConnectedModel()
                {
                    Grid = Game.Grid
                });
            forceSyncNextLockstep.Add(socketIoConnection);

            ServerCommunicator.ListenOnChannel<PlayerJoinModel>(socketIoConnection,
                SocketChannels.ClientChannel(SocketChannels.Client.JoinPlayer), JoinPlayer);

            ServerCommunicator.ListenOnChannel<SerializableAction>(socketIoConnection,
                SocketChannels.ClientChannel(SocketChannels.Client.PostAction), PostAction);

            ServerCommunicator.ListenOnChannel<PingPongModel>(socketIoConnection,
                SocketChannels.ClientChannel(SocketChannels.Client.Ping), Pong);
        }

        private void Pong(ISocket socket, PingPongModel pingPongModel)
        {
            ServerCommunicator.SendMessage(socket, SocketChannels.ServerChannel(SocketChannels.Server.Pong), pingPongModel);
        }


        private void OnDisconnectConnection(ISocket socketIoConnection)
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


            foreach (ServerEntity entity in Game.Players)
            {
                ServerCommunicator.SendMessage(entity.Socket, SocketChannels.ServerChannel(SocketChannels.Server.PlayerSync), playerSyncModel);
            }
        }


        private void PostAction(ISocket socket, SerializableAction action)
        {
//            Global.Console.Log("player action ", action);
            OnRecieveAction(action);
        }

        public void SendAction(SerializableAction action)
        {
            foreach (ServerEntity player in Game.Players)
            {
                ServerCommunicator.SendMessage(player.Socket, SocketChannels.ServerChannel(SocketChannels.Server.PostAction), action);
            }
        }

        private void JoinPlayer(ISocket socket, PlayerJoinModel model)
        {
            var player = (ServerEntity) Game.CreatePlayer(model.PlayerId);
            player.Socket = socket;
            var x = Math.Min((int) (Math.Random()*Constants.NumberOfSquares), Constants.NumberOfSquares - 1);
            var y = Math.Min((int) (Math.Random()*Constants.NumberOfSquares), Constants.NumberOfSquares - 1);
            Global.Console.Log("new player ", Game.Players.Count);
            player.Init(x*Constants.SquareSize, y*Constants.SquareSize);

            Game.Players.Add(player);

            foreach (ServerEntity entity in Game.Players)
            {
                if (entity.PlayerId != player.PlayerId)
                {
                    ServerCommunicator.SendMessage(entity.Socket, SocketChannels.ServerChannel(SocketChannels.Server.PlayerSync),
                        new PlayerSyncModel()
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
                        });
                }
                else
                {
                    ServerCommunicator.SendMessage(socket, SocketChannels.ServerChannel(SocketChannels.Server.PlayerSync),
                        new PlayerSyncModel()
                        {
                            JoinedPlayers = Game.Players.Map(p => new PlayerModel()
                            {
                                PlayerId = p.PlayerId,
                                X = p.X,
                                Y = p.Y,
                            })
                        });
                }
            }
        }
    }
}