using System;
using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common;
using Pather.Common.Models.GameSegment.Base;
using Pather.Common.Models.GameWorld.Gateway;
using Pather.Common.Models.Gateway.PubSub;
using Pather.Common.Models.Gateway.PubSub.Base;
using Pather.Common.Models.Gateway.Socket.Base;
using Pather.Common.Models.Head;
using Pather.Common.Models.Tick;
using Pather.Common.Utils;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.PushPop;
using Pather.Servers.Common.ServerLogging;
using Pather.Servers.Common.SocketManager;

namespace Pather.Servers.GatewayServer
{
    public class GatewayServer
    {
        public IPushPop PushPop { get; set; }
        private readonly ISocketManager socketManager;
        public string GatewayId;
        private readonly int port;
        public ServerCommunicator ServerCommunicator;
        public GatewayPubSub GatewayPubSub;
        public BackEndTickManager BackEndTickManager;
        public ServerLogger ServerLogger;
        private readonly DictionaryList<string, GatewayUser> Users = new DictionaryList<string, GatewayUser>(a => a.UserId);


        public GatewayServer(IPubSub pubsub, IPushPop pushPop, ISocketManager socketManager, string gatewayId, int port)
        {
            PushPop = pushPop;
            this.socketManager = socketManager;
            GatewayId = gatewayId;
            this.port = port;
            ServerLogger = new ServerLogger("Gateway", GatewayId);

            ServerLogger.LogInformation(GatewayId, port);


            Q.All(pubsub.Init(ServerLogger), pushPop.Init(ServerLogger)).Then(() =>
            {
                GatewayPubSub = new GatewayPubSub(pubsub, GatewayId);
                GatewayPubSub.OnMessage += OnMessage;
                GatewayPubSub.OnAllMessage += OnAllMessage;
                GatewayPubSub.Init();

                BackEndTickManager = new BackEndTickManager(ServerLogger);
                BackEndTickManager.Init(SendPing, () =>
                {
                    ServerLogger.LogDebug("Connected To Tick Server");
                    registerGatewayWithCluster();
                    pubsubReady();
                });
                BackEndTickManager.OnProcessLockstep += processLockStep;
                BackEndTickManager.StartPing();
            });
        }


        private void processLockStep(long lockstepTickNumber)
        {
            if (reorgUserAtLockstep.ContainsKey(lockstepTickNumber))
            {
                var reorgsThisTick = reorgUserAtLockstep[lockstepTickNumber];
                ServerLogger.LogDebug("Reorg!", reorgsThisTick);

                foreach (var reorganizeUserMessage in reorgsThisTick)
                {
                    var gatewayUser = Users[reorganizeUserMessage.UserId];
                    if (gatewayUser == null)
                    {
                        ServerLogger.LogError("Tried to reorganize user who already left", reorganizeUserMessage.UserId);
                        continue;
                    }
                    ServerLogger.LogDebug("Old GS:", gatewayUser.GameSegmentId, "New GS:", reorganizeUserMessage.NewGameSegmentId);

                    gatewayUser.GameSegmentId = reorganizeUserMessage.NewGameSegmentId;
                    gatewayUser.BetweenReorgs = false;
                    ServerLogger.LogDebug("Queued Messages:", gatewayUser.QueuedMessagesBetweenReorg.Count);

                    foreach (var gameSegmentAction in gatewayUser.QueuedMessagesBetweenReorg)
                    {
                        GatewayPubSub.PublishToGameSegment(gatewayUser.GameSegmentId, new GameSegmentAction_Gateway_GameSegment_PubSub_Message()
                        {
                            UserId = gatewayUser.UserId,
                            Action = gameSegmentAction
                        });
                    }
                }
            }
        }

        private readonly JsDictionary<long, List<ReorganizeUser_GameWorld_Gateway_PubSub_Message>> reorgUserAtLockstep =
            new JsDictionary<long, List<ReorganizeUser_GameWorld_Gateway_PubSub_Message>>();


