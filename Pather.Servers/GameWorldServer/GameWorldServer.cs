using System;
using System.Collections.Generic;
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

namespace Pather.Servers.GameWorldServer
{
    public class GameWorldServer
    {
        private readonly IPubSub pubSub;
        private readonly IDatabaseQueries DatabaseQueries;
        public GameWorld GameWorld;
        public ClientTickManager ClientTickManager;
        private GameWorldPubSub gameWorldPubSub;

        public GameWorldServer(IPubSub pubSub, IDatabaseQueries dbQueries)
        {
            ServerLogger.InitLogger("GameWorld", "GameWorld");
            this.pubSub = pubSub;
            DatabaseQueries = dbQueries;
            pubSub.Init().Then(pubsubReady);
            //            new TickWatcher();
            Global.SetInterval(reorganize, 60*1000);
        }

        private void reorganize()
        {

            var clusters = ReorganizeManager.Reorganize(GameWorld.Users, GameWorld.GameSegments);
            foreach (var playerCluster in clusters)
            {
                foreach (var gameWorldUser in playerCluster.Players)
                {
                    GameWorld.ChangeUsersGameSegment(gameWorldUser, playerCluster.BestGameSegment);
                }
            }

        }


        private void pubsubReady()
        {
            gameWorldPubSub = new GameWorldPubSub(pubSub);
            gameWorldPubSub.Init();
            gameWorldPubSub.Message += gameWorldMessage;

            GameWorld = new GameWorld(gameWorldPubSub);


            ClientTickManager = new ClientTickManager();
            ClientTickManager.Init(sendPing, () =>
            {
                Global.Console.Log("Connected To Tick Server");

                Global.SetInterval(flushPreAddedUsers, 200);

            });
            ClientTickManager.StartPing();
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

                var items = new List<Tuple<Models.GameWorldUser, Deferred<Models.GameWorldUser, UserJoinError>>>(preAddedUser.Value);

                count += items.Count;

                preAddedUser.Value.Clear();

                var gameSegment = items[0].Item1.GameSegment;


                gameSegment.AddUsersToSegment(items)
                     .Then((users) =>
                     {
                         if (users.Count == 0)
                         {
                             Global.Console.Log("No users to resolve adding to segment",items);

                             return;
                         }
                         var promises = GameWorld.GameSegments
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

                                 Global.Console.Log(GameWorld.Users.Count,"Users total");
                                  
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

        /*   when a user gets Action succesful join, he should get his xy, and can send an updated xy to the Game server
            send the data to neighbors
                update neighbors preiodically
            then handle the path finding aspect

        then maybe reorg?
*/

        private void gameWorldMessage(GameWorld_PubSub_Message message)
        {
            switch (message.Type)
            {
                case GameWorld_PubSub_MessageType.UserJoined:
                    UserJoined((UserJoined_Gateway_GameWorld_PubSub_Message)message).Then(gwUser =>
                    {
                        gameWorldPubSub.PublishToGatewayServer(PubSubChannels.Gateway(gwUser.GatewayId), new UserJoined_GameWorld_Gateway_PubSub_Message()
                        {
                            GameSegmentId = gwUser.GameSegment.GameSegmentId,
                            UserId = gwUser.UserId,
                        });
                    });
                    break;
                case GameWorld_PubSub_MessageType.UserLeft:

                    var userLeftMessage = ((UserLeft_Gateway_GameWorld_PubSub_Message)message);

                    bool done = false;
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
                    ClientTickManager.OnPongReceived();
                    break;
                case GameWorld_PubSub_MessageType.TickSync:
                    var tickSyncMessage = (TickSync_Tick_GameWorld_PubSub_Message)message;
                    ClientTickManager.SetLockStepTick(tickSyncMessage.LockstepTickNumber);
                    break;
                case GameWorld_PubSub_MessageType.TellUserMoved:
                    var tellUserMoved = (TellUserMoved_GameSegment_GameWorld_PubSub_Message)message;
                    GameWorld.UserMoved(tellUserMoved.UserId, tellUserMoved.X, tellUserMoved.Y, tellUserMoved.LockstepTick);
                    break;
                case GameWorld_PubSub_MessageType.InitializeGameSegment:
                    var getAllGameSegments = ((InitializeGameSegment_GameSegment_GameWorld_PubSub_ReqRes_Message)message);
                    gameWorldPubSub.PublishToGameSegment(getAllGameSegments.OriginGameSegment,
                        new InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message()
                        {
                            MessageId = getAllGameSegments.MessageId,
                            GameSegmentIds = GameWorld.GameSegments.Select(a => a.GameSegmentId),
                            AllUsers = GameWorld.Users.Select(user =>
                            {
                                //                                Global.Console.Log("Sending out initial to", getAllGameSegments.OriginGameSegment, user.UserId, user.GatewayId);
                                return new InitialGameUser()
                                {
                                    GameSegmentId = user.GameSegment.GameSegmentId,
                                    UserId = user.UserId,
                                    GatewayId = user.GatewayId,
                                    X = user.X,
                                    Y = user.Y,
                                };
                            })
                        });
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private JsDictionary<string, List<Tuple<Models.GameWorldUser, Deferred<Models.GameWorldUser, UserJoinError>>>> preAddedUsers = new JsDictionary<string, List<Tuple<Models.GameWorldUser, Deferred<Models.GameWorldUser, UserJoinError>>>>();
        private List<Tuple<UserJoined_Gateway_GameWorld_PubSub_Message, Deferred<Models.GameWorldUser, UserJoinError>>> stalledJoins = new List<Tuple<UserJoined_Gateway_GameWorld_PubSub_Message, Deferred<Models.GameWorldUser, UserJoinError>>>();

        private bool joining = false;
        private Promise<Models.GameWorldUser, UserJoinError> UserJoined(UserJoined_Gateway_GameWorld_PubSub_Message message)
        {
            var deferred = Q.Defer<Models.GameWorldUser, UserJoinError>();
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
                            if (!Script.Reinterpret<bool>(preAddedUsers[user.GameSegment.GameSegmentId]))
                            {
                                preAddedUsers[user.GameSegment.GameSegmentId] = new List<Tuple<Models.GameWorldUser, Deferred<Models.GameWorldUser, UserJoinError>>>();
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
                Global.Console.Log(GameWorld.Users.Count, "Users total");
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