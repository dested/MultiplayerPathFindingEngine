using System;
using System.Collections.Generic;
using Pather.Common.GameFramework;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common.UserActions;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameSegment.Base;
using Pather.Common.Models.GameWorld.GameSegment;
using Pather.Common.Models.GameWorld.Gateway;
using Pather.Common.Models.Gateway.PubSub;
using Pather.Common.Models.Gateway.PubSub.Base;
using Pather.Common.Models.Gateway.Socket.Base;
using Pather.Common.Models.Tick;
using Pather.Common.Utils;
using Pather.Servers.Common;
using Pather.Servers.Common.PubSub;

namespace Pather.Servers.GameSegmentServer
{
    public class ServerGameManager
    {
        public GameSegment MyGameSegment;
        private GameSegmentPubSub GameSegmentPubSub;
        private BackEndTickManager backEndTickManager;
        private ServerGame serverGame;
        public string GameSegmentId;
        public JsDictionary<string, GameSegment> AllGameSegments;

        public Action OnReady;
        public Action RegisterGameSegmentWithCluster;

        public ServerGameManager(string gameSegmentId, GameSegmentPubSub gameSegmentPubSub)
        {
            GameSegmentId = gameSegmentId;
            GameSegmentPubSub = gameSegmentPubSub;
            AllGameSegments = new JsDictionary<string, GameSegment>();
            backEndTickManager = new BackEndTickManager();

            serverGame = new ServerGame(this, backEndTickManager);
        }

        public void Init()
        {
            GameSegmentPubSub.OnMessage += onMessage;
            GameSegmentPubSub.Init().Then(() =>
            {
                backEndTickManager.Init(sendPing, tickManagerReady);
                backEndTickManager.StartPing();
            });
        }
         
        private void tickManagerReady()
        {
            GameSegmentPubSub
                .PublishToGameWorldWithCallback<InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message>
                (new InitializeGameSegment_GameSegment_GameWorld_PubSub_ReqRes_Message(){OriginGameSegment = GameSegmentId})
                .Then(initializeGameSegment);
        }

        private void initializeGameSegment(InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            serverGame.ActiveEntities.Clear();
            AllGameSegments.Clear();

            serverGame.Init(message.Grid, message.LockstepTickNumber, message.ServerLatency);

            MyGameSegment = new GameSegment(GameSegmentId);
            AllGameSegments[MyGameSegment.GameSegmentId] = MyGameSegment;

            foreach (var gameSegmentId in message.GameSegmentIds)
            {
                AllGameSegments[gameSegmentId] = new GameSegment(gameSegmentId);
            }

            foreach (var initialGameUser in message.AllUsers)
            {
                var user = new ServerGameUser(serverGame, initialGameUser.UserId)
                {
                    GameSegment = AllGameSegments[initialGameUser.GameSegmentId],
                    GatewayId = initialGameUser.GatewayId,
                    X = initialGameUser.X,
                    Y = initialGameUser.Y,
                };

                serverGame.AddEntity(user);
                user.GameSegment.UserJoin(user);
            }

            serverGame.Init();

            RegisterGameSegmentWithCluster();
            Global.Console.Log(GameSegmentId, "Game Segment Initialized");
        }


        private void onMessage(GameSegment_PubSub_Message message)
        {
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
                    OnMessageUserAction((TellUserAction_GameSegment_GameSegment_PubSub_Message)message);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private void sendPing()
        {
            GameSegmentPubSub.PublishToTickServer(new Ping_Tick_PubSub_Message()
            {
                Origin = PubSubChannels.GameSegment(GameSegmentId),
                OriginType = Ping_Tick_PubSub_Message_OriginType.GameSegment
            });
        }

        /*
         Find all neighbors
         * find their gateways
         * find their gamesegments
         * find all gamesegments theyre NOT in
         group send to each gateway
         send ACTION to each neighbor gamesegment
         send TELL_ACTION to each other gamesegment
         send to world
         */
        public void SendAction(ServerGameUser user, UserAction userAction)
        {
            var otherGameSegments = new JsDictionary<string, GameSegment>();
            var gateways = user.Neighbors.List.GroupBy(a => ((ServerGameUser)a.Entity).GatewayId);
            //todo maybe move this dict to a real object
            if (!gateways.ContainsKey(user.GatewayId))
            {
                gateways[user.GatewayId] = new List<GameEntityNeighbor>();
            }
            gateways[user.GatewayId].Add(new GameEntityNeighbor(user, 0));

            var neighborGameSegments = user.Neighbors.List.GroupBy(a => ((ServerGameUser)a.Entity).GameSegment);

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
                    Users = gateway.Value.Select(a => a.Entity.EntityId),
                    Action = userAction
                };
                GameSegmentPubSub.PublishToGateway(gateway.Key, userActionCollection);
            }

