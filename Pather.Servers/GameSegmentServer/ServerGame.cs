using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.GameFramework;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common;
using Pather.Common.Models.Common.UserActions;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameSegment.Base;
using Pather.Common.Models.GameWorld.GameSegment;
using Pather.Common.Models.GameWorld.Gateway;
using Pather.Common.Models.Gateway.PubSub;
using Pather.Common.Models.Gateway.Socket.Base;
using Pather.Common.Models.Tick;
using Pather.Common.Utils;
using Pather.Servers.Common;
using Pather.Servers.Common.PubSub;
using Pather.Servers.GameSegmentServer.Logger;

namespace Pather.Servers.GameSegmentServer
{
    public class ServerGame : Game
    {
        public ServerGameManager GameManager { get; set; }
        public TickManager tickManager;
        private GameBoard board;
        private ServerGameManager gameManager;

        public ServerGame(ServerGameManager gameManager, TickManager tickManager)
            : base(tickManager)
        {
            GameManager = gameManager;
            this.tickManager = tickManager;
            StepManager = new StepManager(this);
            tickManager.OnProcessLockstep += StepManager.ProcessAction;
        }



        public void Init(int[][] grid)
        {

            Board = new GameBoard();
            Board.Init(grid);
        }

        public void QueueUserAction(ServerGameUser user, UserAction action)
        {
            action.EntityId = user.EntityId;

            StepManager.QueueUserAction(action);
            switch (action.UserActionType)
            {
                case UserActionType.Move:
                    var moveAction = (MoveEntityAction)action;
                    gameManager.SendAction(user, new MoveEntityAction()
                        {
                            X = moveAction.X,
                            Y = moveAction.Y,
                            EntityId = moveAction.EntityId,
                            LockstepTick = moveAction.LockstepTick
                        });
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

        }

        public void ProcessUserAction(ServerGameUser user, UserAction action)
        {
            switch (action.UserActionType)
            {
                case UserActionType.Move:
                    var moveAction = (MoveEntityAction)action;
                    user.X = moveAction.X;
                    user.Y = moveAction.Y;
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
        public void TellUserAction(ServerGameUser user, UserAction action)
        {
            switch (action.UserActionType)
            {
                case UserActionType.Move:
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public void ProcessUserActionFromNeighbor(ServerGameUser gameSegmentUser, UserAction action)
        {
            switch (action.UserActionType)
            {
                case UserActionType.Move:
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public void AddUser(ServerGameUser user)
        {
            ActiveEntities.Add(user);
        }

        public void UserLeft(string userId)
        {

            var user = (ServerGameUser)ActiveEntities[userId];
            //todo remove user ina  method or something
            var removed = new List<string>()
            {
                userId
            };

            foreach (var gameSegmentNeighbor in user.Neighbors.List)
            {
                var serverGameUser = ((ServerGameUser)gameSegmentNeighbor.Entity);



                var neighbors = serverGameUser.Neighbors;
                foreach (var segmentNeighbor in neighbors.List)
                {
                    if (segmentNeighbor.Entity == user)
                    {
                        neighbors.Remove(segmentNeighbor);
                        break;
                    }
                }


                gameManager.GameSegmentPubSub.PublishToGateway(serverGameUser.GatewayId, new UpdateNeighbors_GameSegment_Gateway_PubSub_Message()
                {
                    UserId = serverGameUser.EntityId,
                    Removed = removed
                });
            }
            user.Neighbors.Clear();

            ActiveEntities.Remove(user);



        }





        public void BuildNeighbors(ServerGameUser pUser)
        {
            var count = ActiveEntities.Count;

            foreach (var cUser in ActiveEntities.List)
            {
                if (cUser.Neighbors.Contains(pUser.EntityId) || cUser == pUser)
                {
                    continue;
                }

                var distance = pointDistance(pUser, cUser);
                if (distance <= Constants.NeighborDistance)
                {
                    //                    Global.Console.Log(GameSegmentId,"Neighbor Found", cUser.UserId, pUser.UserId, distance);
                    pUser.Neighbors.Add(new GameEntityNeighbor(cUser, distance));
                    cUser.Neighbors.Add(new GameEntityNeighbor(pUser, distance));
                }

            }
        }


        public void diffNeighbors()
        {
            foreach (var userKV in gameManager.MyGameSegment.Users)
            {
                var removed = new List<ServerGameUser>();
                var added = new List<ServerGameUser>();

                var gameSegmentUser = userKV.Value;

                foreach (var gameSegmentNeighbor in gameSegmentUser.Neighbors.List)
                {
                    var notIn = true;
                    foreach (var segmentNeighbor in gameSegmentUser.OldNeighbors)
                    {
                        if (gameSegmentNeighbor.Entity == segmentNeighbor.Entity)
                        {
                            notIn = false;
                            break;
                        }
                    }
                    if (notIn)
                    {
                        added.Add((ServerGameUser)gameSegmentNeighbor.Entity);
                    }
                }
                foreach (var gameSegmentNeighbor in gameSegmentUser.OldNeighbors)
                {
                    var notIn = true;
                    foreach (var segmentNeighbor in gameSegmentUser.Neighbors.List)
                    {
                        if (gameSegmentNeighbor.Entity == segmentNeighbor.Entity)
                        {
                            notIn = false;
                            break;
                        }
                    }
                    if (notIn)
                    {
                        removed.Add((ServerGameUser)gameSegmentNeighbor.Entity);
                    }
                }

                gameSegmentUser.OldNeighbors = null;
                if (added.Count > 0 || removed.Count > 0)
                {
                    var updateNeighborsMessage = new UpdateNeighbors_GameSegment_Gateway_PubSub_Message()
                    {
                        UserId = gameSegmentUser.EntityId,
                        Removed = removed.Select(a => a.EntityId),
                        Added = added.Select(a => new UpdatedNeighbor()
                        {
                            UserId = a.EntityId,
                            X = a.X,
                            Y = a.Y
                        })
                    };
                    Global.Console.Log(gameManager.GameSegmentId, updateNeighborsMessage);
                    gameManager.GameSegmentPubSub.PublishToGateway(gameSegmentUser.GatewayId, updateNeighborsMessage);
                }
            }
        }

        private static double pointDistance(GameEntity pUser, GameEntity cUser)
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

    }


    public class ServerGameManager
    {
        public GameSegmentPubSub GameSegmentPubSub;

        public BackEndTickManager BackEndTickManager;
        public ServerGameUser MyUser;
        public Action OnReady;
        public ServerGame serverGame;


        public readonly string GameSegmentId;
        public GameSegment MyGameSegment;
        public JsDictionary<string, GameSegment> AllGameSegments;

        public Action RegisterGameSegmentWithCluster;


        public ServerGameManager(string gameSegmentId, GameSegmentPubSub gameSegmentPubSub)
        {
            GameSegmentId = gameSegmentId;
            GameSegmentPubSub = gameSegmentPubSub;

            AllGameSegments = new JsDictionary<string, GameSegment>();

            serverGame = new ServerGame(this, BackEndTickManager);
            BackEndTickManager = new BackEndTickManager();
        }



        private void ready()
        {
            BackEndTickManager.Init(sendPing, () =>
            {
                tickManagerReady();
            });
            BackEndTickManager.StartPing();
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
                        serverGame.ActiveEntities.Clear();
                        AllGameSegments.Clear();

                        serverGame.Init(message.Grid);

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

                            serverGame.AddUser(user);
                            user.GameSegment.UserJoin(user);
                        }

                        BuildNeighbors();

                        Global.Console.Log(GameSegmentId, "Game Segment Initialized");

                        Global.SetInterval(BuildNeighbors, 2000);

                        RegisterGameSegmentWithCluster();
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



        private void userAction(UserAction_Gateway_User_Socket_Message userActionMessage)
        {
            serverGame.QueueUserAction(userActionMessage.Action);
        }

        private void userJoined(UserJoined_Gateway_User_Socket_Message userJoinedMessage)
        {

            serverGame.Init(userJoinedMessage.Grid);
            serverGame.MyUserJoined(userJoinedMessage.UserId, userJoinedMessage.X, userJoinedMessage.Y);



            OnReady();
        }


        private void onUpdateNeighbors(UpdateNeighbors_Gateway_User_Socket_Message message)
        {
            serverGame.UpdateNeighbors(message.Added, message.Removed);
        }

        private void onTickSyncMessage(TickSync_Gateway_User_Socket_Message message)
        {
            BackEndTickManager.SetLockStepTick(message.LockstepTickNumber);
        }



        public void Tick(long tickNumber)
        {
            serverGame.Tick(tickNumber);
        }


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


            foreach (var otherGameSegment in otherGameSegments)
            {
                GameSegmentPubSub.PublishToGameSegment(otherGameSegment.Key, tellUserAction);
            }


            foreach (var neighborGameSegment in neighborGameSegments)
            {
                GameSegmentPubSub.PublishToGameSegment(neighborGameSegment.Key.GameSegmentId, new UserAction_GameSegment_GameSegment_PubSub_Message()
                {
                    UserId = user.EntityId,
                    OriginatingGameSegmentId = GameSegmentId,
                    Action = userAction
                });
            }

            GameSegmentPubSub.PublishToGameWorld(new TellUserAction_GameSegment_GameWorld_PubSub_Message()
            {
                UserId = user.EntityId,
                OriginatingGameSegmentId = GameSegmentId,
                Action = userAction
            });


        }

        public void Init()
        {
            GameSegmentPubSub.OnMessage += onMessage;
            GameSegmentPubSub.Init().Then(ready);
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

            serverGame.QueueUserAction(MyGameSegment.Users[message.UserId], message.Action);
        }
        private void OnMessageUserAction(UserAction_GameSegment_GameSegment_PubSub_Message message)
        {
            if (!MyGameSegment.Users.ContainsKey(message.UserId))
            {
                throw new Exception("This aint my user! " + message.UserId);
            }

            serverGame.ProcessUserActionFromNeighbor(MyGameSegment.Users[message.UserId], message.Action);
        }
        private void OnMessageTellUserAction(TellUserAction_GameSegment_GameSegment_PubSub_Message message)
        {
            if (!MyGameSegment.Users.ContainsKey(message.UserId))
            {
                throw new Exception("This aint my user! " + message.UserId);
            }

            serverGame.TellUserAction(MyGameSegment.Users[message.UserId], message.Action);
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
            BackEndTickManager.OnPongReceived();
        }

        private void onMessageUserLeft(UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            serverGame.UserLeft(message.UserId);

        }

        private void onMessageTellUserLeft(TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            var user = (ServerGameUser)serverGame.ActiveEntities[message.UserId];
            var gameSegment = user.GameSegment;

            gameSegment.UserLeft(message.UserId);
            serverGame.UserLeft(message.UserId);

            //todo maybe shoudlnt be reqres
            GameSegmentPubSub.PublishToGameWorld(new UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
            {
                MessageId = message.MessageId
            });
        }

        private void onMessageTellUserJoin(TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            var gameSegmentUser = new ServerGameUser(this.serverGame, message.UserId)
            {
                GameSegment = AllGameSegments[message.GameSegmentId],
                GatewayId = message.GatewayId,
                X = message.X,
                Y = message.Y,
            };

            var otherGameSegment = AllGameSegments[message.GameSegmentId];
            serverGame.ActiveEntities.Add(gameSegmentUser);

            //            Global.Console.Log(GameSegmentId, "User joined from other gamesegment", message.GameSegmentId, message.UserId);

            otherGameSegment.UserJoin(gameSegmentUser);

            BuildNeighbors();

            //            GameSegmentLogger.LogUserJoin(false, gameSegmentUser.UserId, gameSegmentUser.X, gameSegmentUser.Y, gameSegmentUser.Neighbors.Keys);


            GameSegmentPubSub.PublishToGameWorld(new TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
            {
                MessageId = message.MessageId
            });
        }


        private void onMessageUserJoin(UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            foreach (var userJoinGameUser in message.Collection)
            {
                var gameSegmentUser = new ServerGameUser(this.serverGame, userJoinGameUser.UserId)
                {
                    GameSegment = AllGameSegments[GameSegmentId],
                    GatewayId = userJoinGameUser.GatewayId,
                    X = userJoinGameUser.X,
                    Y = userJoinGameUser.Y,
                };

                serverGame.ActiveEntities.Add(gameSegmentUser);
                MyGameSegment.UserJoin(gameSegmentUser);
                BuildNeighbors();
                //                GameSegmentLogger.LogUserJoin(true, gameSegmentUser.UserId, gameSegmentUser.X, gameSegmentUser.Y, gameSegmentUser.Neighbors.Keys);
            }

            GameSegmentPubSub.PublishToGameWorld(new UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
            {
                MessageId = message.MessageId
            });
        }


        public void BuildNeighbors()
        {
            //            Global.Console.Log(GameSegmentId, "Building Neighbors");

            foreach (var entity in serverGame.ActiveEntities.List)
            {
                entity.OldNeighbors = new List<GameEntityNeighbor>(entity.Neighbors.List);
                entity.Neighbors.Clear();
            }


            foreach (var user in MyGameSegment.Users)
            {
                serverGame.BuildNeighbors(user.Value);
            }

            serverGame.diffNeighbors();
            //            Global.Console.Log(GameSegmentId, "Updated", AllGameSegments);
        }

    }
    public class ServerGameUser : GameUser, IServerGameEntity
    {


        public GameSegment GameSegment;
        public string GatewayId;
        public ServerGameUser(ServerGame game, string userId)
            : base(game, userId)
        {
            Animations = new List<AnimationPoint>();

        }

        public List<AnimationPoint> Animations;
        public override void Tick()
        {
            base.Tick();

            var result = Path[0];
            Animations = new List<AnimationPoint>();

            int projectedX;
            int projectedY;
            int projectedSquareX;
            int projectedSquareY;

            projectedSquareX = result == null ? SquareX : (result.X);
            projectedSquareY = result == null ? SquareY : (result.Y);


            for (var i = 0; i < Constants.AnimationSteps; i++)
            {
                SquareX = (int)((X) / Constants.SquareSize);
                SquareY = (int)((Y) / Constants.SquareSize);
                var fromX = X;
                var fromY = Y;


                if (result != null && (SquareX == result.X && SquareY == result.Y))
                {
                    Path.RemoveAt(0);
                    result = Path[0];

                    projectedSquareX = result == null ? SquareX : (result.X);
                    projectedSquareY = result == null ? SquareY : (result.Y);
                }


                projectedX = projectedSquareX * Constants.SquareSize + Constants.SquareSize / 2;
                projectedY = projectedSquareY * Constants.SquareSize + Constants.SquareSize / 2;


                if (((int)projectedX) == ((int)X) && ((int)projectedY) == ((int)Y))
                {
                    return;
                }

                X = Lerper.MoveTowards(X, projectedX, (Speed / Constants.AnimationSteps));
                Y = Lerper.MoveTowards(Y, projectedY, (Speed / Constants.AnimationSteps));


                Animations.Add(new AnimationPoint(fromX, fromY, X, Y));
            }

        }


    }

    public interface IServerGameEntity
    {
    }
}