        private void registerGatewayWithCluster()
        {
            //register game segment
            PushPop.Push(GatewayId, 1);
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
                case Gateway_PubSub_AllMessageType.Ping:
                    if (ServerCommunicator == null) return;
                    GatewayPubSub.PublishToHeadServer(new Ping_Response_Gateway_Head_PubSub_Message()
                    {
                        GatewayId = GatewayId,
                        Address = ServerCommunicator.URL,
                        LiveConnections = Users.Count
                    });
                    break;
                case Gateway_PubSub_AllMessageType.TickSync:
                    var tickSyncMessage = (TickSync_Tick_Gateway_PubSub_AllMessage)message;
                    BackEndTickManager.SetLockStepTick(tickSyncMessage.LockstepTickNumber);

                    foreach (var gatewayUser in Users.List)
                    {
                        ServerCommunicator.SendMessage(gatewayUser.Socket, new TickSync_Gateway_User_Socket_Message()
                        {
                            LockstepTickNumber = tickSyncMessage.LockstepTickNumber
                        });
                    }
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private readonly JsDictionary<string, List<ClientActionCacheModel>> cachedUserActions = new JsDictionary<string, List<ClientActionCacheModel>>();


        private void OnMessage(Gateway_PubSub_Message message)
        {
            GatewayUser gatewayUser;
            switch (message.Type)
            {
                case Gateway_PubSub_MessageType.UserJoined:
                    var userJoinedMessage = (UserJoined_GameWorld_Gateway_PubSub_Message)message;
                    gatewayUser = Users[userJoinedMessage.UserId];
                    if (gatewayUser == null)
                    {
                        ServerLogger.LogError("User succsfully joined, but doesnt exist anymore", userJoinedMessage.UserId, userJoinedMessage.GameSegmentId);
                        GatewayPubSub.PublishToGameWorld(new UserLeft_Gateway_GameWorld_PubSub_Message()
                        {
                            UserId = userJoinedMessage.UserId
                        });

                        return;
                    }
                    gatewayUser.GameSegmentId = userJoinedMessage.GameSegmentId;
                    ServerLogger.LogInformation(GatewayId, "Joined", gatewayUser.GameSegmentId, gatewayUser.UserId);
                    ServerCommunicator.SendMessage(gatewayUser.Socket, new UserJoined_Gateway_User_Socket_Message()
                    {
                        X = userJoinedMessage.X,
                        Y = userJoinedMessage.Y,
                        UserId = userJoinedMessage.UserId,
                        Grid = userJoinedMessage.Grid,
                        LockstepTickNumber = BackEndTickManager.LockstepTickNumber
                    });

                    if (cachedUserActions.ContainsKey(userJoinedMessage.UserId))
                    {
                        ServerLogger.LogInformation("Removing cached action for ", userJoinedMessage.UserId);
                        var userActionMessages = cachedUserActions[userJoinedMessage.UserId];
                        foreach (var userActionMessage in userActionMessages)
                        {
                            ServerCommunicator.SendMessage(gatewayUser.Socket, new ClientAction_Gateway_User_Socket_Message()
                            {
                                UserId = gatewayUser.UserId,
                                Action = userActionMessage.ClientAction
                            });
                        }
                        cachedUserActions.Remove(userJoinedMessage.UserId);
                    }

                    break;
                case Gateway_PubSub_MessageType.Pong:
                    var pongMessage = (Pong_Tick_Gateway_PubSub_Message)message;
                    BackEndTickManager.OnPongReceived();

                    break;
                case Gateway_PubSub_MessageType.ClientActionCollection:
                    var clientActionCollectionMessage = (ClientActionCollection_GameSegment_Gateway_PubSub_Message)message;
                    processClientAction(clientActionCollectionMessage);
                    break;
                case Gateway_PubSub_MessageType.ReorganizeUser:
                    var reorgUserMessage = (ReorganizeUser_GameWorld_Gateway_PubSub_Message)message;
                    ServerLogger.LogInformation("Trying to reorg", reorgUserMessage.UserId,reorgUserMessage.NewGameSegmentId,reorgUserMessage.SwitchAtLockstepNumber);
                    var user = Users[reorgUserMessage.UserId];
                    user.BetweenReorgs = true;
                    user.ReorgAtLockstep = reorgUserMessage.SwitchAtLockstepNumber;

                    if (!reorgUserAtLockstep.ContainsKey(reorgUserMessage.SwitchAtLockstepNumber))
                    {
                        reorgUserAtLockstep[reorgUserMessage.SwitchAtLockstepNumber] = new List<ReorganizeUser_GameWorld_Gateway_PubSub_Message>();
                    }
                    reorgUserAtLockstep[reorgUserMessage.SwitchAtLockstepNumber].Add(reorgUserMessage);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private void processClientAction(ClientActionCollection_GameSegment_Gateway_PubSub_Message clientActionMessage)
        {
            GatewayUser gatewayUser;

            foreach (var userToSendTo in clientActionMessage.Users)
            {
                gatewayUser = Users[userToSendTo];

                if (gatewayUser == null)
                {
                    //todo find out why user does not exist yet
                    ServerLogger.LogError("User does not exist yet, storing actions", userToSendTo);
                    if (!cachedUserActions.ContainsKey(userToSendTo))
                    {
                        cachedUserActions[userToSendTo] = new List<ClientActionCacheModel>();
                    }
                    cachedUserActions[userToSendTo].Add(new ClientActionCacheModel()
                    {
                        UserId = userToSendTo,
                        ClientAction = clientActionMessage.ClientAction
                    });

                    continue;
                }
                ServerCommunicator.SendMessage(gatewayUser.Socket, new ClientAction_Gateway_User_Socket_Message()
                {
                    UserId = gatewayUser.UserId,
                    Action = clientActionMessage.ClientAction
                });
            }
        }


        private void pubsubReady()
        {
            ServerLogger.LogInformation("start socket server");
            ServerCommunicator = new ServerCommunicator(socketManager, port, ServerLogger);

            ServerCommunicator.OnDisconnectConnection += (socket) =>
            {
                var gatewayUser = Users.List.First(a => a.Socket == socket);

                if (gatewayUser != null)
                {
                    if (gatewayUser.GameSegmentId != null)
                    {
                        GatewayPubSub.PublishToGameWorld(new UserLeft_Gateway_GameWorld_PubSub_Message()
                        {
                            UserId = gatewayUser.UserId
                        });
                    }
                    Users.Remove(gatewayUser);
                    ServerLogger.LogInformation("Left", gatewayUser.UserId, Users.Count);
                }
                else
                {
                    ServerLogger.LogInformation("Left", Users.Count);
                }
            };

            ServerCommunicator.OnNewConnection += (socket) =>
            {
                var user = new GatewayUser()
                {
                    Socket = socket
                };
                ServerLogger.LogInformation("Joined", Users.Count);
                ServerCommunicator.ListenOnChannel(socket, "Gateway.Message",
                    (ISocket cSocket, Gateway_Socket_Message message) =>
                    {
                        if (Utilities.HasField<User_Gateway_Socket_Message>(message, m => m.UserGatewayMessageType))
                        {
                            HandleUserMessage(user, (User_Gateway_Socket_Message)message);
                        }
                    });
            };
        }

        private void HandleUserMessage(GatewayUser user, User_Gateway_Socket_Message message)
        {
            switch (message.UserGatewayMessageType)
            {
                case User_Gateway_Socket_MessageType.Ping:
                    ServerCommunicator.SendMessage(user.Socket, new Pong_Gateway_User_PubSub_Message()
                    {
                        GatewayLatency = BackEndTickManager.CurrentServerLatency
                    });
                    break;
                case User_Gateway_Socket_MessageType.GameSegmentAction:
                    var gameSegmentActionMessage = ((GameSegmentAction_User_Gateway_Socket_Message)message);

                    if (user.BetweenReorgs)
                    {
                        ServerLogger.LogInformation("Adding message to reorg queue:", user.UserId);
                        gameSegmentActionMessage.GameSegmentAction.LockstepTick = user.ReorgAtLockstep + 1;
                        user.QueuedMessagesBetweenReorg.Add(gameSegmentActionMessage.GameSegmentAction);
                    }
                    else
                    {
                        GatewayPubSub.PublishToGameSegment(user.GameSegmentId, new GameSegmentAction_Gateway_GameSegment_PubSub_Message()
                        {
                            UserId = user.UserId,
                            Action = gameSegmentActionMessage.GameSegmentAction
                        });
                    }

                    break;
                case User_Gateway_Socket_MessageType.Join:
                    var userJoinedMessage = ((UserJoined_User_Gateway_Socket_Message)message);
                    user.UserId = userJoinedMessage.UserToken;
                    Users.Add(user);
                    GatewayPubSub.PublishToGameWorld(new UserJoined_Gateway_GameWorld_PubSub_Message()
                    {
                        GatewayId = GatewayId,
                        UserToken = userJoinedMessage.UserToken
                    });

                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
    }
}