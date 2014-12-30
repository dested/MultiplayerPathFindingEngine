using System;
using System.Collections.Generic;
using Pather.Common;
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
        public ClientTickManager ClientTickManager;
        private readonly List<GatewayUser> Users = new List<GatewayUser>();


        public GatewayServer(IPubSub pubsub, IPushPop pushPop, ISocketManager socketManager, string gatewayId, int port)
        {
            PushPop = pushPop;
            this.socketManager = socketManager;
            GatewayId = gatewayId;
            this.port = port;
            ServerLogger.InitLogger("Gateway", GatewayId);

            Global.Console.Log(GatewayId,port);



            Q.All(pubsub.Init(),pushPop.Init()).Then(() =>
            {
                GatewayPubSub = new GatewayPubSub(pubsub, GatewayId);
                GatewayPubSub.OnMessage += OnMessage;
                GatewayPubSub.OnAllMessage += OnAllMessage;
                GatewayPubSub.Init();

                ClientTickManager = new ClientTickManager();
                ClientTickManager.Init(SendPing, () =>
                {
                    Global.Console.Log("Connected To Tick Server");
                    registerGatewayWithCluster();
                    pubsubReady();

                });
                ClientTickManager.StartPing();
            });
        }


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
                    ClientTickManager.SetLockStepTick(tickSyncMessage.LockstepTickNumber);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private readonly JsDictionary<string, List<UserMovedMessage>> cachedUserMoves = new JsDictionary<string, List<UserMovedMessage>>();


        private void OnMessage(Gateway_PubSub_Message message)
        {
            GatewayUser gatewayUser;
            switch (message.Type)
            {
                case Gateway_PubSub_MessageType.UserJoined:
                    var userJoinedMessage = (UserJoined_GameWorld_Gateway_PubSub_Message)message;
                    gatewayUser = Users.First(user => user.UserId == userJoinedMessage.UserId);

                    if (gatewayUser == null)
                    {
                        Global.Console.Log("User succsfully joined, but doesnt exist anymore", userJoinedMessage);
                        GatewayPubSub.PublishToGameWorld(new UserLeft_Gateway_GameWorld_PubSub_Message()
                        {
                            UserId = userJoinedMessage.UserId
                        });

                        return;
                    }
                    gatewayUser.GameSegmentId = userJoinedMessage.GameSegmentId;
                    //                    Global.Console.Log(GatewayId, "Joined", gatewayUser.GameSegmentId, gatewayUser.UserId);
                    ServerCommunicator.SendMessage(gatewayUser.Socket, new UserJoined_Gateway_User_Socket_Message()
                    {
                        GameSegmentId = userJoinedMessage.GameSegmentId,
                        UserId = userJoinedMessage.UserId
                    });

                    if (cachedUserMoves.ContainsKey(userJoinedMessage.UserId))
                    {
                        Global.Console.Log("Removing cached moved for ", userJoinedMessage.UserId);
                        var userMovedMessages = cachedUserMoves[userJoinedMessage.UserId];
                        foreach (var userMovedMessage in userMovedMessages)
                        {
                    //todo resend these messages
//                            runUserMoved(userMovedMessage);
                        }
                        cachedUserMoves.Remove(userJoinedMessage.UserId);
                    }

                    break;
                case Gateway_PubSub_MessageType.Pong:
                    var pongMessage = (Pong_Tick_Gateway_PubSub_Message)message;
                    ClientTickManager.OnPongReceived();

                    break;
                case Gateway_PubSub_MessageType.UserMovedCollection:
                    var userMovedCollectionMessage = (UserMovedCollection_GameSegment_Gateway_PubSub_Message)message;
                    //                    Global.Console.Log("users moved", userMovedCollectionMessage.Items);
                    runUserMoved(userMovedCollectionMessage);

                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private void runUserMoved(UserMovedCollection_GameSegment_Gateway_PubSub_Message userMovedMessage)
        {
            GatewayUser gatewayUser;

            foreach (var userToSendTo in userMovedMessage.Users)
            {

                gatewayUser = Users.First(user => user.UserId == userToSendTo);

                if (gatewayUser == null)
                {
                    //todo find out why user does not exist yet

                    if (!cachedUserMoves.ContainsKey(userToSendTo))
                    {
                        cachedUserMoves[userToSendTo] = new List<UserMovedMessage>();
                    }
                    cachedUserMoves[userToSendTo].Add(new UserMovedMessage()
                    {
                        UserThatMovedId = userMovedMessage.UserThatMovedId,
                        UserId = userToSendTo,
                        LockstepTick = userMovedMessage.LockstepTick,
                        X = userMovedMessage.X,
                        Y = userMovedMessage.Y,
                    });

                    return;
                }
                ServerCommunicator.SendMessage(gatewayUser.Socket, new MoveToLocation_Gateway_User_Socket_Message()
                {
                    UserId = userMovedMessage.UserThatMovedId,
                    LockstepTick = userMovedMessage.LockstepTick,
                    X = userMovedMessage.X,
                    Y = userMovedMessage.Y,
                });
            }

        }




        private void pubsubReady()
        {
            Global.Console.Log("start socket server");
            ServerCommunicator = new ServerCommunicator(socketManager, port);

            ServerCommunicator.OnDisconnectConnection += (socket) =>
            {
                var gatewayUser = Users.First(a => a.Socket == socket);

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
                }
                Global.Console.Log("Left", Users.Count);
            };

            ServerCommunicator.OnNewConnection += (socket) =>
            {
                var user = new GatewayUser()
                {
                    Socket = socket
                };
                Users.Add(user);
                //                Global.Console.Log("Joined", Users.Count);
                ServerCommunicator.ListenOnChannel(socket, "Gateway.Message",
                    (ISocket cSocket, Gateway_Socket_Message message) =>
                    {
                        if (Utilities.HasField<User_Gateway_Socket_Message>(message, m => m.UserGatewayMessageType))
                        {
                            //                            Global.Console.Log("Socket message ", message);
                            HandleUserMessage(user, (User_Gateway_Socket_Message)message);
                        }
                    });
            };
        }

        private void HandleUserMessage(GatewayUser user, User_Gateway_Socket_Message message)
        {
            switch (message.UserGatewayMessageType)
            {
                case User_Gateway_Socket_MessageType.Move:
                    var moveToLocationMessage = ((MoveToLocation_User_Gateway_Socket_Message)message);

                    GatewayPubSub.PublishToGameSegment(user.GameSegmentId, new UserMoved_Gateway_GameSegment_PubSub_Message()
                    {
                        UserId = user.UserId,
                        LockstepTick = moveToLocationMessage.LockstepTick,
                        X = moveToLocationMessage.X,
                        Y = moveToLocationMessage.Y,
                    });

                    break;
                case User_Gateway_Socket_MessageType.Join:
                    var userJoinedMessage = ((UserJoined_User_Gateway_Socket_Message)message);
                    user.UserId = userJoinedMessage.UserToken;
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