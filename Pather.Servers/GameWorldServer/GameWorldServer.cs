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
        private GameWorldPubSub gameSegmentClusterPubSub;

        public GameWorldServer(IPubSub pubSub, IDatabaseQueries dbQueries)
        {
            ServerLogger.InitLogger("GameWorld", "GameWorld");
            this.pubSub = pubSub;
            DatabaseQueries = dbQueries;
            pubSub.Init().Then(pubsubReady);
        }


        private void pubsubReady()
        {
            gameSegmentClusterPubSub = new GameWorldPubSub(pubSub);
            gameSegmentClusterPubSub.Init();
            gameSegmentClusterPubSub.Message += gameWorldMessage;

            GameWorld = new GameWorld(gameSegmentClusterPubSub);


            ClientTickManager = new ClientTickManager();
            ClientTickManager.Init(sendPing, () =>
            {
                Global.Console.Log("Connected To Tick Server");
            });
            ClientTickManager.StartPing();
        }

        private void sendPing()
        {
            gameSegmentClusterPubSub.PublishToTickServer(new Ping_Tick_PubSub_Message()
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
                        gameSegmentClusterPubSub.PublishToGatewayServer(PubSubChannels.Gateway(gwUser.GatewayId), new UserJoined_GameWorld_Gateway_PubSub_Message()
                        {
                            GameSegmentId = gwUser.GameSegment.GameSegmentId,
                            UserId = gwUser.UserId,
                        });
                    });
                    break;
                case GameWorld_PubSub_MessageType.UserLeft:
                    UserLeft((UserLeft_Gateway_GameWorld_PubSub_Message)message).Then(() =>
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
                case GameWorld_PubSub_MessageType.CreateGameSegmentResponse:
                    break;
                case GameWorld_PubSub_MessageType.UserJoinResponse:
                    break;
                case GameWorld_PubSub_MessageType.TellUserJoinResponse:
                    break;
                case GameWorld_PubSub_MessageType.TellUserLeftResponse:
                    break;
                case GameWorld_PubSub_MessageType.InitializeGameSegment:
                    var getAllGameSegments= ((InitializeGameSegment_GameSegment_GameWorld_PubSub_ReqRes_Message)message);
                    gameSegmentClusterPubSub.PublishToGameSegment(getAllGameSegments.OriginGameSegment,
                        new InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message()
                        {
                            MessageId=getAllGameSegments.MessageId,
                            GameSegmentIds = GameWorld.GameSegments.Select(a=>a.GameSegmentId),
                            AllUsers = GameWorld.Users.Select(user =>
                            {
                                Global.Console.Log("Sending out initial to", getAllGameSegments.OriginGameSegment, user.UserId, user.GatewayId);


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

        private readonly List<Tuple<UserJoined_Gateway_GameWorld_PubSub_Message, Promise<GameWorldUser, UserJoinError>>>
            usersWaitingToJoin = new List<Tuple<UserJoined_Gateway_GameWorld_PubSub_Message, Promise<GameWorldUser, UserJoinError>>>();

        private bool currentlyJoiningUser = false;

        private Promise<GameWorldUser, UserJoinError> UserJoined(UserJoined_Gateway_GameWorld_PubSub_Message message)
        {
            var deferred = Q.Defer<GameWorldUser, UserJoinError>();
            var waitingToJoinMessage = new Tuple<UserJoined_Gateway_GameWorld_PubSub_Message, Promise<GameWorldUser, UserJoinError>>(message, deferred.Promise);
            if (!currentlyJoiningUser)
            {
                currentlyJoiningUser = true;

                Global.Console.Log("User Joined Game World", message.UserToken, message.GatewayId);
                DatabaseQueries.GetUserByToken(message.UserToken)
                    .Then(dbUser =>
                    {
                        GameWorld.UserJoined(message.GatewayId, dbUser).PassThrough(deferred.Promise).Finally(QueueNextJoiningUser);
                        //TODO THEN ADD USER TO TABLE OSMETHING IDK
                    });
            }
            else
            {
                Global.Console.Log("Adding user to pending");
                usersWaitingToJoin.Add(waitingToJoinMessage);
            }

            return deferred.Promise;
        }

        private void QueueNextJoiningUser()
        {
            currentlyJoiningUser = false;
            if (usersWaitingToJoin.Count > 0)
            {
                var nextUserWaitingToJoin = usersWaitingToJoin[0];
                usersWaitingToJoin.Remove(nextUserWaitingToJoin);
                Global.Console.Log("Joining next user", usersWaitingToJoin.Count, "still waiting");
                UserJoined(nextUserWaitingToJoin.Item1).PassThrough(nextUserWaitingToJoin.Item2);
            }
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