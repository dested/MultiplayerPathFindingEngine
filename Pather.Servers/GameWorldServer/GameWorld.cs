using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameWorld.Gateway;
using Pather.Common.Models.GameWorld.ServerManager;
using Pather.Common.Models.ServerManager.Base;
using Pather.Common.Utils;
using Pather.Common.Utils.Promises;
using Pather.Servers.Database;
using Pather.Servers.GameWorldServer.Models;

namespace Pather.Servers.GameWorldServer
{
    public class GameWorld
    {
        public GameWorldPubSub GameWorldPubSub;
        public List<GameWorldUser> Users;
        public List<GameSegment> GameSegments;

        public GameWorld(GameWorldPubSub gameWorldPubSub)
        {
            GameWorldPubSub = gameWorldPubSub;
            Users = new List<GameWorldUser>();
            GameSegments = new List<GameSegment>();
        }

        public Promise<GameWorldUser, UserJoinError> CreateUser(string gatewayChannel, DBUser dbUser)
        {
            var defer = Q.Defer<GameWorldUser, UserJoinError>();

            var gwUser = new GameWorldUser();
            gwUser.UserId = dbUser.UserId;
            gwUser.X = dbUser.X;
            gwUser.Y = dbUser.Y;
            gwUser.Neighbors = new List<GameWorldNeighbor>();
            gwUser.GatewayId = gatewayChannel;
            BuildNeighbors(gwUser);
            determineGameSegment(gwUser).Then(gameSegment =>
            {
                gameSegment.PreAddUserToSegment(gwUser);
                defer.Resolve(gwUser);
            });
            return defer.Promise;
        }

        public Promise UserLeft(DBUser dbUser)
        {
            var deferred = Q.Defer();

            var gwUser = Users.First(a => a.UserId == dbUser.UserId);

            if (gwUser == null)
            {
                Global.Console.Log("IDK WHO THIS USER IS", dbUser);
                throw new Exception("IDK WHO THIS USER IS");
            }


            foreach (var gameSegmentNeighbor in gwUser.Neighbors)
            {
                foreach (var segmentNeighbor in gameSegmentNeighbor.User.Neighbors)
                {
                    if (segmentNeighbor.User == gwUser)
                    {
                        gameSegmentNeighbor.User.Neighbors.Remove(segmentNeighbor);
                        break;
                    }
                }
            }


            var promises = GameSegments
                .Where(seg => seg != gwUser.GameSegment)
                .Select(seg => seg.TellSegmentAboutRemoveUser(gwUser));

            promises.Add(gwUser.GameSegment.RemoveUserFromGameSegment(gwUser));

            Q.All(promises)
                .Then(() =>
                {
                    Users.Remove(gwUser);
                    Global.Console.Log("User left", gwUser.UserId);
                    deferred.Resolve();
                });


            return deferred.Promise;
        }


        private Promise<GameSegment, UndefinedPromiseError> determineGameSegment(GameWorldUser gwUser)
        {
            var deferred = Q.Defer<GameSegment, UndefinedPromiseError>();
            var neighbors = buildNeighborCollection(gwUser);

            var noneFound = true;
            for (var i = 0; i < neighbors.Count; i++)
            {
                //todo REORG GAME SEGMENTS????

                var neighbor = neighbors[i];
                var neighborGameSegment = neighbor.User.GameSegment;
                if (neighborGameSegment.CanAcceptNewUsers())
                {
                    deferred.Resolve(neighborGameSegment);
                    noneFound = false;
                    break;
                }
            }

            if (noneFound)
            {
                foreach (var gameSegment in GameSegments)
                {
                    if (gameSegment.CanAcceptNewUsers())
                    {
                        deferred.Resolve(gameSegment);
                        noneFound = false;
                        break;
                    }
                }
            }

            if (noneFound)
            {
                return CreateGameSegment();
            }

            return deferred.Promise;
        }


