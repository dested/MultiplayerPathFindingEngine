using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Utils;
using Pather.Common.Utils.Promises;
using Pather.Servers.GameWorldServer.Models;
using Pather.Servers.Libraries.RTree;

namespace Pather.Servers.GameWorldServer
{
    public class ReorganizeManager
    {
        private readonly List<GameWorldUser> gameWorldUsers;
        private readonly List<GameSegment> segments;
        private readonly Func<Promise<GameSegment, UndefinedPromiseError>> createGameSegment;
        private RTree<GameWorldUser> tree;

        private ReorganizeManager(List<GameWorldUser> gameWorldUsers, List<GameSegment> segments, Func<Promise<GameSegment, UndefinedPromiseError>> createGameSegment)
        {
            this.gameWorldUsers = gameWorldUsers;
            this.segments = segments;
            this.createGameSegment = createGameSegment;
        }

        private Promise<List<PlayerCluster>, UndefinedPromiseError> reorganize()
        {
            var deferred = Q.Defer<List<PlayerCluster>, UndefinedPromiseError>();


            Global.Console.Log("Start Reorganize");
            tree = new RTree<GameWorldUser>();

            foreach (var gameWorldUser in gameWorldUsers)
            {
//                Global.Console.Log("user:", gameWorldUser.UserId, gameWorldUser.X, gameWorldUser.Y);
                tree.Add(new Rectangle((float)gameWorldUser.X, (float)gameWorldUser.Y), gameWorldUser);
            }
//            Global.Console.Log("Building Neighbors");

            var userAndNeighbors = determineUserNeighbors(gameWorldUsers);

//            Global.Console.Log("Building Player Clusters");

            var playerClusters = buildPlayerClusters(userAndNeighbors);

//            Global.Console.Log("Determining best gamesegment for each player cluster");

            determineBestGameSegment(playerClusters).Then(() =>
            {
                deferred.Resolve(playerClusters);
            });


            return deferred.Promise;
        }

        public static Promise<List<PlayerCluster>, UndefinedPromiseError> Reorganize(List<GameWorldUser> gameWorldUsers, List<GameSegment> segments, Func<Promise<GameSegment, UndefinedPromiseError>> createGameSegment)
        {
            var reorgManager = new ReorganizeManager(gameWorldUsers, segments, createGameSegment);
            return reorgManager.reorganize();
        }

        /* Absalom P. Sanguinet's Vibrella.*/

        private Promise determineBestGameSegment(List<PlayerCluster> clusters)
        {
            var deferred = Q.Defer();

            if (clusters.Count == 0)
            {
                deferred.Resolve();
            }


            var numberOfUsersInGameSegment = new JsDictionary<string, int>();

            var index = 0;
            Action processNext = null;

            processNext = () =>
            {
                determineBestGameSegment(clusters[index], numberOfUsersInGameSegment).Then(() =>
                {
                    index++;
                    if (index < clusters.Count)
                    {
                        processNext();
                    }
                    else
                    {
                        deferred.Resolve();
                    }
                });
            };

            processNext();


            return deferred.Promise;
        }

        private Promise determineBestGameSegment(PlayerCluster playerCluster, JsDictionary<string, int> numberOfUsersInGameSegment)
        {
            var deferred = Q.Defer();


            var founds = new List<Tuple<int, GameSegment>>();

            //testing each current game segment to see how many of our player cluster users it contains
            foreach (var gameSegment in segments)
            {
                var found = 0;
                foreach (var gameWorldUser in gameSegment.Users)
                {
                    if (playerCluster.Players.Contains(gameWorldUser))
                    {
                        found++;
                    }
                }

                founds.Add(new Tuple<int, GameSegment>(found, gameSegment));
            }
            //sorting to see which one contains the most of our users
            founds.Sort((a, b) => b.Item1 - a.Item1);

//            Global.Console.Log("Cluster gs", founds.Select(a => new{a.Item1,a.Item2.GameSegmentId}));
            //try all the gamesegments
            foreach (var gameSegment in founds)
            {
                var bestGameSegment = gameSegment.Item2;
                if (!numberOfUsersInGameSegment.ContainsKey(bestGameSegment.GameSegmentId))
                {
                    numberOfUsersInGameSegment[bestGameSegment.GameSegmentId] = 0;
                }

                //if this gamesegment can squeeze my clusters worth of players in it
//                Global.Console.Log("trying", bestGameSegment.GameSegmentId, numberOfUsersInGameSegment[bestGameSegment.GameSegmentId] + playerCluster.Players.Count);
                if (numberOfUsersInGameSegment[bestGameSegment.GameSegmentId] + playerCluster.Players.Count <= Constants.UsersPerGameSegment)
                {
//                    Global.Console.Log("setting best", bestGameSegment.GameSegmentId);
                    numberOfUsersInGameSegment[bestGameSegment.GameSegmentId] += playerCluster.Players.Count;
                    //this gamesegment is best for my cluster
                    playerCluster.BestGameSegment = bestGameSegment;
                    break;
                }
            }
            //if we never found a best game segment because the other ones are full, create a new one!
            if (playerCluster.BestGameSegment == null)
            {
//                Global.Console.Log("Create new game cluster buster!");
                createGameSegment().Then(gameSegment =>
                {
                    //new one created, continue!
//                    Global.Console.Log("setting new segment as best", gameSegment.GameSegmentId);
                    numberOfUsersInGameSegment[gameSegment.GameSegmentId] += playerCluster.Players.Count;
                    playerCluster.BestGameSegment = gameSegment;
                    deferred.Resolve();
                });
            }
            else
            {
                deferred.Resolve();
            }

            return deferred.Promise;
        }

