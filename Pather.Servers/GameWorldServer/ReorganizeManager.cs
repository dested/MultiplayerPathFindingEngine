using System;
using System.Collections.Generic;
using Pather.Servers.GameWorldServer.Models;
using Pather.Common.Utils;
using Pather.Servers.Libraries.RTree;

namespace Pather.Servers.GameWorldServer
{
    public class ReorganizeManager
    {
        private readonly List<GameWorldUser> gameWorldUsers;
        private readonly List<GameSegment> segments;
        private RTree<Models.GameWorldUser> tree;
        private static int MaxClusterSize = 200;
        private int viewRadius = 60;

        private ReorganizeManager(List<GameWorldUser> gameWorldUsers, List<GameSegment> segments)
        {
            this.gameWorldUsers = gameWorldUsers;
            this.segments = segments;
        }

        private List<PlayerCluster> Reorganize()
        {
            tree = new RTree<GameWorldUser>();

            foreach (var gameWorldUser in gameWorldUsers)
            {
                tree.Add(new Rectangle(gameWorldUser.X, gameWorldUser.Y), gameWorldUser);
            }

            var playerClusters = buildClusters(gameWorldUsers, viewRadius);
            GroupToSegments(playerClusters);
            return playerClusters;
        }

        public static List<PlayerCluster> Reorganize(List<GameWorldUser> gameWorldUsers, List<GameSegment> segments)
        {
            var reorgManager = new ReorganizeManager(gameWorldUsers, segments);
            return reorgManager.Reorganize();
        }

        /* Absalom P. Sanguinet's Vibrella.*/
        private void GroupToSegments(List<PlayerCluster> clusters)
        {
            JsDictionary<string, int> numberOfUsersInCluster = new JsDictionary<string, int>();

            foreach (var playerCluster in clusters)
            {
                List<Tuple<int, GameSegment>> founds = new List<Tuple<int, GameSegment>>();

                foreach (var gameSegment in segments)
                {
                    int found = 0;
                    foreach (var gameWorldUser in gameSegment.Users)
                    {
                        if (playerCluster.Players.Contains(gameWorldUser))
                        {
                            found++;
                        }
                    }

                    founds.Add(new Tuple<int, GameSegment>(found, gameSegment));
                }

                founds.Sort((a, b) => a.Item1 - b.Item1);

                var bestIndex = 0;

                while (bestIndex < founds.Count)
                {

                    var bestGameSegment = founds[bestIndex].Item2;
                    if (!numberOfUsersInCluster.ContainsKey(bestGameSegment.GameSegmentId))
                    {
                        numberOfUsersInCluster[bestGameSegment.GameSegmentId] = 0;
                    }

                    if (numberOfUsersInCluster[bestGameSegment.GameSegmentId] + playerCluster.Players.Count < MaxClusterSize)
                    {
                        numberOfUsersInCluster[bestGameSegment.GameSegmentId] += MaxClusterSize;
                        playerCluster.BestGameSegment = bestGameSegment;
                    }
                    else
                    {
                        bestIndex++;
                    }
                }
                if (playerCluster.BestGameSegment == null)
                {
                    //TODO CREATE NEW CLUSTER FOOL!
                }
            }
        }




/*
        private List<PlayerClusterGroup> GroupClusters(List<PlayerCluster> clusters)
        {
            List<PlayerClusterGroup> playerClusterGroups = new List<PlayerClusterGroup>();
            List<PlayerCluster> clonePlayerClusters = new List<PlayerCluster>(clusters.OrderBy(a => -a.Players.Count));


            while (clonePlayerClusters.Count > 0)
            {

                PlayerClusterGroup currentPlayerCluster = new PlayerClusterGroup();

                for (int index = clonePlayerClusters.Count - 1; index >= 0; index--)
                {
                    var clonePlayerCluster = clonePlayerClusters[index];
                    if (currentPlayerCluster.NumberOfPlayers + clonePlayerCluster.Players.Count <= MaxClusterSize)
                    {
                        currentPlayerCluster.PlayerClusters.Add(clonePlayerCluster);
                        currentPlayerCluster.NumberOfPlayers += clonePlayerCluster.Players.Count;
                        clonePlayerClusters.RemoveAt(index);


                        if (currentPlayerCluster.NumberOfPlayers == MaxClusterSize)
                        {
                            break;
                        }
                    }
                }
                playerClusterGroups.Add(currentPlayerCluster);
            }

            return playerClusterGroups;
            /*       foreach (var playerClusterGroup in playerClusterGroups)
                   {

                       var color = playerClusterGroup.PlayerClusters[0].Color;

                       foreach (var playerCluster in playerClusterGroup.PlayerClusters)
                           playerCluster.Color = color;

                       Console.WriteLine(string.Format("Number Of Clusters: {0}, Number Of Players: {1}", playerClusterGroup.PlayerClusters.Count, playerClusterGroup.NumberOfPlayers));
                   }

                   Console.WriteLine(string.Format("Number Of Cluster Groups: {0}", playerClusterGroups.Count));#1#
        }
*/



