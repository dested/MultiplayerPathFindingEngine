using System;
using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Pather.Servers.Common.ServerLogging;
using Pather.Servers.GameSegmentServer.Models;

namespace Pather.Servers.GameSegmentServer
{
    public class GameSegment
    {
        public GameSegment(string gameSegmentId)
        {
            GameSegmentId = gameSegmentId;
        }

        public JsDictionary<string, GameSegmentUser> Users = new JsDictionary<string, GameSegmentUser>();


        public void UserLeft(string userId)
        {
            var user = Users[userId];
            if (user == null)
            {
                throw new Exception("IDK Who this user is:" + userId);
            }

            Users.Remove(userId);

            Global.Console.Log(GameSegmentId, "User Left Game Segment");
            ServerLogger.LogInformation("User Left Game Segment", "User count now: ", Users.Count);
        }

        public string GameSegmentId;

        public void UserJoin(GameSegmentUser gameSegmentUser)
        {
            Users[gameSegmentUser.UserId] = gameSegmentUser;
            ServerLogger.LogInformation("User Joined A Game Segment");
//            Global.Console.Log(GameSegmentId, "User Joined A Game Segment", gameSegmentUser.UserId, gameSegmentUser.GatewayId);
        }
    }
}