using System;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Utils;
using Pather.Servers.Common.ServerLogging;

namespace Pather.Servers.GameSegmentServer
{
    public class GameSegment
    {
        private ServerLogger serverLogger;
        public GameSegment(string gameSegmentId,ServerLogger serverLogger)
        {
            this.serverLogger = serverLogger;
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

            serverLogger.LogInformation("User Left Game Segment", "User count now: ", Users.Count);
        }

        public string GameSegmentId;

        public void UserJoin(ServerGameUser serverGameUser)
        {
            serverGameUser.GameSegment = this;
            Users.Add(serverGameUser);
            serverLogger.LogInformation("User Joined A Game Segment", "User count now: ", Users.Count);
        }
    }
}