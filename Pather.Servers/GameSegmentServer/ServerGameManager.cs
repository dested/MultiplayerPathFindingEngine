using System;
using System.Collections.Generic;
using Pather.Common.GameFramework;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common.Actions.ClientActions.Base;
using Pather.Common.Models.Common.Actions.GameWorldAction.Base;
using Pather.Common.Models.Common.Actions.NeighborGameSegmentAction.Base;
using Pather.Common.Models.Common.Actions.TellGameSegmentAction.Base;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameSegment.Base;
using Pather.Common.Models.GameWorld.GameSegment;
using Pather.Common.Models.GameWorld.Gateway;
using Pather.Common.Models.Gateway.PubSub;
using Pather.Common.Models.Gateway.PubSub.Base;
using Pather.Common.Models.Tick;
using Pather.Common.Utils;
using Pather.Servers.Common;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.ServerLogging;
using Pather.Servers.Utils;

namespace Pather.Servers.GameSegmentServer
{
    public class ServerGameManager
    {
        public GameSegment MyGameSegment;
        private readonly GameSegmentPubSub GameSegmentPubSub;
        private readonly BackEndTickManager backEndTickManager;
        private readonly ServerGame serverGame;
        public string GameSegmentId;
        public DictionaryList<string, GameSegment> AllGameSegments;

        public Action OnReady;
        public Action RegisterGameSegmentWithCluster;

        public ServerLogger ServerLogger;

        public ServerGameManager(string gameSegmentId, GameSegmentPubSub gameSegmentPubSub, IInstantiateLogic instantiateLogic,ServerLogger serverLogger)
        {
            this.ServerLogger = serverLogger;
            GameSegmentId = gameSegmentId;
            GameSegmentPubSub = gameSegmentPubSub;
            AllGameSegments = new DictionaryList<string, GameSegment>(a => a.GameSegmentId);
            backEndTickManager = new BackEndTickManager(serverLogger);

            serverGame = instantiateLogic.CreateServerGame(this, backEndTickManager);
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
                (new InitializeGameSegment_GameSegment_GameWorld_PubSub_ReqRes_Message()
                {
                    OriginGameSegment = GameSegmentId
                })
                .Then(initializeGameSegment);
        }

