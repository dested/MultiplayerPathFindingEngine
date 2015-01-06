using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.GameFramework;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common;
using Pather.Common.Models.Common.UserActions;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameWorld.GameSegment;
using Pather.Common.Models.Gateway.PubSub;
using Pather.Common.Utils;
using Pather.Servers.GameSegmentServer.Logger;

namespace Pather.Servers.GameSegmentServer
{
    public class ServerGame : Game
    {
        private ServerGameManager gameManager;

        public ServerGame(ServerGameManager gameManager, TickManager tickManager)
            : base(tickManager)
        {
            this.gameManager = gameManager;
            StepManager = new StepManager(this);
            tickManager.OnProcessLockstep += StepManager.ProcessAction;
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



            if (true /*action is valid*/)
            {
                base.QueueUserAction(action);
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
                    default:
                        throw new ArgumentOutOfRangeException();
                }
            }
        }


        public void UserLeft(string userId)
        {
            var user = (ServerGameUser)ActiveEntities[userId];
            var gameSegment = user.GameSegment;
            gameSegment.UserLeft(userId);

            //todo remove user ina  method or something
            var removed = new List<string>()
            {
                userId
            };

            foreach (var gameEntityNeighbor in user.Neighbors.List)
            {
                var serverGameUser = ((ServerGameUser)gameEntityNeighbor.Entity);

                var neighbors = serverGameUser.Neighbors;
                foreach (var entityNeighbor in neighbors.List)
                {
                    if (entityNeighbor.Entity == user)
                    {
                        neighbors.Remove(entityNeighbor);
                        break;
                    }
                }

                gameManager.SendToUser(serverGameUser, new UpdateNeighbors_GameSegment_Gateway_PubSub_Message()
                {
                    UserId = serverGameUser.EntityId,
                    Removed = removed
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

            var gameSegmentUser = new ServerGameUser(this, message.UserId)
            {
                GameSegment = gameManager.AllGameSegments[message.GameSegmentId],
                GatewayId = message.GatewayId,
                X = message.X,
                Y = message.Y,
            };

            var otherGameSegment = gameManager.AllGameSegments[message.GameSegmentId];
            ActiveEntities.Add(gameSegmentUser);

            //            Global.Console.Log(GameSegmentId, "User joined from other gamesegment", message.GameSegmentId, message.UserId);

            otherGameSegment.UserJoin(gameSegmentUser);

            BuildNeighbors();

            //            GameSegmentLogger.LogUserJoin(false, gameSegmentUser.UserId, gameSegmentUser.X, gameSegmentUser.Y, gameSegmentUser.Neighbors.Keys);

        }



        public void BuildNeighbors()
        {
            //            Global.Console.Log(GameSegmentId, "Building Neighbors");

            foreach (var entity in ActiveEntities.List)
            {
                entity.OldNeighbors = new List<GameEntityNeighbor>(entity.Neighbors.List);
                entity.Neighbors.Clear();
            }


            foreach (var user in gameManager.MyGameSegment.Users)
            {
                BuildNeighbors(user.Value);
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
                    //                    Global.Console.Log(gameManager.GameSegmentId, updateNeighborsMessage);
                    gameManager.SendToUser(gameSegmentUser, updateNeighborsMessage);
                }
            }
        }

        private static double pointDistance(GameEntity pUser, GameEntity cUser)
        {
            var mx = pUser.SquareX;
            var my = pUser.SquareY;

            var cx = cUser.SquareX;
            var cy = cUser.SquareY;

            var x = (cx - mx);
            var y = (cy - my);

            var dis = Math.Sqrt((x * x) + (y * y));
            return dis;
        }

    }
}