        private List<PlayerCluster> buildClusters(List<GameWorldUser> players, int viewRadius)
        {

            var clusters = ClusterTree(tree, players, viewRadius);

            /*

                        Console.WriteLine(string.Format("Clusters {0}", clusters.Count));
                        for (int i = 1; i <= MaxClusterSize; i++)
                        {
                            Console.WriteLine(string.Format("Clusters with {1} {0}", clusters.Count(a => a.Players.Count == i), i));
                        }

                        clusters.Sort((a, b) =>
                        {
                            return b.Players.Count - a.Players.Count;
                        });

                        for (int i = 0; i < clusters.Count; i++)
                        {
                            if (clusters[i].Players.Count <= MaxClusterSize) continue;
                            Console.WriteLine(string.Format("Cluster[{0}] Size {1}", i + 1, clusters[i].Players.Count));
                        }
            */


            return clusters;
        }
        private List<PlayerCluster> ClusterTree(RTree<GameWorldUser> tree, List<GameWorldUser> players, int viewRadius)
        {
            var playerClusterInformations = buildPlayerClusterInformations(tree, players, viewRadius);

            var playerClusters = buildPlayerClusters(players, playerClusterInformations);
            return playerClusters;

        }
        private Dictionary<GameWorldUser, PlayerClusterInfo> buildPlayerClusterInformations(RTree<GameWorldUser> tree, List<GameWorldUser> players, int viewRadius)
        {
            Dictionary<GameWorldUser, PlayerClusterInfo> playerClusterInformations = new Dictionary<GameWorldUser, PlayerClusterInfo>();

            for (int index = 0; index < players.Count; index++)
            {
                var currentPlayer = players[index];
                List<GameWorldUser> nearest = tree.Nearest(new RTreePoint(currentPlayer.X, currentPlayer.Y), viewRadius);

                PlayerClusterInfo playerClusterInfo = new PlayerClusterInfo(currentPlayer);

                for (int i = 0; i < nearest.Count; i++)
                {
                    var nearPlayer = nearest[i];
                    if (nearPlayer == currentPlayer) continue;
                    playerClusterInfo.Neighbors.Add(new Tuple<double, GameWorldUser>(pointDistance(nearPlayer, currentPlayer), nearPlayer));
                }

                playerClusterInformations.Add(currentPlayer, playerClusterInfo);
            }
            return playerClusterInformations;
        }
        private List<PlayerCluster> buildPlayerClusters(List<GameWorldUser> players, Dictionary<GameWorldUser, PlayerClusterInfo> playerClusterInformations)
        {
            JsDictionary<string, GameWorldUser> hitPlayers = players.ToDictionary(a => a.UserId);
            List<PlayerCluster> playerClusters = new List<PlayerCluster>();
            int hitPlayerCount = players.Count;


            var playerClusterInfoHits = new JsDictionary<string, PlayerClusterInfo>();
            var playerClusterInfoHitsArray = new List<PlayerClusterInfo>();

            while (hitPlayerCount > 0)
            {
                playerClusterInfoHits.Clear();
                playerClusterInfoHitsArray.Clear();

                GetPlayerCluster(playerClusterInfoHits, playerClusterInfoHitsArray, playerClusterInformations, playerClusterInformations[hitPlayers[hitPlayers.Keys.First()]], hitPlayers);
                PlayerCluster cluster = new PlayerCluster();
                for (int index = 0; index < playerClusterInfoHitsArray.Count; index++)
                {
                    var playerClusterInfoHit = playerClusterInfoHitsArray[index];
                    cluster.Players.Add(playerClusterInfoHit.Player);
                    hitPlayers.Remove(playerClusterInfoHit.Player.UserId);
                    hitPlayerCount--;
                }

                playerClusters.Add(cluster);

                //                Console.WriteLine(string.Format("Players Left: {0}, Clusters Total: {1} ", hitPlayerCount, playerClusters.Count));
            }
            return playerClusters;
        }
        private void GetPlayerCluster(JsDictionary<string, PlayerClusterInfo> playerClusterInfoHits, List<PlayerClusterInfo> playerClusterInfoHitsArray, Dictionary<GameWorldUser, PlayerClusterInfo> allPlayerClusterInformations, PlayerClusterInfo currentPlayerClusterInfo, JsDictionary<string, GameWorldUser> hitPlayers)
        {

            List<Tuple<double, PlayerClusterInfo>> neighbors = new List<Tuple<double, PlayerClusterInfo>>();
            neighbors.Add(new Tuple<double, PlayerClusterInfo>(0, currentPlayerClusterInfo));
            int totalPlayers = 0;
            while (neighbors.Count > 0)
            {
                var activePlayerClusterInfo = neighbors[0];


                if (!hitPlayers.ContainsKey(activePlayerClusterInfo.Item2.Player.UserId) || playerClusterInfoHits.ContainsKey(activePlayerClusterInfo.Item2.Player.UserId))
                {
                    neighbors.Remove(activePlayerClusterInfo);
                    continue;
                }
                playerClusterInfoHits[activePlayerClusterInfo.Item2.Player.UserId] = activePlayerClusterInfo.Item2;
                playerClusterInfoHitsArray.Add(activePlayerClusterInfo.Item2);
                totalPlayers++;
                if (totalPlayers == MaxClusterSize) return;
                foreach (Tuple<double, GameWorldUser> playerNeighbor in activePlayerClusterInfo.Item2.Neighbors)
                {
                    neighbors.Add(new Tuple<double, PlayerClusterInfo>(playerNeighbor.Item1, allPlayerClusterInformations[playerNeighbor.Item2]));
                }
                neighbors.Remove(activePlayerClusterInfo);

                neighbors.Sort((a, b) => (int)(a.Item1 - b.Item1));
                if (neighbors.Count > 100)
                {
                    neighbors.RemoveRange(100, neighbors.Count - 100);
                }


            }


        }


        private static double pointDistance(GameWorldUser nearPlayer, GameWorldUser currentPlayer)
        {
            return (Math.Pow(currentPlayer.X - nearPlayer.X, 2) + Math.Pow(currentPlayer.Y - nearPlayer.Y, 2));

        }


    }
    internal class PlayerClusterInfo
    {
        public PlayerClusterInfo(GameWorldUser player)
        {
            Player = player;
            Neighbors = new List<Tuple<double, GameWorldUser>>();
        }

        public GameWorldUser Player;
        public List<Tuple<double, GameWorldUser>> Neighbors;
    }

    public class PlayerCluster
    {
        public PlayerCluster()
        {
            Players = new List<GameWorldUser>();
        }

        public List<GameWorldUser> Players;
        public GameSegment BestGameSegment;
    }
    public class PlayerClusterGroup
    {
        public PlayerClusterGroup()
        {
            PlayerClusters = new List<PlayerCluster>();
            NumberOfPlayers = 0;
        }

        public int NumberOfPlayers;
        public List<PlayerCluster> PlayerClusters;
    }


}