        public Promise<GameSegment, UndefinedPromiseError> CreateGameSegment()
        {
            var deferred = Q.Defer<GameSegment, UndefinedPromiseError>();


            GameWorldPubSub.PublishToServerManagerWithCallback<CreateGameSegment_Response_ServerManager_GameWorld_PubSub_ReqRes_Message>(new CreateGameSegment_GameWorld_ServerManager_PubSub_ReqRes_Message())
                .Then((createGameMessageResponse) =>
                {
                    var gs = new GameSegment(this);
                    gs.GameSegmentId = createGameMessageResponse.GameSegmentId;


                    foreach (var gameSegment in GameSegments)
                    {
                        GameWorldPubSub.PublishToGameSegment(gameSegment.GameSegmentId, new NewGameSegment_GameWorld_GameSegment_PubSub_Message()
                        {
                            GameSegmentId = gs.GameSegmentId
                        });
                    }

                    GameSegments.Add(gs);
                    deferred.Resolve(gs);
                });


            return deferred.Promise;
        }


        public void BuildNeighbors()
        {
            var count = Users.Count;
            for (var i = 0; i < count; i++)
            {
                var pUser = Users[i];
                pUser.Neighbors.Clear();
            }
            for (var i = 0; i < count; i++)
            {
                var pUser = Users[i];
                BuildNeighbors(pUser, i);
            }
        }

        private List<GameWorldNeighbor> buildNeighborCollection(GameWorldUser pUser)
        {
            var count = Users.Count;

            var neighbors = new List<GameWorldNeighbor>();

            for (var c = 0; c < count; c++)
            {
                var cUser = Users[c];
                var distance = PointDistance(pUser, cUser);
                neighbors.Add(new GameWorldNeighbor(cUser, distance));
            }
            neighbors.Sort((a, b) => (int) (a.Distance - b.Distance));
            return neighbors;
        }


        private void BuildNeighbors(GameWorldUser pUser, int i = 0)
        {
            var count = Users.Count;

            for (var c = i; c < count; c++)
            {
                var cUser = Users[c];
                var distance = PointDistance(pUser, cUser);
                if (distance <= Constants.NeighborDistance)
                {
                    pUser.Neighbors.Add(new GameWorldNeighbor(cUser, distance));
                    cUser.Neighbors.Add(new GameWorldNeighbor(pUser, distance));
                }
            }
        }

        private static double PointDistance(GameWorldUser pUser, GameWorldUser cUser)
        {
            var mx = pUser.X;
            var my = pUser.Y;

            var cx = cUser.X;
            var cy = cUser.Y;

            var _x = (cx - mx);
            var _y = (cy - my);

            var dis = Math.Sqrt((_x*_x) + (_y*_y));
            return dis;
        }

 

        private readonly List<ReoragGameWorldModel> needToReorganize = new List<ReoragGameWorldModel>();

        public void ChangeUsersGameSegment(GameWorldUser gameWorldUser, GameSegment bestGameSegment)
        {
            needToReorganize.Add(new ReoragGameWorldModel(gameWorldUser, bestGameSegment));
        }

        public void Reorganize()
        {
            if (needToReorganize.Count > 0)
            {
                var reorg = Math.Min(needToReorganize.Count, 10);
                for (var i = reorg - 1; i >= 0; i--)
                {
                    var newGameSegment = needToReorganize[reorg].BestGameSegment;
                    var oldGameSegment = needToReorganize[reorg].GameWorldUser;

//                    GameWorldPubSub.PublishToGameSegmentWithCallback<>()
                }
            }
        }

        public void UserAction(TellUserAction_GameSegment_GameWorld_PubSub_Message tellUserAction)
        {
           /*todo var gwUser = Users.First(a => a.UserId == userId);

            if (gwUser == null)
            {
                throw new Exception("User not found: " + userId);
            }

            gwUser.X = x;
            gwUser.Y = y;
            //todo interpolate path find using setTimeout??*/
        }
    }
}