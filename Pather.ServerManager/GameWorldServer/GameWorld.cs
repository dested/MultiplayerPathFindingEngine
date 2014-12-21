using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Utils.Promises;
using Pather.ServerManager.Database;

namespace Pather.ServerManager.GameWorldServer
{
    public class GameWorld
    {
        public List<GameWorldUser> Users;
        public List<GameSegment> GameServers;

        public GameWorld()
        {
            Users = new List<GameWorldUser>();
            GameServers = new List<GameSegment>();

        }

        public Promise<GameWorldUser, UserJoinError> UserJoined(string gatewayChannel, DBUser dbUser)
        {

            var defer = Q.Defer<GameWorldUser, UserJoinError>();

            var gwUser = new GameWorldUser();
            gwUser.UserId = dbUser.UserId;
            gwUser.X = dbUser.X;
            gwUser.Y = dbUser.Y;
            gwUser.Neighbors = new List<GameWorldUser>();
            gwUser.GatewayServer = gatewayChannel;

            GameSegment closestGameSegment;
            if (Users.Count == 0)
            {
                closestGameSegment = CreateGameServer();
            }
            else
            {
                var closestUser = DetermineNeighbors(gwUser);
                closestGameSegment = closestUser.GameSegment;
            }
            closestGameSegment.AddUserToSegment(gwUser);

            Users.Add(gwUser);
            Global.Debugger();
            Global.Console.Log("Gameworld has added a new user to game segment", closestGameSegment.GameServerId, "bring the total number of players to", Users.Count, ". The game segment has", closestGameSegment.Users.Count, "users.");

            defer.Resolve(gwUser);
            return defer.Promise;
        }

        public GameSegment CreateGameServer()
        {
            var gs = new GameSegment();
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