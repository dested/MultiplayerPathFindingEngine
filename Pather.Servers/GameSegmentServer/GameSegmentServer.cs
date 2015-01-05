using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common;
using Pather.Common.Models.Common.UserActions;
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
using Pather.Servers.GameSegmentServer.Logger;
using Pather.Servers.GameSegmentServer.Models;

namespace Pather.Servers.GameSegmentServer
{
    public class GameSegmentServer
    {
        private BackendTickManager backendTickManager;
        private readonly IPubSub pubsub;
        private readonly IPushPop pushPop;
        private readonly string GameSegmentId;
        public GameSegment MyGameSegment;
        public DictionaryList<string, GameSegmentUser> AllUsers;
        public JsDictionary<string, GameSegment> AllGameSegments;

        private ServerGame Game;

        public GameSegmentServer(IPubSub pubsub, IPushPop pushPop, string gameSegmentId)
        {
            GameSegmentLogger.InitLogger(gameSegmentId);
            ServerLogger.InitLogger("GameSegment", gameSegmentId);
            this.pubsub = pubsub;
            this.pushPop = pushPop;
            GameSegmentId = gameSegmentId;
            AllUsers = new DictionaryList<string, GameSegmentUser>(a => a.UserId);

            //Global.SetInterval(() => { Global.Console.Log("keep alive " + new DateTime().ToString().Substring(17, 24)); }, 10 * 1000);
            //var game = new ServerGame(socketManager, gameServerName);
            //game.Init();

            Q.All(pubsub.Init(), pushPop.Init())
                .Then(() =>
                {
                    GameSegmentPubSub = new GameSegmentPubSub(this.pubsub, GameSegmentId);
                    GameSegmentPubSub.OnAllMessage += onAllMessage;
                    GameSegmentPubSub.OnMessage += onMessage;
                    GameSegmentPubSub.Init().Then(ready);
                });

            /*
                        Global.SetInterval(() =>
                        {
                            Global.Console.Log(messagesProcessed);
                        }, 1000);*/
        }

        public long messagesProcessed = 0;

        private void ready()
        {
            backendTickManager = new BackendTickManager();
            backendTickManager.Init(sendPing, () =>
            {
                Game = new ServerGame(SendAction, AllUsers, backendTickManager);
                tickManagerReady();

            });
            backendTickManager.StartPing();
        }

