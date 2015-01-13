using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameWorld.Base;
using Pather.Common.Models.GameWorld.GameSegment;
using Pather.Common.Models.GameWorld.Gateway;
using Pather.Common.Models.GameWorld.Tick;
using Pather.Common.Models.Gateway.PubSub;
using Pather.Common.Models.Tick;
using Pather.Common.Utils;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.ServerLogging;
using Pather.Servers.Database;
using Pather.Servers.GameWorldServer.Models;
using Pather.Servers.Utils;

namespace Pather.Servers.GameWorldServer
{
    public class GameWorldServer
    {
        private readonly IPubSub pubSub;
        private readonly IDatabaseQueries DatabaseQueries;
        private readonly IInstantiateLogic instantiateLogic;
        public GameWorld GameWorld;
        public BackEndTickManager BackEndTickManager;
        private GameWorldPubSub gameWorldPubSub;

        public GameWorldServer(IPubSub pubSub, IDatabaseQueries dbQueries, IInstantiateLogic instantiateLogic = null)
        {
            this.instantiateLogic = instantiateLogic;
            if (this.instantiateLogic == null)
            {
                this.instantiateLogic = new DefaultInstanitateLogic();
            }

            ServerLogger.InitLogger("GameWorld", "GameWorld");
            this.pubSub = pubSub;
            DatabaseQueries = dbQueries;
            pubSub.Init().Then(pubsubReady);
            //            new TickWatcher();
            Global.SetInterval(reorganize, Constants.TestReorganizeGameWorldInterval);
        }

        private void reorganize()
        {
            var now = DateTime.Now;


            Global.Console.Log("Start Reorganize");

            ReorganizeManager.Reorganize(GameWorld.Users.List, GameWorld.GameSegments.List, GameWorld.CreateGameSegment).Then(clusters =>
            {
                var count = 0;
                foreach (var playerCluster in clusters)
                {
                    foreach (var gameWorldUser in playerCluster.Players)
                    {
                        if (gameWorldUser.GameSegment != playerCluster.BestGameSegment)
                        {
                            count++;
                            GameWorld.ChangeUsersGameSegment(gameWorldUser, playerCluster.BestGameSegment);
                        }
                    }
                }
                Global.Console.Log("End Reorganize", (DateTime.Now - now) + "ms. Moving", count, "Users.");
            });
        }


        private void pubsubReady()
        {
            gameWorldPubSub = new GameWorldPubSub(pubSub);
            gameWorldPubSub.Init();
            gameWorldPubSub.Message += gameWorldMessage;

            BackEndTickManager = new BackEndTickManager();

            GameWorld = this.instantiateLogic.CreateGameWorld(gameWorldPubSub, BackEndTickManager);
            GameWorld.Init();
            BackEndTickManager.Init(sendPing, () =>
            {
                Global.Console.Log("Connected To Tick Server");

                Global.SetInterval(flushPreAddedUsers, 200);
            });
            BackEndTickManager.StartPing();
        }

        private void flushPreAddedUsers()
        {
            var count = 0;
            foreach (var preAddedUser in preAddedUsers)
            {
                if (preAddedUser.Value.Count == 0)
                {
                    continue;
                }

                var items = new List<Tuple<GameWorldUser, Deferred<GameWorldUser, UserJoinError>>>(preAddedUser.Value);

                count += items.Count;

                preAddedUser.Value.Clear();

                var gameSegment = items[0].Item1.GameSegment;


                gameSegment.AddUsersToSegment(items)
                    .Then((users) =>
                    {
                        if (users.Count == 0)
                        {
                            Global.Console.Log("No users to resolve adding to segment", items);

                            return;
                        }
                        var promises = GameWorld.GameSegments.List
                            .Where(seg => seg != gameSegment)
                            .SelectMany(seg => users.Select(user => seg.TellSegmentAboutUser(user.Item1)));

                        Q.All(promises)
                            .Then((gwUsers) =>
                            {
                                foreach (var u in users)
                                {
                                    GameWorld.Users.Add(u.Item1);
                                    u.Item2.Resolve(u.Item1);
                                }

                                Global.Console.Log(GameWorld.Users.Count, "Users total");

                                /*Global.Console.Log("",
                                     "Gameworld added user to game segment", gameSegment.GameSegmentId,
                                     "Total Players:", Users.Count,
                                     "Game Segment Players:", gameSegment.Users.Count);*/
                            });
                    });
            }
        }

        private void sendPing()
        {
            gameWorldPubSub.PublishToTickServer(new Ping_Tick_PubSub_Message()
            {
                Origin = PubSubChannels.GameWorld(),
                OriginType = Ping_Tick_PubSub_Message_OriginType.GameWorld
            });
        }

