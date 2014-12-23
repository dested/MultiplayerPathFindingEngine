using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameSegmentCluster;
using Pather.Common.Models.GameWorld;
using Pather.Common.Utils.Promises;
using Pather.Servers.Database;

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
                    AddUserToSegment(gwUser, gameSegment)
                        .Then(() =>
                        {
                            Users.Add(gwUser);
                            Global.Console.Log("", "Gameworld has added a new user to game segment", gameSegment.GameSegmentId, "bring the total number of players to", Users.Count, ". The game segment has", gameSegment.Users.Count, "users.");

                            defer.Resolve(gwUser);
                        });
                });
            return defer.Promise;
        }

        private Promise<GameSegment, UndefinedPromiseError> DetermineGameSegment(GameWorldUser gwUser)
        {
            var deferred = Q.Defer<GameSegment, UndefinedPromiseError>();

            if (Users.Count == 0)
            {
                Global.Console.Log("Creating new segment.");
                CreateGameSegment()
                    .Then((gameSegment) =>
                    {
                        Global.Console.Log("New segment created.");
                        deferred.Resolve(gameSegment);
                    });
            }
            else
            {
                deferred.PassPromiseThrough(FindBestGameSegment(gwUser));
            }

            return deferred.Promise;
        }

        private Promise<GameSegment, UndefinedPromiseError> FindBestGameSegment(GameWorldUser gwUser)
        {
            var deferred = Q.Defer<GameSegment, UndefinedPromiseError>();
            var neighbor = DetermineClosestNeighbor(gwUser);

            var neighborGameSegment = neighbor.User.GameSegment;
            if (CanAcceptNewUsers(neighborGameSegment))
            {
                deferred.Resolve(neighborGameSegment);
            }
            else
            {
                throw new NotImplementedException("todo split gamesegment up?");
            }

            return deferred.Promise;
        }

        private bool CanAcceptNewUsers(GameSegment gameSegment)
        {
            return gameSegment.Users.Count < Constants.UsersPerGameSegment;
        }

        private Promise AddUserToSegment(GameWorldUser gwUser, GameSegment gameSegment)
        {
            var deferred = Q.Defer();
            deferred.PassThrough(gameSegment.AddUserToSegment(gwUser));
            return deferred.Promise;
        }


        public Promise<GameSegment, UndefinedPromiseError> CreateGameSegment()
        {
            var deferred = Q.Defer<GameSegment, UndefinedPromiseError>();

            var createGameMessage = new CreateGameSegment_GameSegmentCluster_PubSub_ReqRes_Message()
            {
                GameSegmentId = Pather.Common.Common.UniqueId(),
            };

            GameWorldPubSub.PublishToGameSegmentClusterWithCallback<CreateGameSegment_Response_GameWorld_PubSub_Message>(gameSegmentClusterId, createGameMessage)
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

        private GameWorldNeighbor DetermineClosestNeighbor(GameWorldUser pUser)
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

            var dis = Math.Sqrt((_x*_x) + (_y*_y));
            return dis;
        }
    }
}