        private void initializeGameSegment(InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            serverGame.ActiveEntities.Clear();
            AllGameSegments.Clear();

            serverGame.Init(message.LockstepTickNumber, message.ServerLatency);
            serverGame.InitializeGameBoard(message.Grid);
            MyGameSegment = new GameSegment(GameSegmentId, ServerLogger);
            AllGameSegments.Add(MyGameSegment);

            foreach (var gameSegmentId in message.GameSegmentIds)
            {
                AllGameSegments.Add(new GameSegment(gameSegmentId, ServerLogger));
            }

            foreach (var initialGameUser in message.AllUsers)
            {
                
                var user = (ServerGameUser)serverGame.CreateGameUser(initialGameUser.UserId);
                user.GameSegment = AllGameSegments[initialGameUser.GameSegmentId];
                user.GatewayId = initialGameUser.GatewayId;
                user.X = initialGameUser.X;
                user.Y = initialGameUser.Y;

                serverGame.AddEntity(user);
                user.GameSegment.UserJoin(user);
            }

            serverGame.Init();

            RegisterGameSegmentWithCluster();
            ServerLogger.LogInformation( "Game Segment Initialized");
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

        public void SendAction(ServerGameUser user, ClientAction clientAction, TellGameSegmentAction tellGameSegmentAction, NeighborGameSegmentAction neighborGameSegmentAction, GameWorldAction gameWorldAction)
        {
            var otherGameSegments = new JsDictionary<string, GameSegment>();
            var gateways = user.Neighbors.List.GroupBy(a => ((ServerGameUser) a.Entity).GatewayId);
            //todo maybe move this dict to a real object
            if (!gateways.ContainsKey(user.GatewayId))
            {
                gateways[user.GatewayId] = new List<GameEntityNeighbor>();
            }
            gateways[user.GatewayId].Add(new GameEntityNeighbor(user, 0));

            var neighborGameSegments = user.Neighbors.List.GroupBy(a => ((ServerGameUser) a.Entity).GameSegment);

            neighborGameSegments.Remove(MyGameSegment);
            foreach (var otherGameSegment in AllGameSegments.List)
            {
                if (!neighborGameSegments.ContainsKey(otherGameSegment) && otherGameSegment.GameSegmentId != GameSegmentId)
                {
                    otherGameSegments[otherGameSegment.GameSegmentId] = otherGameSegment;
                }
            }

            foreach (var gateway in gateways)
            {
                var clientActionCollection = new ClientActionCollection_GameSegment_Gateway_PubSub_Message()
                {
                    Users = gateway.Value.Select(a => a.Entity.EntityId),
                    ClientAction = clientAction
                };
                GameSegmentPubSub.PublishToGateway(gateway.Key, clientActionCollection);
            }


            foreach (var neighborGameSegment in neighborGameSegments)
            {
                GameSegmentPubSub.PublishToGameSegment(neighborGameSegment.Key.GameSegmentId, new NeighborGameSegmentAction_GameSegment_GameSegment_PubSub_Message()
                {
                    UserId = user.EntityId,
                    OriginatingGameSegmentId = GameSegmentId,
                    Action = neighborGameSegmentAction
                });
            }

            var tellGameSegmentActionMessage = new TellGameSegmentAction_GameSegment_GameSegment_PubSub_Message()
            {
                UserId = user.EntityId,
                OriginatingGameSegmentId = GameSegmentId,
                Action = tellGameSegmentAction
            };

            foreach (var otherGameSegment in otherGameSegments)
            {
                GameSegmentPubSub.PublishToGameSegment(otherGameSegment.Key, tellGameSegmentActionMessage);
            }


            SendToGameWorld(gameWorldAction);
        }


        private void onMessage(GameSegment_PubSub_Message message)
        {
            switch (message.Type)
            {
                case GameSegment_PubSub_MessageType.UserJoin:
                    onMessageUserJoin((UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message) message);
                    break;
                case GameSegment_PubSub_MessageType.TellUserJoin:
                    onMessageTellUserJoin((TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message) message);
                    break;
                case GameSegment_PubSub_MessageType.TellUserLeft:
                    onMessageTellUserLeft((TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message) message);
                    break;
                case GameSegment_PubSub_MessageType.UserLeft:
                    onMessageUserLeft((UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message) message);
                    break;
                case GameSegment_PubSub_MessageType.NewGameSegment:
                    onMessageNewGameSegment((NewGameSegment_GameWorld_GameSegment_PubSub_Message) message);
                    break;
                case GameSegment_PubSub_MessageType.Pong:
                    onMessagePong((Pong_Tick_GameSegment_PubSub_Message) message);
                    break;
                case GameSegment_PubSub_MessageType.GameSegmentAction:
                    onMessageGameSegmentAction((GameSegmentAction_Gateway_GameSegment_PubSub_Message) message);
                    break;
                case GameSegment_PubSub_MessageType.NeighborGameSegmentAction:
                    onMessageNeighborGameSegmentAction((NeighborGameSegmentAction_GameSegment_GameSegment_PubSub_Message) message);
                    break;
                case GameSegment_PubSub_MessageType.TellGameSegmentAction:
                    onMessageTellGameSegmentAction((TellGameSegmentAction_GameSegment_GameSegment_PubSub_Message) message);
                    break;
                case GameSegment_PubSub_MessageType.ReorganizeGameSegment:
                    onMessageReorganizeGameSegment((ReorganizeUser_GameWorld_GameSegment_PubSub_Message) message);
                    break;
                case GameSegment_PubSub_MessageType.TransferGameUser:
                    onMessageTransferGameUser((TransferUser_GameSegment_GameSegment_PubSub_Message) message);
                    break;
                case GameSegment_PubSub_MessageType.TellTransferUser:
                    onMessageTellTransferUser((TellTransferUser_GameSegment_GameSegment_PubSub_Message) message);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private void onMessageTransferGameUser(TransferUser_GameSegment_GameSegment_PubSub_Message message)
        {
            ServerLogger.LogInformation("Transfered users",message.UserId);
            var user = ((ServerGameUser) serverGame.ActiveEntities[message.UserId]);
            user.GameSegment.UserLeft(user.EntityId);
            MyGameSegment.UserJoin(user);
        }

        private void onMessageTellTransferUser(TellTransferUser_GameSegment_GameSegment_PubSub_Message message)
        {
            ((ServerGameUser) serverGame.ActiveEntities[message.UserId]).GameSegment = AllGameSegments[message.NewGameSegmentId];
        }

        private void onMessageReorganizeGameSegment(ReorganizeUser_GameWorld_GameSegment_PubSub_Message message)
        {
            ServerLogger.LogInformation("Reorganizing user:", message.UserId, message.SwitchAtLockstepNumber);

            foreach (var gameSegment in AllGameSegments.List)
            {
                if (gameSegment.GameSegmentId != MyGameSegment.GameSegmentId && gameSegment.GameSegmentId != message.NewGameSegmentId)
                {
                    GameSegmentPubSub.PublishToGameSegment(gameSegment.GameSegmentId, new TellTransferUser_GameSegment_GameSegment_PubSub_Message()
                    {
                        NewGameSegmentId = message.NewGameSegmentId,
                        UserId = message.UserId
                    });
                }
            }

            var user = (ServerGameUser) serverGame.ActiveEntities[message.UserId];


            GameSegmentPubSub.PublishToGameSegment(message.NewGameSegmentId, new TransferUser_GameSegment_GameSegment_PubSub_Message()
            {
                UserId = user.EntityId,
                InProgressActions = user.InProgressActions,
                LockstepMovePoints = user.LockstepMovePoints,
                SwitchAtLockstepNumber = message.SwitchAtLockstepNumber
            });

            var newGameSegment = AllGameSegments[message.NewGameSegmentId];

            user.GameSegment = newGameSegment;
            MyGameSegment.UserLeft(message.UserId);
            newGameSegment.UserJoin(user);
        }

        private void onMessageGameSegmentAction(GameSegmentAction_Gateway_GameSegment_PubSub_Message message)
        {
            if (!MyGameSegment.Users.Contains(message.UserId))
            {
                ServerLogger.LogError("This aint my user! " + message.UserId);
                return;
            }

            serverGame.ServerProcessGameSegmentAction(MyGameSegment.Users[message.UserId], message.Action);
        }

        private void onMessageNeighborGameSegmentAction(NeighborGameSegmentAction_GameSegment_GameSegment_PubSub_Message message)
        {
            serverGame.ServerProcessNeighborGameSegmentAction(message.Action);
        }

        private void onMessageTellGameSegmentAction(TellGameSegmentAction_GameSegment_GameSegment_PubSub_Message message)
        {
            serverGame.ServerProcessTellGameSegmentAction(message.Action);
        }

        private void onMessageNewGameSegment(NewGameSegment_GameWorld_GameSegment_PubSub_Message message)
        {
            var newGameSegment = new GameSegment(message.GameSegmentId, ServerLogger);
            AllGameSegments.Add(newGameSegment);
            ServerLogger.LogInformation(" Added new Game Segment ", message.GameSegmentId);
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

        public void SendToGameWorld(GameWorldAction gameWorldAction)
        {
            GameSegmentPubSub.PublishToGameWorld(new GameWorldAction_GameSegment_GameWorld_PubSub_Message()
            {
                OriginatingGameSegmentId = GameSegmentId,
                Action = gameWorldAction
            });
        }
    }
}