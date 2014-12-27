using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameSegment.Base;
using Pather.Common.Models.GameWorld.GameSegment;
using Pather.Common.Models.GameWorld.Gateway;
using Pather.Common.Models.Gateway.PubSub;
using Pather.Common.Models.Tick;
using Pather.Common.Utils;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.PushPop;
using Pather.Servers.Common.ServerLogging;
using Pather.Servers.GameSegment.Logger;
using Pather.Servers.GameSegment.Models;

namespace Pather.Servers.GameSegment
{
    public class GameSegmentServer
    {
        private ClientTickManager ClientTickManager;
        private readonly IPubSub Pubsub;
        private readonly IPushPop PushPop;
        private readonly string GameSegmentId;
        public GameSegment MyGameSegment;
        public JsDictionary<string, GameSegment> OtherGameSegments = new JsDictionary<string, GameSegment>();

        public List<GameSegmentUser> AllUsers;
        public JsDictionary<string, GameSegmentUser> AllUsersDictionary;
        public JsDictionary<string, GameSegment> AllUserGameSegments;
        public JsDictionary<string, GameSegment> AllGameSegments;

        public GameSegmentServer(IPubSub pubsub, IPushPop pushPop, string gameSegmentId)
        {
            GameSegmentLogger.InitLogger(gameSegmentId);
            ServerLogger.InitLogger("GameSegment", gameSegmentId);
            Pubsub = pubsub;
            PushPop = pushPop;
            GameSegmentId = gameSegmentId;

            //Global.SetInterval(() => { Global.Console.Log("keep alive " + new DateTime().ToString().Substring(17, 24)); }, 10 * 1000);
            //var game = new ServerGame(socketManager, gameServerName);
            //game.Init();

            Q.All(pubsub.Init(), pushPop.Init())
                .Then(() =>
                {
                    GameSegmentPubSub = new GameSegmentPubSub(Pubsub, GameSegmentId);
                    GameSegmentPubSub.OnAllMessage += onAllMessage;
                    GameSegmentPubSub.OnMessage += onMessage;
                    GameSegmentPubSub.Init().Then(ready);
                });
            AllUsers = new List<GameSegmentUser>();
            AllUsersDictionary = new JsDictionary<string, GameSegmentUser>();


            Global.SetInterval(BuildNeighbors, 3000);
        }

        private void ready()
        {
            ClientTickManager = new ClientTickManager();
            ClientTickManager.Init(SendPing, TickManagerReady);
            ClientTickManager.StartPing();
        }

        private void TickManagerReady()
        {
            GameSegmentPubSub
                .PublishToGameWorldWithCallback<InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message>
                (new InitializeGameSegment_GameSegment_GameWorld_PubSub_ReqRes_Message()
                {
                    OriginGameSegment = GameSegmentId
                }).Then(
                    message =>
                    {
                        AllUsers = new List<GameSegmentUser>();
                        AllUsersDictionary = new JsDictionary<string, GameSegmentUser>();
                        AllUserGameSegments = new JsDictionary<string, GameSegment>();
                        AllGameSegments = new JsDictionary<string, GameSegment>();


                        MyGameSegment = new GameSegment(GameSegmentId);
                        AllGameSegments[MyGameSegment.GameSegmentId] = MyGameSegment;

                        foreach (var gameSegmentId in message.GameSegmentIds)
                        {
                            AllGameSegments[gameSegmentId] = new GameSegment(gameSegmentId);
                        }


                        foreach (var initialGameUser in message.AllUsers)
                        {
                            var user = new GameSegmentUser()
                            {
                                UserId = initialGameUser.UserId,
                                GameSegmentId = initialGameUser.GameSegmentId,
                                GatewayId = initialGameUser.GatewayId,
                                X = initialGameUser.X,
                                Y = initialGameUser.Y,
                            };

                            AllUsers.Add(user);
                            AllUsersDictionary[user.UserId] = user;
                            AllUserGameSegments[user.UserId] = AllGameSegments[user.GameSegmentId];
                            AllGameSegments[user.GameSegmentId].UserJoin(user);
                        }


                        Global.Console.Log("Game Segment Initialized", GameSegmentId);

                        RegisterGameSegmentWithCluster();
                    });
        }

