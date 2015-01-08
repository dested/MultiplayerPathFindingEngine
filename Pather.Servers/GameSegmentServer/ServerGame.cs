using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.GameFramework;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common;
using Pather.Common.Models.Common.UserActions;
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
            StepManager = new StepManager(this);
            tickManager.OnProcessLockstep += LockstepTick;
        }

        public void Init()
        {
            BuildNeighbors();
            Global.SetInterval(BuildNeighbors, Constants.BuildNeighborsTimeout);
        }

        public override void LockstepTick(long lockstepTickNumber)
        {
            base.LockstepTick(lockstepTickNumber);
            StepManager.ProcessAction(lockstepTickNumber);
        }


        public override GameUser CreateGameUser(string userId)
        {
            return new ServerGameUser(this, userId);
        }


        /*todo: instead of move, you need a process action. that action gets sent directly to the game logic manager,
         you need ot be able to respond to just a user, or a user and his neighbors
         you also need to send to the other gamesegments that it does and doesnt directly effect */

        public void QueueUserAction(ServerGameUser user, UserAction action)
        {
            action.EntityId = user.EntityId;


            if (true /*todo action is valid*/)
            {
                QueueUserAction(action);
                switch (action.UserActionType)
                {
                    case UserActionType.Move:
                        var moveAction = (MoveEntityAction) action;
                        gameManager.SendAction(user, new MoveEntityAction()
                        {
                            X = moveAction.X,
                            Y = moveAction.Y,
                            EntityId = moveAction.EntityId,
                            LockstepTick = moveAction.LockstepTick
                        });
                        break;
                    case UserActionType.UpdateNeighbors:
                        throw new Exception("Should not get action from user");
                    case UserActionType.MoveEntityOnPath:
                        throw new Exception("Should not get action from user");
                    default:
                        throw new ArgumentOutOfRangeException();
                }
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


                gameManager.SendToUser(serverGameUser, new UserActionCollection_GameSegment_Gateway_PubSub_Message()
                {
                    Users = new List<string>()
                    {
                        serverGameUser.EntityId
                    },
                    Action = new UpdateNeighborsAction()
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
                    var lockstepTickToRun = tickManager.LockstepTickNumber + 1;

                    gameManager.SendToUser(serverGameUser, new UserActionCollection_GameSegment_Gateway_PubSub_Message()
                    {
                        Users = new List<string>()
                        {
                            serverGameUser.EntityId
                        },
                        Action = new UpdateNeighborsAction()
                        {
                            Removed = removed.Select(a => a.EntityId),
                            EntityId = serverGameUser.EntityId,
                            Added = added.Select(a =>
                            {
                                var inProgressActions = a.InProgressActions.Where(action => action.EndingLockStepTicking > lockstepTickToRun);

                                Point point;

                                //todo this doesnt feel right...
                                if (inProgressActions.Count == 0)
                                {
                                    point = a.GetPositionAtLockstep(lockstepTickToRun - 1);
                                }
                                else
                                {
                                    point = a.GetPositionAtLockstep(lockstepTickToRun);
                                }

                                return new UpdatedNeighbor()
                                {
                                    UserId = a.EntityId,
                                    InProgressActions = inProgressActions,
                                    X = point.X,
                                    Y = point.Y
                                };
                            }),
                            LockstepTick = lockstepTickToRun + 1 //todo this sholnt be plus 1, i think theres somethign wrong with getpositionatlockstep
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
    }
}