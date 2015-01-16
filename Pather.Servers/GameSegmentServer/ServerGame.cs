using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.GameFramework;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common;
using Pather.Common.Models.Common.Actions.ClientActions;
using Pather.Common.Models.Common.Actions.GameSegmentAction;
using Pather.Common.Models.Common.Actions.GameSegmentAction.Base;
using Pather.Common.Models.Common.Actions.GameWorldAction;
using Pather.Common.Models.Common.Actions.NeighborGameSegmentAction;
using Pather.Common.Models.Common.Actions.NeighborGameSegmentAction.Base;
using Pather.Common.Models.Common.Actions.TellGameSegmentAction;
using Pather.Common.Models.Common.Actions.TellGameSegmentAction.Base;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.Gateway.PubSub;
using Pather.Common.Utils;
using Pather.Servers.Common.ServerLogging;

namespace Pather.Servers.GameSegmentServer
{
    public class ServerGame : Game
    {
        public ServerLogger ServerLogger;
        protected readonly ServerGameManager gameManager;

        public ServerGame(ServerGameManager gameManager, TickManager tickManager)
            : base(tickManager)
        {
            ServerLogger = gameManager.ServerLogger;
            this.gameManager = gameManager;
            tickManager.OnProcessLockstep += LockstepTick;
        }

        public void Init()
        {
            BuildNeighbors();
            Global.SetInterval(BuildNeighbors, Constants.BuildNeighborsTimeout);
        }

        public override GameUser CreateGameUser(string userId)
        {
            return new ServerGameUser(this, userId);
        }