            var tellUserAction = new TellUserAction_GameSegment_GameSegment_PubSub_Message()
            {
                UserId = user.EntityId,
                OriginatingGameSegmentId = GameSegmentId,
                Action = userAction
            };



            foreach (var neighborGameSegment in neighborGameSegments)
            {
                GameSegmentPubSub.PublishToGameSegment(neighborGameSegment.Key.GameSegmentId, new UserAction_GameSegment_GameSegment_PubSub_Message()
                {
                    UserId = user.EntityId,
                    OriginatingGameSegmentId = GameSegmentId,
                    Action = userAction
                });
            }

            foreach (var otherGameSegment in otherGameSegments)
            {
                GameSegmentPubSub.PublishToGameSegment(otherGameSegment.Key, tellUserAction);
            }


            GameSegmentPubSub.PublishToGameWorld(new TellUserAction_GameSegment_GameWorld_PubSub_Message()
            {
                UserId = user.EntityId,
                OriginatingGameSegmentId = GameSegmentId,
                Action = userAction
            });


        }

        private void OnMessageUserAction(UserAction_Gateway_GameSegment_PubSub_Message message)
        {
            if (!MyGameSegment.Users.ContainsKey(message.UserId))
            {
                throw new Exception("This aint my user! " + message.UserId);
            }

            serverGame.QueueUserAction(MyGameSegment.Users[message.UserId], message.Action);
        }
        private void OnMessageUserAction(UserAction_GameSegment_GameSegment_PubSub_Message message)
        {
            if (!MyGameSegment.Users.ContainsKey(message.UserId))
            {
                throw new Exception("This aint my user! " + message.UserId);
            }

            serverGame.QueueUserActionFromNeighbor( message.Action);
        }
        private void OnMessageUserAction(TellUserAction_GameSegment_GameSegment_PubSub_Message message)
        {
            if (!MyGameSegment.Users.ContainsKey(message.UserId))
            {
                throw new Exception("This aint my user! " + message.UserId);
            }

            serverGame.QueueTellUserAction( message.Action);
        }

        public void OnMessageNewGameSegment(NewGameSegment_GameWorld_GameSegment_PubSub_Message message)
        {
            var newGameSegment = new GameSegment(message.GameSegmentId);
            AllGameSegments[newGameSegment.GameSegmentId] = newGameSegment;
            Global.Console.Log(GameSegmentId, " Added new Game Segment ", message.GameSegmentId);
        }


        private void onMessagePong(Pong_Tick_GameSegment_PubSub_Message message)
        {
            backEndTickManager.OnPongReceived();
        }

        private void onMessageUserLeft(UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            serverGame.UserLeft(message.UserId);
            GameSegmentPubSub.PublishToGameWorld(new UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
            {
                MessageId = message.MessageId
            });
        }

        private void onMessageTellUserLeft(TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            serverGame.UserLeft(message.UserId);
            //todo maybe shoudlnt be reqres
            GameSegmentPubSub.PublishToGameWorld(new TellUserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
            {
                MessageId = message.MessageId
            });
        }

        private void onMessageTellUserJoin(TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            serverGame.TellUserJoin(message);
            GameSegmentPubSub.PublishToGameWorld(new TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
            {
                MessageId = message.MessageId
            });
        }


        private void onMessageUserJoin(UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            foreach (var userJoinGameUser in message.Collection)
            {
                serverGame.UserJoin(userJoinGameUser);
                //                GameSegmentLogger.LogUserJoin(true, serverGameUser.UserId, serverGameUser.X, serverGameUser.Y, serverGameUser.Neighbors.Keys);
            }

            GameSegmentPubSub.PublishToGameWorld(new UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
            {
                MessageId = message.MessageId
            });
        }


        public void SetLockStepTick(long lockstepTickNumber)
        {
            backEndTickManager.SetLockStepTick(lockstepTickNumber);
        }

        public void SendToUser(ServerGameUser serverGameUser, Gateway_PubSub_Message gatewayPubSubMessage)
        {
            GameSegmentPubSub.PublishToGateway(serverGameUser.GatewayId, gatewayPubSubMessage);
        }
    }
}