        private void tickManagerReady()
        {
            GameSegmentPubSub
                .PublishToGameWorldWithCallback<InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message>
                (new InitializeGameSegment_GameSegment_GameWorld_PubSub_ReqRes_Message()
                {
                    OriginGameSegment = GameSegmentId
                }).Then(
                    message =>
                    {
                        AllUsers.Clear();
                        AllGameSegments = new JsDictionary<string, GameSegment>();
                        Game.Init(message.Grid);

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
                                GameSegment = AllGameSegments[initialGameUser.GameSegmentId],
                                UserId = initialGameUser.UserId,
                                GatewayId = initialGameUser.GatewayId,
                                X = initialGameUser.X,
                                Y = initialGameUser.Y,
                            };

                            AllUsers.Add(user);
                            user.GameSegment.UserJoin(user);
                        }

                        BuildNeighbors();

                        foreach (var gameSegmentUser in AllUsers.List)
                        {
                            GameSegmentLogger.LogUserJoin(false, gameSegmentUser.UserId, gameSegmentUser.X, gameSegmentUser.Y, gameSegmentUser.Neighbors.Keys);
                        }

                        Global.Console.Log(GameSegmentId, "Game Segment Initialized");


                        Global.SetInterval(BuildNeighbors, 2000);

                        registerGameSegmentWithCluster();
                    });
        }


        private void sendPing()
        {
            GameSegmentPubSub.PublishToTickServer(new Ping_Tick_PubSub_Message()
            {
                Origin = PubSubChannels.GameSegment(GameSegmentId),
                OriginType = Ping_Tick_PubSub_Message_OriginType.GameSegment
            });
        }

        private void registerGameSegmentWithCluster()
        {
            //register game segment
            pushPop.Push(GameSegmentId, 1);
        }


        private void onMessage(GameSegment_PubSub_Message message)
        {
            messagesProcessed++;
            switch (message.Type)
            {
                case GameSegment_PubSub_MessageType.UserJoin:
                    onMessageUserJoin((UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message)message);
                    break;
                case GameSegment_PubSub_MessageType.TellUserJoin:
                    onMessageTellUserJoin((TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message)message);
                    break;
                case GameSegment_PubSub_MessageType.TellUserLeft:
                    onMessageTellUserLeft((TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message)message);
                    break;
                case GameSegment_PubSub_MessageType.UserLeft:
                    onMessageUserLeft((UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message)message);
                    break;
                case GameSegment_PubSub_MessageType.NewGameSegment:
                    OnMessageNewGameSegment((NewGameSegment_GameWorld_GameSegment_PubSub_Message)message);
                    break;
                case GameSegment_PubSub_MessageType.Pong:
                    onMessagePong((Pong_Tick_GameSegment_PubSub_Message)message);
                    break;
                case GameSegment_PubSub_MessageType.UserAction:
                    OnMessageUserAction((UserAction_Gateway_GameSegment_PubSub_Message)message);
                    break;
                case GameSegment_PubSub_MessageType.GameSegmentAction:
                    OnMessageUserAction((UserAction_GameSegment_GameSegment_PubSub_Message)message);
                    break;
                case GameSegment_PubSub_MessageType.TellGameSegmentAction:
                    OnMessageTellUserAction((TellUserAction_GameSegment_GameSegment_PubSub_Message)message);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private void OnMessageUserAction(UserAction_Gateway_GameSegment_PubSub_Message message)
        {
            if (!MyGameSegment.Users.ContainsKey(message.UserId))
            {
                throw new Exception("This aint my user! " + message.UserId);
            }

            Game.QueueUserAction(MyGameSegment.Users[message.UserId], message.Action);
        }
        private void OnMessageUserAction(UserAction_GameSegment_GameSegment_PubSub_Message message)
        {
            if (!MyGameSegment.Users.ContainsKey(message.UserId))
            {
                throw new Exception("This aint my user! " + message.UserId);
            }

            Game.ProcessUserActionFromNeighbor(MyGameSegment.Users[message.UserId], message.Action);
        }
        private void OnMessageTellUserAction(TellUserAction_GameSegment_GameSegment_PubSub_Message message)
        {
            if (!MyGameSegment.Users.ContainsKey(message.UserId))
            {
                throw new Exception("This aint my user! " + message.UserId);
            }

            Game.TellUserAction(MyGameSegment.Users[message.UserId], message.Action);
        }

        /*instead of move, you need a process action. that action gets sent directly to the game logic manager,
         you need ot be able to respond to just a user, or a user and his neighbors
         you also need to send to the other gamesegments that it does and doesnt directly effect */

        public void OnMessageNewGameSegment(NewGameSegment_GameWorld_GameSegment_PubSub_Message message)
        {
            var newGameSegment = new GameSegment(message.GameSegmentId);
            AllGameSegments[newGameSegment.GameSegmentId] = newGameSegment;
            Global.Console.Log(GameSegmentId, " Added new Game Segment ", message.GameSegmentId);
        }


        private void onMessagePong(Pong_Tick_GameSegment_PubSub_Message message)
        {
            backendTickManager.OnPongReceived();
        }

        private void onMessageUserLeft(UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            var user = AllUsers[message.UserId];
            //todo remove user ina  method or something
            var removed = new List<string>()
            {
                message.UserId
            };

            foreach (var gameSegmentNeighbor in user.Neighbors.List)
            {
                foreach (var segmentNeighbor in gameSegmentNeighbor.User.Neighbors.List)
                {
                    if (segmentNeighbor.User == user)
                    {
                        gameSegmentNeighbor.User.Neighbors.Remove(segmentNeighbor);
                        break;
                    }
                }


                GameSegmentPubSub.PublishToGateway(gameSegmentNeighbor.User.GatewayId, new UpdateNeighbors_GameSegment_Gateway_PubSub_Message()
                {
                    UserId = gameSegmentNeighbor.User.UserId,
                    Removed = removed
                });
            }
            user.Neighbors.Clear();


            MyGameSegment.UserLeft(message.UserId);
            AllUsers.Remove(user);
            GameSegmentLogger.LogUserLeft(true, user.UserId);

            //todo maybe shoudlnt be reqres
            GameSegmentPubSub.PublishToGameWorld(new UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
            {
                MessageId = message.MessageId
            });
        }

        private void onMessageTellUserLeft(TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            var user = AllUsers[message.UserId];
            var gameSegment = user.GameSegment;

            gameSegment.UserLeft(message.UserId);

            var removed = new List<string>()
            {
                message.UserId
            };

            //todo remove user ina  method or something
            foreach (var gameSegmentNeighbor in user.Neighbors.List)
            {
                foreach (var segmentNeighbor in gameSegmentNeighbor.User.Neighbors.List)
                {
                    if (segmentNeighbor.User == user)
                    {
                        gameSegmentNeighbor.User.Neighbors.Remove(segmentNeighbor);
                        break;
                    }
                }


                GameSegmentPubSub.PublishToGateway(gameSegmentNeighbor.User.GatewayId, new UpdateNeighbors_GameSegment_Gateway_PubSub_Message()
                {
                    UserId = gameSegmentNeighbor.User.UserId,
                    Removed = removed
                });
            }

            user.Neighbors.Clear();


            AllUsers.Remove(user);
            GameSegmentLogger.LogUserLeft(false, user.UserId);

            GameSegmentPubSub.PublishToGameWorld(new TellUserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
            {
                MessageId = message.MessageId
            });
        }

        private void onMessageTellUserJoin(TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            var gameSegmentUser = new GameSegmentUser()
            {
                UserId = message.UserId,

                GameSegment = AllGameSegments[message.GameSegmentId],
                GatewayId = message.GatewayId,
                X = message.X,
                Y = message.Y,
            };

            var otherGameSegment = AllGameSegments[message.GameSegmentId];
            AllUsers.Add(gameSegmentUser);

            //            Global.Console.Log(GameSegmentId, "User joined from other gamesegment", message.GameSegmentId, message.UserId);

            otherGameSegment.UserJoin(gameSegmentUser);

            BuildNeighbors();

            GameSegmentLogger.LogUserJoin(false, gameSegmentUser.UserId, gameSegmentUser.X, gameSegmentUser.Y, gameSegmentUser.Neighbors.Keys);


            GameSegmentPubSub.PublishToGameWorld(new TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
            {
                MessageId = message.MessageId
            });
        }


        private void onMessageUserJoin(UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            foreach (var userJoinGameUser in message.Collection)
            {
                var gameSegmentUser = new GameSegmentUser()
                {
                    UserId = userJoinGameUser.UserId,
                    GameSegment = AllGameSegments[GameSegmentId],
                    GatewayId = userJoinGameUser.GatewayId,
                    X = userJoinGameUser.X,
                    Y = userJoinGameUser.Y,
                };

                AllUsers.Add(gameSegmentUser);
                MyGameSegment.UserJoin(gameSegmentUser);
                BuildNeighbors();
                GameSegmentLogger.LogUserJoin(true, gameSegmentUser.UserId, gameSegmentUser.X, gameSegmentUser.Y, gameSegmentUser.Neighbors.Keys);
            }

            GameSegmentPubSub.PublishToGameWorld(new UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
            {
                MessageId = message.MessageId
            });
        }

        public void SendAction(GameSegmentUser user, UserAction userAction)
        {
            var otherGameSegments = new JsDictionary<string, GameSegment>();
            var gateways = user.Neighbors.List.GroupBy(a => a.User.GatewayId);
            //todo maybe move this dict to a real object
            if (!gateways.ContainsKey(user.GatewayId))
            {
                gateways[user.GatewayId] = new List<GameSegmentNeighbor>();
            }
            gateways[user.GatewayId].Add(new GameSegmentNeighbor(user, 0));

            var neighborGameSegments = user.Neighbors.List.GroupBy(a => a.User.GameSegment);

            neighborGameSegments.Remove(MyGameSegment);
            foreach (var otherGameSegment in AllGameSegments)
            {
                if (!neighborGameSegments.ContainsKey(otherGameSegment.Value) && otherGameSegment.Key != GameSegmentId)
                {
                    otherGameSegments[otherGameSegment.Key] = otherGameSegment.Value;
                }
            }

            foreach (var gateway in gateways)
            {
                var userActionCollection = new UserActionCollection_GameSegment_Gateway_PubSub_Message()
                {
                    Users = gateway.Value.Select(a => a.User.UserId),
                    Action = userAction
                };
                GameSegmentPubSub.PublishToGateway(gateway.Key, userActionCollection);
            }

            var tellUserAction = new TellUserAction_GameSegment_GameSegment_PubSub_Message()
            {
                UserId = user.UserId,
                OriginatingGameSegmentId = GameSegmentId,
                Action = userAction
            };


            foreach (var otherGameSegment in otherGameSegments)
            {
                GameSegmentPubSub.PublishToGameSegment(otherGameSegment.Key, tellUserAction);
            }


            foreach (var neighborGameSegment in neighborGameSegments)
            {
                GameSegmentPubSub.PublishToGameSegment(neighborGameSegment.Key.GameSegmentId, new UserAction_GameSegment_GameSegment_PubSub_Message()
                {
                    UserId = user.UserId,
                    OriginatingGameSegmentId = GameSegmentId,
                    Action = userAction
                });
            }

            GameSegmentPubSub.PublishToGameWorld(new TellUserAction_GameSegment_GameWorld_PubSub_Message()
            {
                UserId = user.UserId,
                OriginatingGameSegmentId = GameSegmentId,
                Action = userAction
            });


            GameSegmentLogger.LogUserMoved(user.UserId, user.X, user.Y, user.Neighbors.Keys);

        }

        public void BuildNeighbors()
        {
//            Global.Console.Log(GameSegmentId, "Building Neighbors");
            for (var index = 0; index < AllUsers.Count; index++)
            {
                var user = AllUsers[index];
                user.OldNeighbors = new List<GameSegmentNeighbor>(user.Neighbors.List);
                user.Neighbors.Clear();
            }


            foreach (var user in MyGameSegment.Users)
            {
                buildNeighbors(user.Value);
            }

            diffNeighbors();
            //            Global.Console.Log(GameSegmentId, "Updated", AllGameSegments);
        }


        private void buildNeighbors(GameSegmentUser pUser)
        {
            var count = AllUsers.Count;

            for (var c = 0; c < count; c++)
            {
                var cUser = AllUsers[c];
                if (cUser.Neighbors.Contains(pUser.UserId) || cUser == pUser)
                {
                    continue;
                }

                var distance = pointDistance(pUser, cUser);
                if (distance <= Constants.NeighborDistance)
                {
                    //                    Global.Console.Log(GameSegmentId,"Neighbor Found", cUser.UserId, pUser.UserId, distance);
                    pUser.Neighbors.Add(new GameSegmentNeighbor(cUser, distance));
                    cUser.Neighbors.Add(new GameSegmentNeighbor(pUser, distance));
                }
            }
        }


        private void diffNeighbors()
        {
            foreach (var userKV in MyGameSegment.Users)
            {
                var removed = new List<GameSegmentUser>();
                var added = new List<GameSegmentUser>();

                var gameSegmentUser = userKV.Value;

                foreach (var gameSegmentNeighbor in gameSegmentUser.Neighbors.List)
                {
                    var notIn = true;
                    foreach (var segmentNeighbor in gameSegmentUser.OldNeighbors)
                    {
                        if (gameSegmentNeighbor.User == segmentNeighbor.User)
                        {
                            notIn = false;
                            break;
                        }
                    }
                    if (notIn)
                    {
                        added.Add(gameSegmentNeighbor.User);
                    }
                }
                foreach (var gameSegmentNeighbor in gameSegmentUser.OldNeighbors)
                {
                    var notIn = true;
                    foreach (var segmentNeighbor in gameSegmentUser.Neighbors.List)
                    {
                        if (gameSegmentNeighbor.User == segmentNeighbor.User)
                        {
                            notIn = false;
                            break;
                        }
                    }
                    if (notIn)
                    {
                        removed.Add(gameSegmentNeighbor.User);
                    }
                }

                gameSegmentUser.OldNeighbors = null;
                if (added.Count > 0 || removed.Count > 0)
                {
                    var updateNeighborsMessage = new UpdateNeighbors_GameSegment_Gateway_PubSub_Message()
                    {
                        UserId = gameSegmentUser.UserId,
                        Removed = removed.Select(a => a.UserId),
                        Added = added.Select(a => new UpdatedNeighbor()
                        {
                            UserId = a.UserId,
                            X = a.X,
                            Y = a.Y
                        })
                    };
                    Global.Console.Log(GameSegmentId, updateNeighborsMessage);
                    GameSegmentPubSub.PublishToGateway(gameSegmentUser.GatewayId, updateNeighborsMessage);
                }
            }
        }

        private static double pointDistance(GameSegmentUser pUser, GameSegmentUser cUser)
        {
            var mx = pUser.X;
            var my = pUser.Y;

            var cx = cUser.X;
            var cy = cUser.Y;

            var x = (cx - mx);
            var y = (cy - my);

            var dis = Math.Sqrt((x * x) + (y * y));
            return dis;
        }


        private void onAllMessage(GameSegment_PubSub_AllMessage message)
        {
            switch (message.Type)
            {
                case GameSegment_PubSub_AllMessageType.TickSync:
                    var tickSyncMessage = (TickSync_GameSegment_PubSub_AllMessage)message;
                    backendTickManager.SetLockStepTick(tickSyncMessage.LockstepTickNumber);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public GameSegmentPubSub GameSegmentPubSub;
    }
}