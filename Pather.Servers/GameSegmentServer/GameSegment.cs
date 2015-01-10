using System;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Utils;
using Pather.Servers.Common.ServerLogging;

namespace Pather.Servers.GameSegmentServer
{
    public class GameSegment
    {
        public GameSegment(string gameSegmentId)
        {
            GameSegmentId = gameSegmentId;
        }

        public DictionaryList<string, ServerGameUser> Users = new DictionaryList<string, ServerGameUser>(a => a.EntityId);


        public void UserLeft(string userId)
        {
            var user = Users[userId];
            if (user == null)
            {
                throw new Exception("IDK Who this user is:" + userId);
            }

            Users.Remove(userId);
            user.GameSegment = null;

            Global.Console.Log(GameSegmentId, "User Left Game Segment");
            ServerLogger.LogInformation("User Left Game Segment", "User count now: ", Users.Count);
        }

        public string GameSegmentId;

        public void UserJoin(ServerGameUser serverGameUser)
        {
            serverGameUser.GameSegment = this;
            Users.Add(serverGameUser);
            ServerLogger.LogInformation("User Joined A Game Segment");
            //            Global.Console.Log(GameSegmentId, "User Joined A Game Segment", serverGameUser.UserId, serverGameUser.GatewayId);
        }
    }
}