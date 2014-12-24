using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameSegmentCluster;
using Pather.Common.Models.GameWorld;
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
        private string gameSegmentClusterId = "TODO:DEFAULTGAMESEGMENTCLUSTER";

        public GameWorld(GameWorldPubSub gameWorldPubSub)
        {
            GameWorldPubSub = gameWorldPubSub;
            Users = new List<GameWorldUser>();
            GameSegments = new List<GameSegment>();
        }

        public Promise<GameWorldUser, UserJoinError> UserJoined(string gatewayChannel, DBUser dbUser)
        {
            var defer = Q.Defer<GameWorldUser, UserJoinError>();

            var gwUser = new GameWorldUser();
            gwUser.UserId = dbUser.UserId;
            gwUser.X = dbUser.X;
            gwUser.Y = dbUser.Y;
            gwUser.Neighbors = new List<GameWorldNeighbor>();
            gwUser.GatewayServer = gatewayChannel;
            BuildNeighbors(gwUser);

            DetermineGameSegment(gwUser)
                .Then(gameSegment =>
                {
                    var promises = GameSegments
                        .Where(seg => seg != gameSegment)
                        .Select(seg => seg.TellSegmentAboutUser(gwUser));

                    promises.Add(gameSegment.AddUserToSegment(gwUser));

                    Q.All(promises)
                        .Then(() =>
                        {
                            Users.Add(gwUser);
                            Global.Console.Log("",
                                "Gameworld added user to game segment", gameSegment.GameSegmentId,
                                "Total Players:", Users.Count,
                                "Game Segment Players:", gameSegment.Users.Count);

                            defer.Resolve(gwUser);
                        });

                });
            return defer.Promise;
        }

        public Promise UserLeft(DBUser dbUser)
        {
            var deferred = Q.Defer();

            var gwUser = Users.First(a => a.UserId == dbUser.UserId);

            if (gwUser == null)
            {
                throw new Exception("IDK WHO THIS USER IS");
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


        private Promise<GameSegment, UndefinedPromiseError> DetermineGameSegment(GameWorldUser gwUser)
        {

            if (Users.Count == 0)
            {
                var deferred = Q.Defer<GameSegment, UndefinedPromiseError>();
                Global.Console.Log("Creating new segment.");
                CreateGameSegment()
                    .Then((gameSegment) =>
                    {
                        Global.Console.Log("New segment created.");
                        deferred.Resolve(gameSegment);
                    });
                return deferred.Promise;
            }
            else
            {
                return FindBestGameSegment(gwUser);
            }
        }

        private Promise<GameSegment, UndefinedPromiseError> FindBestGameSegment(GameWorldUser gwUser)
        {
            var deferred = Q.Defer<GameSegment, UndefinedPromiseError>();
            var neighbor = determineClosestNeighbor(gwUser);

            var neighborGameSegment = neighbor.User.GameSegment;
            if (neighborGameSegment.CanAcceptNewUsers())
            {
                deferred.Resolve(neighborGameSegment);
            }
            else
            {
                //TODO PRObably find the second closest user and add to him lol
                //todo REORG GAME SEGMENTS?
                return CreateGameSegment();
            }

            return deferred.Promise;
        }


        public Promise<GameSegment, UndefinedPromiseError> CreateGameSegment()
        {
            var deferred = Q.Defer<GameSegment, UndefinedPromiseError>();

            var createGameMessage = new CreateGameSegment_GameWorld_GameSegmentCluster_PubSub_ReqRes_Message()
            {
                GameSegmentId = Pather.Common.Common.UniqueId(),
            };

            GameWorldPubSub.PublishToGameSegmentClusterWithCallback<CreateGameSegment_Response_GameSegmentCluster_GameWorld_PubSub_Message>(gameSegmentClusterId, createGameMessage)
                .Then((createGameMessageResponse) =>
                {
                    var gs = new GameSegment(this);
                    gs.GameSegmentId = createGameMessageResponse.GameSegmentId;

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
                BuildNeighbors(pUser, i);
            }
        }

        private GameWorldNeighbor determineClosestNeighbor(GameWorldUser pUser)
        {
            var closestNeighbor = pUser.ClosestNeighbor();

            if (closestNeighbor != null)
            {
                return closestNeighbor;
            }


            var count = Users.Count;
            var closestDistance = double.MaxValue;

            for (var c = 0; c < count; c++)
            {
                var cUser = Users[c];
                var distance = PointDistance(pUser, cUser);
                if (distance < closestDistance)
                {
                    closestNeighbor = new GameWorldNeighbor(cUser, distance);
                    closestDistance = distance;
                }
            }
            return closestNeighbor;
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

            var dis = Math.Sqrt((_x * _x) + (_y * _y));
            return dis;
        }
    }
}