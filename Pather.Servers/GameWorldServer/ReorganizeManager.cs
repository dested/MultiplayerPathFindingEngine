using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Utils;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common.ServerLogging;
using Pather.Servers.GameWorldServer.Models;
using Pather.Servers.Libraries.RTree;

namespace Pather.Servers.GameWorldServer
{
    public class ReorganizeManager
    {
        private readonly List<GameWorldUser> gameWorldUsers;
        private readonly List<GameSegment> segments;
        private readonly Func<Promise<GameSegment, UndefinedPromiseError>> createGameSegment;
        private readonly ServerLogger serverLogger;
        private RTree<GameWorldUser> tree;

        private ReorganizeManager(List<GameWorldUser> gameWorldUsers, List<GameSegment> segments, Func<Promise<GameSegment, UndefinedPromiseError>> createGameSegment, ServerLogger serverLogger)
        {
            this.gameWorldUsers = gameWorldUsers;
            this.segments = segments;
            this.createGameSegment = createGameSegment;
            this.serverLogger = serverLogger;
        }

        private Promise<List<PlayerCluster>, UndefinedPromiseError> reorganize()
        {
            var deferred = Q.Defer<List<PlayerCluster>, UndefinedPromiseError>();


            tree = new RTree<GameWorldUser>();

            foreach (var gameWorldUser in gameWorldUsers)
            {
                serverLogger.LogDebug("user:", gameWorldUser.UserId, gameWorldUser.X, gameWorldUser.Y);
                tree.Add(new Rectangle((float)gameWorldUser.X, (float)gameWorldUser.Y), gameWorldUser);
            }
            serverLogger.LogDebug("Building Neighbors");

            var userAndNeighbors = determineUserNeighbors(gameWorldUsers);

            serverLogger.LogDebug("Building Player Clusters");

            var playerClusters = buildPlayerClusters(userAndNeighbors);
            if (playerClusters.Count == 0)
            {
                deferred.Resolve(playerClusters);
            }
            else
            {
                serverLogger.LogDebug("Determining best gamesegment for each player cluster");

                determineBestGameSegment(playerClusters).Then(() =>
                {
                    deferred.Resolve(playerClusters);
                });
            }


            return deferred.Promise;
        }

        public static Promise<List<PlayerCluster>, UndefinedPromiseError> Reorganize(List<GameWorldUser> gameWorldUsers, List<GameSegment> segments, Func<Promise<GameSegment, UndefinedPromiseError>> createGameSegment, ServerLogger serverLogger)
        {
            var reorgManager = new ReorganizeManager(gameWorldUsers, segments, createGameSegment, serverLogger);
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

            serverLogger.LogDebug("Cluster gs", founds.Select(a => new { a.Item1, a.Item2.GameSegmentId }));
            //try all the gamesegments
            foreach (var gameSegment in founds)
            {
                var bestGameSegment = gameSegment.Item2;
                if (!numberOfUsersInGameSegment.ContainsKey(bestGameSegment.GameSegmentId))
                {
                    numberOfUsersInGameSegment[bestGameSegment.GameSegmentId] = 0;
                }

                serverLogger.LogDebug("trying", bestGameSegment.GameSegmentId, numberOfUsersInGameSegment[bestGameSegment.GameSegmentId] + playerCluster.Players.Count);
                //if this gamesegment can squeeze my clusters worth of players in it
                if (numberOfUsersInGameSegment[bestGameSegment.GameSegmentId] + playerCluster.Players.Count <= Constants.UsersPerGameSegment)
                {
                    serverLogger.LogDebug("setting best", bestGameSegment.GameSegmentId);
                    numberOfUsersInGameSegment[bestGameSegment.GameSegmentId] += playerCluster.Players.Count;
                    //this gamesegment is best for my cluster
                    playerCluster.BestGameSegment = bestGameSegment;
                    break;
                }
            }
            //if we never found a best game segment because the other ones are full, create a new one!
            if (playerCluster.BestGameSegment == null)
            {
                serverLogger.LogDebug("Create new game cluster buster!");
                createGameSegment().Then(gameSegment =>
                {
                    //new one created, continue!
                    serverLogger.LogDebug("setting new segment as best", gameSegment.GameSegmentId);
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
                serverLogger.LogDebug("Player Cluster: ", playerClusterInfo.Player.UserId, "Neighbors:", playerClusterInfo.Neighbors.Select(a => new { a.Distance, a.User.UserId }));

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
                
            }
            serverLogger.LogDebug("Player clusters:", playerClusters.Select(a => a.Players.Select(b => new { b.UserId, b.X, b.Y })));
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
                serverLogger.LogDebug(currentUserNeighbor.User.UserId);

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
                neighbors.Sort((a, b) => (int)(a.Distance - b.Distance));
                serverLogger.LogDebug("Neighbors:",neighbors.Select(a => new { a.Distance, a.User.UserId }));
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