        private DictionaryList<string, UserAndNeighbors> determineUserNeighbors(List<GameWorldUser> players)
        {
            var userAndNeighbors = new DictionaryList<string, UserAndNeighbors>(a => a.Player.UserId);

            for (var index = 0; index < players.Count; index++)
            {
                var currentPlayer = players[index];

                //determining nearest users
                var nearest = tree.Nearest(new RTreePoint((float)currentPlayer.X, (float)currentPlayer.Y), Constants.ClusterGroupViewRadius);

                var playerClusterInfo = new UserAndNeighbors(currentPlayer);

                for (var i = 0; i < nearest.Count; i++)
                {
                    var nearPlayer = nearest[i];
                    //if nearplayer isnt me
                    if (nearPlayer == currentPlayer) continue;

                    //he is a neighbor of mine
                    playerClusterInfo.Neighbors.Add(new GameWorldNeighbor(nearPlayer, pointDistance(nearPlayer, currentPlayer)));
                }
//                Global.Console.Log("Player Cluster: ", playerClusterInfo.Player.UserId, "Neighbors:", playerClusterInfo.Neighbors.Select(a => new{a.Distance,a.User.UserId}));

                userAndNeighbors.Add(playerClusterInfo);
            }
            return userAndNeighbors;
        }

        private List<PlayerCluster> buildPlayerClusters(DictionaryList<string, UserAndNeighbors> userNeighbors)
        {
            var unClusteredPlayers = new DictionaryList<string, UserAndNeighbors>(userNeighbors);
            var playerClusters = new List<PlayerCluster>();

            //looping through all players
            while (unClusteredPlayers.Count > 0)
            {
                //determining their nearest neighbors
                var playerClusterInfoHits = GetPlayerCluster(unClusteredPlayers.List.First(), unClusteredPlayers);
                var cluster = new PlayerCluster();
                //merging them into a player cluster
                for (var index = 0; index < playerClusterInfoHits.Count; index++)
                {
                    var playerClusterInfoHit = playerClusterInfoHits[index];
                    cluster.Players.Add(playerClusterInfoHit);
                }

                playerClusters.Add(cluster);

                //Console.WriteLine(string.Format("Players Left: {0}, Clusters Total: {1} ", hitPlayerCount, playerClusters.Count));
            }
//            Global.Console.Log(playerClusters.Select(a => a.Players.Select(b => new{b.UserId,b.X,b.Y})));
            return playerClusters;
        }

        private List<GameWorldUser> GetPlayerCluster(UserAndNeighbors currentUser, DictionaryList<string, UserAndNeighbors> unClusteredPlayers)
        {
            var clusteredPlayers = new DictionaryList<string, GameWorldUser>(a => a.UserId);
            var neighbors = new List<GameWorldNeighbor>();

            //eligible users
            neighbors.Add(new GameWorldNeighbor(currentUser.Player, 0));
            var totalPlayers = 0;
            while (neighbors.Count > 0)
            {
                var currentUserNeighbor = neighbors[0];
//                Global.Console.Log(currentUserNeighbor.User.UserId);

                //if hes already allocated, or hes already part of our cluster
                if (!unClusteredPlayers.Contains(currentUserNeighbor.User.UserId) ||
                    clusteredPlayers.Contains(currentUserNeighbor.User.UserId))
                {
                    //remove him from eligibility
                    neighbors.Remove(currentUserNeighbor);
                    continue;
                }
                //add him to our cluster
                clusteredPlayers.Add(currentUserNeighbor.User);
                totalPlayers++;
                var gameWorldNeighbors = unClusteredPlayers[currentUserNeighbor.User.UserId].Neighbors;


                unClusteredPlayers.Remove(currentUserNeighbor.User.UserId);

                //if we've hit our users per segment limit, we're done
                if (totalPlayers == Constants.UsersPerGameSegment) break;
                //add neighbors as eligible neighbors
                foreach (var playerNeighbor in gameWorldNeighbors)
                {
                    neighbors.Add(playerNeighbor);
                }
                //remove the current user
                neighbors.Remove(currentUserNeighbor);

                //order them by closest
                neighbors.Sort((a, b) => (int) (a.Distance - b.Distance));
//                Global.Console.Log(neighbors.Select(a => new{a.Distance,a.User.UserId}));
                //purge for performance gains
                if (neighbors.Count > 100)
                {
                    neighbors.RemoveRange(100, neighbors.Count - 100);
                }

                //try the next closest neighbor
            }
            return clusteredPlayers.List;
        }


        private static double pointDistance(GameWorldUser nearPlayer, GameWorldUser currentPlayer)
        {
            return Math.Sqrt((Math.Pow(currentPlayer.X - nearPlayer.X, 2) + Math.Pow(currentPlayer.Y - nearPlayer.Y, 2)));
        }
    }
}