        public void ServerProcessGameSegmentAction(ServerGameUser user, GameSegmentAction action)
        {
            switch (action.GameSegmentActionType)
            {
                case GameSegmentActionType.MoveEntity:
                    var moveEntityAction = (MoveEntity_GameSegmentAction)action;
                    var completedLockStep = user.RePathFind(moveEntityAction);
                    if (completedLockStep == 0)
                    {
                        //bad movement
                        return;
                    }
                    gameManager.SendAction(user,
                        new MoveEntity_ClientAction()
                        {
                            X = moveEntityAction.X,
                            Y = moveEntityAction.Y,
                            EntityId = user.EntityId,
                            LockstepTick = moveEntityAction.LockstepTick
                        },
                        new MoveEntity_TellGameSegmentAction()
                        {
                            EntityId = user.EntityId,
                            X = moveEntityAction.X,
                            Y = moveEntityAction.Y,
                            LockstepTick = completedLockStep
                        },
                        new MoveEntity_NeighborGameSegmentAction()
                        {
                            EntityId = user.EntityId,
                            LockstepTick = moveEntityAction.LockstepTick,
                            LockstepMovePoints = user.LockstepMovePoints
                        },
                        new MoveEntity_GameWorldAction()
                        {
                            EntityId = user.EntityId,
                            LockstepTick = moveEntityAction.LockstepTick,
                            LockstepMovePoints = user.LockstepMovePoints
                        }
                        );
                    break;
                case GameSegmentActionType.LogicAction:
                    var logicAction = (LogicAction_GameSegmentAction)action;
                    ProcessLogicAction(user,logicAction);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }



        public void ServerProcessTellGameSegmentAction(TellGameSegmentAction action)
        {
            switch (action.TellGameSegmentActionType)
            {
                case TellGameSegmentActionType.MoveEntity:
                    var moveEntity = (MoveEntity_TellGameSegmentAction)action;
                    ((ServerGameUser)ActiveEntities[action.EntityId]).SetPointInTime(moveEntity.X, moveEntity.Y, moveEntity.LockstepTick);
                    break;
                case TellGameSegmentActionType.LogicAction:
                    var logicAction = (LogicAction_TellGameSegmentAction)action;
                    ProcessTellLogicAction(logicAction);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public virtual void ProcessTellLogicAction(LogicAction_TellGameSegmentAction logicAction)
        {
        }
        public virtual void ProcessNeighborLogicAction(LogicAction_NeighborGameSegmentAction logicAction)
        {
        }
        public virtual void ProcessLogicAction(ServerGameUser user, LogicAction_GameSegmentAction action)
        {
        }

        public void ServerProcessNeighborGameSegmentAction(NeighborGameSegmentAction action)
        {
            switch (action.NeighborGameSegmentActionType)
            {
                case NeighborGameSegmentActionType.MoveEntity:
                    var moveEntity = (MoveEntity_NeighborGameSegmentAction)action;
                    ((ServerGameUser)ActiveEntities[action.EntityId]).SetPath(moveEntity.LockstepMovePoints);
                    break;
                case NeighborGameSegmentActionType.LogicAction:
                    var logicAction = (LogicAction_NeighborGameSegmentAction)action;
                    ProcessNeighborLogicAction(logicAction);
                    
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }



        public void UserLeft(string userId)
        {
            var user = (ServerGameUser) ActiveEntities[userId];
            var gameSegment = user.GameSegment;
            gameSegment.UserLeft(userId);

            //todo remove user ina  method or something
            var removed = new List<string>()
            {
                userId
            };

            foreach (var gameEntityNeighbor in user.Neighbors.List)
            {
                var serverGameUser = ((ServerGameUser) gameEntityNeighbor.Entity);

                var neighbors = serverGameUser.Neighbors;
                foreach (var entityNeighbor in neighbors.List)
                {
                    if (entityNeighbor.Entity == user)
                    {
                        neighbors.Remove(entityNeighbor);
                        break;
                    }
                }


                gameManager.SendToUser(serverGameUser, new ClientActionCollection_GameSegment_Gateway_PubSub_Message()
                {
                    Users = new List<string>()
                    {
                        serverGameUser.EntityId
                    },
                    ClientAction = new UpdateNeighborsClientAction()
                    {
                        Removed = removed,
                        EntityId = serverGameUser.EntityId,
                        Added = new List<UpdatedNeighbor>(),
                        LockstepTick = tickManager.LockstepTickNumber + 1
                    }
                });
            }
            user.Neighbors.Clear();

            ActiveEntities.Remove(user);
        }

        public void UserJoin(UserJoinGameUser userJoinGameUser)
        {
            var serverGameUser = (ServerGameUser)CreateGameUser(userJoinGameUser.UserId);
            serverGameUser.GameSegment = gameManager.AllGameSegments[gameManager.GameSegmentId];
            serverGameUser.GatewayId = userJoinGameUser.GatewayId;
            serverGameUser.X = userJoinGameUser.X;
            serverGameUser.Y = userJoinGameUser.Y;

            AddEntity(serverGameUser);
            serverGameUser.GameSegment.UserJoin(serverGameUser);
            BuildNeighbors();
        }


        public void TellUserJoin(TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            var serverGameUser = (ServerGameUser)CreateGameUser(message.UserId);
            serverGameUser.GameSegment = gameManager.AllGameSegments[message.GameSegmentId];
            serverGameUser.GatewayId = message.GatewayId;
            serverGameUser.X = message.X;
            serverGameUser.Y = message.Y;

            var otherGameSegment = gameManager.AllGameSegments[message.GameSegmentId];
            AddEntity(serverGameUser);

            otherGameSegment.UserJoin(serverGameUser);

            BuildNeighbors();

        }


        public void BuildNeighbors()
        {
            ServerLogger.LogDebug("Building Neighbors");

            foreach (var entity in ActiveEntities.List)
            {
                entity.OldNeighbors = new List<GameEntityNeighbor>(entity.Neighbors.List);
                entity.Neighbors.Clear();
            }


            foreach (var user in gameManager.MyGameSegment.Users.List)
            {
                BuildNeighbors(user);
            }

            diffNeighbors();
            ServerLogger.LogDebug("Finished Neighbors");
        }


        public void BuildNeighbors(ServerGameUser pUser)
        {
            foreach (var cUser in ActiveEntities.List)
            {
                if (cUser.Neighbors.Contains(pUser.EntityId) || cUser == pUser)
                {
                    continue;
                }

                var distance = pointDistance(pUser, cUser);
                if (distance <= Constants.NeighborDistance)
                {
                    ServerLogger.LogDebug("Neighbor Found", cUser.EntityId, pUser.EntityId, distance);
                    pUser.Neighbors.Add(new GameEntityNeighbor(cUser, distance));
                    cUser.Neighbors.Add(new GameEntityNeighbor(pUser, distance));
                }
            }
        }


        public void diffNeighbors()
        {
            foreach (var user in gameManager.MyGameSegment.Users.List)
            {
                var removed = new List<ServerGameUser>();
                var added = new List<ServerGameUser>();

                var serverGameUser = user;

                foreach (var gameEntityNeighbor in serverGameUser.Neighbors.List)
                {
                    var notIn = true;
                    foreach (var segmentNeighbor in serverGameUser.OldNeighbors)
                    {
                        if (gameEntityNeighbor.Entity == segmentNeighbor.Entity)
                        {
                            notIn = false;
                            break;
                        }
                    }
                    if (notIn)
                    {
                        added.Add((ServerGameUser) gameEntityNeighbor.Entity);
                    }
                }
                foreach (var gameSegmentNeighbor in serverGameUser.OldNeighbors)
                {
                    var notIn = true;
                    foreach (var segmentNeighbor in serverGameUser.Neighbors.List)
                    {
                        if (gameSegmentNeighbor.Entity == segmentNeighbor.Entity)
                        {
                            notIn = false;
                            break;
                        }
                    }
                    if (notIn)
                    {
                        removed.Add((ServerGameUser) gameSegmentNeighbor.Entity);
                    }
                }

                serverGameUser.OldNeighbors = null;
                if (added.Count > 0 || removed.Count > 0)
                {
                    ServerLogger.LogDebug("Neighbors! ", added.Select(a => a.EntityId), removed.Select(a => a.EntityId));

                    var lockstepTickToRun = tickManager.LockstepTickNumber + 1;
                    ServerLogger.LogDebug("lockstep ", lockstepTickToRun);

                    gameManager.SendToUser(serverGameUser, new ClientActionCollection_GameSegment_Gateway_PubSub_Message()
                    {
                        Users = new List<string>()
                        {
                            serverGameUser.EntityId
                        },
                        ClientAction = new UpdateNeighborsClientAction()
                        {
                            Removed = removed.Select(a => a.EntityId),
                            EntityId = serverGameUser.EntityId,
                            Added = added.Select(a =>
                            {
                                var inProgressActions = a.InProgressActions.Where(action => action.EndingLockStepTicking > lockstepTickToRun);
                                ServerLogger.LogDebug("In progress actions: ", inProgressActions, a.EntityId);
                                Point point;


                                ServerLogger.LogDebug("xy ", a.X, a.Y);

                                ServerLogger.LogDebug("count ", inProgressActions.Count);
                                point = a.GetPositionAtLockstep(lockstepTickToRun);
                                ServerLogger.LogDebug("xy ", point.X, point.Y);

                                return new UpdatedNeighbor()
                                {
                                    UserId = a.EntityId,
                                    InProgressClientActions = inProgressActions,
                                    X = point.X,
                                    Y = point.Y
                                };
                            }),
                            LockstepTick = lockstepTickToRun
                        }
                    });
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

            var dis = Math.Sqrt((x*x) + (y*y));
            return Utilities.ToSquare(dis);
        }

        public virtual void LockstepTick(long lockstepTickNumber)
        {
            foreach (var gameEntity in ActiveEntities.List)
            {
                var serverGameEntity = (IServerGameEntity) gameEntity;
                serverGameEntity.LockstepTick(lockstepTickNumber);
            }
        }
    }
}