        private void SendPing()
        {
            GameSegmentPubSub.PublishToTickServer(new Ping_Tick_PubSub_Message()
            {
                Origin = PubSubChannels.GameSegment(GameSegmentId),
                OriginType = Ping_Tick_PubSub_Message_OriginType.GameSegment
            });
        }

        private void RegisterGameSegmentWithCluster()
        {
            //register game segment
            PushPop.Push(GameSegmentId, 1);
        }


        private void onMessage(GameSegment_PubSub_Message message)
        {
            switch (message.Type)
            {
                case GameSegment_PubSub_MessageType.UserJoin:
                    OnMessageUserJoin((UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message) message);
                    break;
                case GameSegment_PubSub_MessageType.UserMoved:
                    OnMessageUserMoved((UserMoved_Gateway_GameSegment_PubSub_Message) message);
                    break;
                case GameSegment_PubSub_MessageType.TellUserJoin:
                    OnMessageTellUserJoin((TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message) message);
                    break;
                case GameSegment_PubSub_MessageType.TellUserLeft:
                    OnMessageTellUserLeft((TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message) message);
                    break;
                case GameSegment_PubSub_MessageType.UserLeft:
                    OnMessageUserLeft((UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message) message);
                    break;
                case GameSegment_PubSub_MessageType.NewGameSegment:
                    OnMessageNewGameSegment((NewGameSegment_GameWorld_GameSegment_PubSub_Message) message);
                    break;
                case GameSegment_PubSub_MessageType.Pong:
                    OnMessagePong((Pong_Tick_GameSegment_PubSub_Message) message);
                    break;
                case GameSegment_PubSub_MessageType.TellUserMoved:
                    OnMessageTellUserMoved((TellUserMoved_GameSegment_GameSegment_PubSub_Message) message);
                    break;
                case GameSegment_PubSub_MessageType.UserMovedFromGameSegment:
                    OnMessageUserMoved((UserMoved_GameSegment_GameSegment_PubSub_Message) message);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private void OnMessageNewGameSegment(NewGameSegment_GameWorld_GameSegment_PubSub_Message message)
        {
            var newGameSegment = new GameSegment(message.GameSegmentId);
            OtherGameSegments[message.GameSegmentId] = newGameSegment;
            AllGameSegments[newGameSegment.GameSegmentId] = newGameSegment;
            Global.Console.Log(" Added new Game Segment ", message.GameSegmentId);
        }


        private void OnMessagePong(Pong_Tick_GameSegment_PubSub_Message message)
        {
            ClientTickManager.OnPongReceived();
        }

        private void OnMessageUserLeft(UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            var user = AllUsersDictionary[message.UserId];
            MyGameSegment.UserLeft(message.UserId);
            AllUserGameSegments.Remove(message.UserId);
            AllUsers.Remove(user);
            AllUsersDictionary.Remove(message.UserId);
            GameSegmentLogger.LogUserLeft(true, user.UserId);

            //todo maybe shoudlnt be reqres
            GameSegmentPubSub.PublishToGameWorld(new UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
            {
                MessageId = message.MessageId
            });

            BuildNeighbors();
        }

        private void OnMessageTellUserLeft(TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            var gameSegment = AllUserGameSegments[message.UserId];
            gameSegment.UserLeft(message.UserId);

            AllUserGameSegments.Remove(message.UserId);
            var user = AllUsersDictionary[message.UserId];
            AllUsers.Remove(user);
            AllUsersDictionary.Remove(message.UserId);
            GameSegmentLogger.LogUserLeft(false, user.UserId);

            GameSegmentPubSub.PublishToGameWorld(new TellUserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
            {
                MessageId = message.MessageId
            });

            BuildNeighbors();
        }

        private void OnMessageTellUserJoin(TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            var gameSegmentUser = new GameSegmentUser()
            {
                UserId = message.UserId,
                GameSegmentId = message.GameSegmentId,
                GatewayId = message.GatewayId,
                X = message.X,
                Y = message.Y,
            };

            var otherGameSegment = OtherGameSegments[message.GameSegmentId];
            AllUsers.Add(gameSegmentUser);
            AllUsersDictionary[gameSegmentUser.UserId] = gameSegmentUser;
            AllUserGameSegments[gameSegmentUser.UserId] = otherGameSegment;


            otherGameSegment.UserJoin(gameSegmentUser);

            GameSegmentLogger.LogUserJoin(false, gameSegmentUser.UserId, gameSegmentUser.X, gameSegmentUser.Y);


            GameSegmentPubSub.PublishToGameWorld(new TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
            {
                MessageId = message.MessageId
            });

            BuildNeighbors();
        }

        private void OnMessageUserJoin(UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            var gameSegmentUser = new GameSegmentUser()
            {
                UserId = message.UserId,
                GameSegmentId = GameSegmentId,
                GatewayId = message.GatewayId,
                X = message.X,
                Y = message.Y,
            };

            AllUsers.Add(gameSegmentUser);
            AllUsersDictionary[gameSegmentUser.UserId] = gameSegmentUser;
            AllUserGameSegments[gameSegmentUser.UserId] = MyGameSegment;

            MyGameSegment.UserJoin(gameSegmentUser);

            GameSegmentLogger.LogUserJoin(true, gameSegmentUser.UserId, gameSegmentUser.X, gameSegmentUser.Y);


            GameSegmentPubSub.PublishToGameWorld(new UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
            {
                MessageId = message.MessageId
            });

            BuildNeighbors();
        }

        private void OnMessageUserMoved(UserMoved_Gateway_GameSegment_PubSub_Message message)
        {
            if (!MyGameSegment.Users.ContainsKey(message.UserId))
            {
                throw new Exception("This aint my user! " + message.UserId);
            }

            var user = MyGameSegment.Users[message.UserId];
            Global.Console.Log("User moving");
            if (user.MoveTo(message.X, message.Y, message.LockstepTick))
            {
                BuildNeighbors();
                Global.Console.Log("User can move and has ", user.Neighbors.Count, "Neighbors");
                var otherGameSegments = new JsDictionary<string, GameSegment>(AllGameSegments);

                var gateways = user.Neighbors.GroupBy(a => a.User.GatewayId);
                //todo maybe move this dict to a real object
                if (!gateways.ContainsKey(user.GatewayId))
                {
                    gateways[user.GatewayId] = new List<GameSegmentNeighbor>();
                }
                gateways[user.GatewayId].Add(new GameSegmentNeighbor(user, 0));

                Global.Console.Log("Neighbors Found: ", user.Neighbors.Count);

                var neighborGameSegments = user.Neighbors.GroupBy(a => a.User.GatewayId);

                foreach (var otherGameSegment in AllGameSegments)
                {
                    if (!neighborGameSegments.ContainsKey(otherGameSegment.Key) && otherGameSegment.Key != GameSegmentId)
                    {
                        otherGameSegments[otherGameSegment.Key] = otherGameSegment.Value;
                    }
                }

                foreach (var gateway in gateways)
                {
                    Global.Console.Log("sending gateway", gateway.Key, gateway.Value.Count, "Messages",
                        gateway.Value.Select(a => new
                        {
                            a.User.GatewayId,
                            a.User.GameSegmentId,
                            a.User.UserId
                        }));


                    var userMovedCollection = new UserMovedCollection_GameSegment_Gateway_PubSub_Message()
                    {
                        Items = gateway.Value.Select(a => new UserMovedMessage()
                        {
                            UserId = a.User.UserId,
                            UserThatMovedId = user.UserId,
                            X = user.X,
                            Y = user.Y,
                            LockstepTick = message.LockstepTick,
                        })
                    };
                    GameSegmentPubSub.PublishToGateway(gateway.Key, userMovedCollection);
                }

                foreach (var neighborGameSegment in neighborGameSegments)
                {
                    Global.Console.Log("sending neighbor game segment", neighborGameSegment.Key, neighborGameSegment.Value.Count, "Messages", neighborGameSegment.Value.Select(a => new
                    {
                        a.User.GatewayId,
                        a.User.GameSegmentId,
                        a.User.UserId
                    }));

                    GameSegmentPubSub.PublishToGameSegment(neighborGameSegment.Key, new UserMoved_GameSegment_GameSegment_PubSub_Message()
                    {
                        UserId = user.UserId,
                        X = user.X,
                        Y = user.Y,
                        LockstepTick = message.LockstepTick,
                    });
                }

                var tellUserMoved = new TellUserMoved_GameSegment_GameSegment_PubSub_Message()
                {
                    UserId = user.UserId,
                    X = user.X,
                    Y = user.Y,
                    LockstepTick = message.LockstepTick,
                };

                foreach (var otherGameSegment in otherGameSegments)
                {
                    Global.Console.Log("sending other game segment", otherGameSegment.Key);

                    GameSegmentPubSub.PublishToGameSegment(otherGameSegment.Key, tellUserMoved);
                }
                GameSegmentPubSub.PublishToGameWorld(new TellUserMoved_GameSegment_GameWorld_PubSub_Message()
                {
                    UserId = user.UserId,
                    X = user.X,
                    Y = user.Y,
                    LockstepTick = message.LockstepTick,
                });


                GameSegmentLogger.LogUserMoved(user.UserId, user.X, user.Y);
            }
        }

        private void OnMessageUserMoved(UserMoved_GameSegment_GameSegment_PubSub_Message message)
        {
            //todo interpolate movement based on tick
            AllUsersDictionary[message.UserId].X = message.X;
            AllUsersDictionary[message.UserId].Y = message.Y;
            GameSegmentLogger.LogUserMoved(message.UserId, message.X, message.Y);
        }

        private void OnMessageTellUserMoved(TellUserMoved_GameSegment_GameSegment_PubSub_Message message)
        {
            //todo interpolate movement based on tick
            AllUsersDictionary[message.UserId].X = message.X;
            AllUsersDictionary[message.UserId].Y = message.Y;
            GameSegmentLogger.LogTellUserMoved(message.UserId, message.X, message.Y);
        }

        public void BuildNeighbors()
        {
            for (var index = 0; index < AllUsers.Count; index++)
            {
                var user = AllUsers[index];
                user.Neighbors.Clear();
            }
            for (var index = 0; index < AllUsers.Count; index++)
            {
                var user = AllUsers[index];
                if (MyGameSegment.Users.ContainsKey(user.UserId))
                {
                    //                    Global.Console.Log("Trying to find neighbor", user.UserId);
                    BuildNeighbors(user, index);
                }
            }
        }

        private void BuildNeighbors(GameSegmentUser pUser, int i = 0)
        {
            var count = AllUsers.Count;

            for (var c = i + 1; c < count; c++)
            {
                var cUser = AllUsers[c];
                var distance = PointDistance(pUser, cUser);
                if (distance <= Constants.NeighborDistance)
                {
                    //                    Global.Console.Log("Neighbor Found", cUser, pUser, distance);
                    pUser.Neighbors.Add(new GameSegmentNeighbor(cUser, distance));
                    cUser.Neighbors.Add(new GameSegmentNeighbor(pUser, distance));
                }
            }
        }

        private static double PointDistance(GameSegmentUser pUser, GameSegmentUser cUser)
        {
            var mx = pUser.X;
            var my = pUser.Y;

            var cx = cUser.X;
            var cy = cUser.Y;

            var _x = (cx - mx);
            var _y = (cy - my);

            var dis = Math.Sqrt((_x*_x) + (_y*_y));
            return dis;
        }


        private void onAllMessage(GameSegment_PubSub_AllMessage message)
        {
            switch (message.Type)
            {
                case GameSegment_PubSub_AllMessageType.TickSync:
                    var tickSyncMessage = (TickSync_GameSegment_PubSub_AllMessage) message;
                    ClientTickManager.SetLockStepTick(tickSyncMessage.LockstepTickNumber);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public GameSegmentPubSub GameSegmentPubSub;
    }
}