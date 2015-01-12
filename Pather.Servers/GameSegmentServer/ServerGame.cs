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

namespace Pather.Servers.GameSegmentServer
{
    public class ServerGame : Game
    {
        private readonly ServerGameManager gameManager;

        public ServerGame(ServerGameManager gameManager, TickManager tickManager)
            : base(tickManager)
        {
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
                    var moveEntityAction = (MoveEntity_GameSegmentAction) action;
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
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }


        public void ServerProcessTellGameSegmentAction(TellGameSegmentAction action)
        {
            switch (action.TellGameSegmentActionType)
            {
                case TellGameSegmentActionType.MoveEntity:
                    var moveEntity = (MoveEntity_TellGameSegmentAction) action;
                    ((ServerGameUser) ActiveEntities[action.EntityId]).SetPointInTime(moveEntity.X, moveEntity.Y, moveEntity.LockstepTick);
//                    Global.Console.Log("Got tell move action from gamesegment");
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public void ServerProcessNeighborGameSegmentAction(NeighborGameSegmentAction action)
        {
            switch (action.NeighborGameSegmentActionType)
            {
                case NeighborGameSegmentActionType.MoveEntity:
                    var moveEntity = (MoveEntity_NeighborGameSegmentAction) action;
                    ((ServerGameUser) ActiveEntities[action.EntityId]).SetPath(moveEntity.LockstepMovePoints);
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
            var serverGameUser = new ServerGameUser(this, userJoinGameUser.UserId)
            {
                GameSegment = gameManager.AllGameSegments[gameManager.GameSegmentId],
                GatewayId = userJoinGameUser.GatewayId,
                X = userJoinGameUser.X,
                Y = userJoinGameUser.Y,
            };

            ActiveEntities.Add(serverGameUser);
            serverGameUser.GameSegment.UserJoin(serverGameUser);
            BuildNeighbors();
        }


        public void TellUserJoin(TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            var serverGameUser = new ServerGameUser(this, message.UserId)
            {
                GameSegment = gameManager.AllGameSegments[message.GameSegmentId],
                GatewayId = message.GatewayId,
                X = message.X,
                Y = message.Y,
            };

            var otherGameSegment = gameManager.AllGameSegments[message.GameSegmentId];
            ActiveEntities.Add(serverGameUser);

            //            Global.Console.Log(GameSegmentId, "User joined from other gamesegment", message.GameSegmentId, message.UserId);

            otherGameSegment.UserJoin(serverGameUser);

            BuildNeighbors();

            //            GameSegmentLogger.LogUserJoin(false, serverGameUser.UserId, serverGameUser.X, serverGameUser.Y, serverGameUser.Neighbors.Keys);
        }


        public void BuildNeighbors()
        {
            //            Global.Console.Log(GameSegmentId, "Building Neighbors");

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
            //            Global.Console.Log(GameSegmentId, "Updated", AllGameSegments);
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
                    //                    Global.Console.Log(GameSegmentId,"Neighbor Found", cUser.UserId, pUser.UserId, distance);
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
                    //                    Global.Console.Log("Neighbors! ", added, removed);
                    var lockstepTickToRun = tickManager.LockstepTickNumber + 1;
                    //                    Global.Console.Log("lockstep ", lockstepTickToRun);

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
                                //                                Global.Console.Log("In progress actions: ", inProgressActions, a.EntityId);
                                Point point;


                                //                                Global.Console.Log("xy ", a.X, a.Y);

                                //                                Global.Console.Log("count ", inProgressActions.Count);
                                point = a.GetPositionAtLockstep(lockstepTickToRun);
                                //                                Global.Console.Log("xy ", point.X, point.Y);

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