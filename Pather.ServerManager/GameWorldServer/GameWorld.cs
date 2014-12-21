using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Utils.Promises;
using Pather.ServerManager.Database;

namespace Pather.ServerManager.GameWorldServer
{
    public class GameWorld
    {
        public List<GameWorldUser> Users;
        public List<GameServer> GameServers;

        public GameWorld()
        {
            Users = new List<GameWorldUser>();
            GameServers = new List<GameServer>();

        }

        public Promise<GameWorldUser, UserJoinError> UserJoined(DBUser dbUser)
        {

            var defer = Q.Defer<GameWorldUser, UserJoinError>();

            var gwUser = new GameWorldUser();
            gwUser.X = dbUser.X;
            gwUser.Y = dbUser.Y;
            gwUser.Neighbors = new List<GameWorldUser>();

            GameServer closestGameServer = null;
            if (Users.Count == 0)
            {
                closestGameServer = CreateGameServer();
            }
            else
            {
                var closestUser = DetermineNeighbors(gwUser);
                closestGameServer = closestUser.GameServer;
            }

            gwUser.GameServer = closestGameServer;

            Users.Add(gwUser);

            defer.ResolveInATick(gwUser);

            return defer.Promise;
        }

        public GameServer CreateGameServer()
        {
            var gs = new GameServer();
            gs.GameServerId = Pather.Common.Common.UniqueId();
            //todo idk :=/

            GameServers.Add(gs);
            return gs;
        }


        public void DetermineNeighbors()
        {
            int count = Users.Count;
            for (int i = 0; i < count; i++)
            {
                var pUser = Users[i];
                pUser.Neighbors.Clear();
                DetermineNeighbors(pUser, i);
            }
        }

        private GameWorldUser DetermineNeighbors(GameWorldUser pUser, int i = 0)
        {
            int count = Users.Count;
            var closestDistance = double.MaxValue;
            GameWorldUser closestUser = null;

            for (int c = i; c < count; c++)
            {
                var cUser = Users[c];
                var distance = PointDistance(pUser, cUser);
                if (distance < closestDistance)
                {
                    closestUser = cUser;
                    closestDistance = distance;
                }

                if (distance <= Constants.NeighborDistance)
                {
                    pUser.Neighbors.Add(cUser);
                    cUser.Neighbors.Add(pUser);
                }
            }
            return closestUser;
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