        private void gameWorldMessage(GameWorld_PubSub_Message message)
        {
            switch (message.Type)
            {
                case GameWorld_PubSub_MessageType.UserJoined:
                    UserJoined((UserJoined_Gateway_GameWorld_PubSub_Message)message).Then(gwUser =>
                    {
                        gameWorldPubSub.PublishToGatewayServer(gwUser.GatewayId, new UserJoined_GameWorld_Gateway_PubSub_Message()
                        {
                            X = gwUser.X,
                            Y = gwUser.Y,
                            GameSegmentId = gwUser.GameSegment.GameSegmentId,
                            UserId = gwUser.UserId,
                            Grid = GameWorld.Board.Grid,
                        });
                    });
                    break;
                case GameWorld_PubSub_MessageType.UserLeft:

                    var userLeftMessage = ((UserLeft_Gateway_GameWorld_PubSub_Message)message);

                    var done = false;
                    foreach (var preAddedUser in preAddedUsers)
                    {
                        foreach (var addedUser in preAddedUser.Value)
                        {
                            if (addedUser.Item1.UserId == userLeftMessage.UserId)
                            {
                                preAddedUser.Value.Remove(addedUser);
                                addedUser.Item1.GameSegment.RemovePreAddedUserToSegment(addedUser.Item1);
                                done = true;
                                break;
                            }
                        }
                        if (done) break;
                    }

                    UserLeft(userLeftMessage).Then(() =>
                    {
                        //todo idk
                    });
                    break;
                case GameWorld_PubSub_MessageType.Pong:
                    var pongMessage = (Pong_Tick_GameWorld_PubSub_Message)message;
                    BackEndTickManager.OnPongReceived();
                    break;
                case GameWorld_PubSub_MessageType.TickSync:
                    var tickSyncMessage = (TickSync_Tick_GameWorld_PubSub_Message)message;
                    BackEndTickManager.SetLockStepTick(tickSyncMessage.LockstepTickNumber);
                    break;
                case GameWorld_PubSub_MessageType.GameWorldAction:
                    var gameWorldAction = (GameWorldAction_GameSegment_GameWorld_PubSub_Message)message;
                    GameWorld.GameWorldAction(gameWorldAction);
                    break;
                case GameWorld_PubSub_MessageType.InitializeGameSegment:
                    var getAllGameSegments = ((InitializeGameSegment_GameSegment_GameWorld_PubSub_ReqRes_Message)message);
                    var initializeGameSegmentMessage = new InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message()
                    {
                        MessageId = getAllGameSegments.MessageId,
                        GameSegmentIds = GameWorld.GameSegments.Keys,
                        LockstepTickNumber = BackEndTickManager.LockstepTickNumber,
                        ServerLatency = BackEndTickManager.CurrentServerLatency,
                        Grid = GameWorld.Board.Grid,
                        AllUsers = GameWorld.Users.List.Select(user => new InitialGameUser()
                        {
                            GameSegmentId = user.GameSegment.GameSegmentId,
                            UserId = user.UserId,
                            GatewayId = user.GatewayId,
                            X = user.X,
                            Y = user.Y,
                        })
                    };
                    Global.Console.Log("Initalized");
                    gameWorldPubSub.PublishToGameSegment(getAllGameSegments.OriginGameSegment, initializeGameSegmentMessage);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }


        private readonly JsDictionary<string, List<Tuple<GameWorldUser, Deferred<GameWorldUser, UserJoinError>>>> preAddedUsers = new JsDictionary<string, List<Tuple<GameWorldUser, Deferred<GameWorldUser, UserJoinError>>>>();
        private readonly List<Tuple<UserJoined_Gateway_GameWorld_PubSub_Message, Deferred<GameWorldUser, UserJoinError>>> stalledJoins = new List<Tuple<UserJoined_Gateway_GameWorld_PubSub_Message, Deferred<GameWorldUser, UserJoinError>>>();

        private bool joining = false;

        private Promise<GameWorldUser, UserJoinError> UserJoined(UserJoined_Gateway_GameWorld_PubSub_Message message)
        {
            var deferred = Q.Defer<GameWorldUser, UserJoinError>();
            //                Global.Console.Log("User Joined Game World", message.UserToken, message.GatewayId);
            //            Global.Console.Log("User trying to join");
            if (!joining)
            {
                joining = true;
                DatabaseQueries.GetUserByToken(message.UserToken)
                    .Then(dbUser =>
                    {
                        GameWorld.CreateUser(message.GatewayId, dbUser).Then(user =>
                        {
                            if (!preAddedUsers.ContainsKey(user.GameSegment.GameSegmentId))
                            {
                                preAddedUsers[user.GameSegment.GameSegmentId] = new List<Tuple<GameWorldUser, Deferred<GameWorldUser, UserJoinError>>>();
                            }
                            preAddedUsers[user.GameSegment.GameSegmentId].Add(Tuple.Create(user, deferred));

                            joining = false;
                            if (stalledJoins.Count > 0)
                            {
                                var stalledJoin = stalledJoins[0];
                                stalledJoins.RemoveAt(0);
                                UserJoined(stalledJoin.Item1).PassThrough(stalledJoin.Item2.Promise);
                            }
                        });
                        //TODO THEN ADD USER TO TABLE OSMETHING IDK
                    });
            }
            else
            {
                stalledJoins.Add(Tuple.Create(message, deferred));
            }

            return deferred.Promise;
        }


        private Promise UserLeft(UserLeft_Gateway_GameWorld_PubSub_Message message)
        {
            var deferred = Q.Defer();

            //todo REMOVE USER FROM TABLE IDK

            DatabaseQueries.GetUserByToken(message.UserId).Then(dbUser =>
            {
                GameWorld.UserLeft(dbUser).PassThrough(deferred.Promise);

                //TODO THEN ADD USER TO TABLE OSMETHING IDK
            });
            return deferred.Promise;
        }
    }
}