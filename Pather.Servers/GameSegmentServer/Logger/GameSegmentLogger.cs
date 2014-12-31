using System;
using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Pather.Servers.Common.PubSub;

namespace Pather.Servers.GameSegmentServer.Logger
{
    public static class GameSegmentLogger
    {
        private static IPubSub pubsub;
        private static string GameSegmentId;

        public static void InitLogger(string gameSegmentId)
        {
            GameSegmentId = gameSegmentId;
            pubsub = new PubSub();
            pubsub.DontLog();
            pubsub.Init(6380).Then(() =>
            {
                Global.SetInterval(() => LogKeepAlive(), 500);
            });
        }

        public static void LogKeepAlive()
        {
            pubsub.Publish(PubSubChannels.GameSegmentLogger(), new GameSegmentLogMessageContent(GameSegmentId, new KeepAlive_GameSegmentLogMessage(), DateTime.Now));
        }

        public static void LogUserJoin(bool isMine, string userId, int x, int y, List<string> neighbors)
        {
//            Global.Console.Log("Log-- User Join");
/*            pubsub.Publish(PubSubChannels.GameSegmentLogger(), new GameSegmentLogMessageContent(GameSegmentId, new UserJoined_GameSegmentLogMessage()
            {
                IsMine = isMine,
                UserId = userId,
                X = x,
                Y = y,
                Neighbors = neighbors
            }, DateTime.Now));*/
        }

        public static void LogUserLeft(bool isMine, string userId)
        {
//            Global.Console.Log("Log-- User Left");
/*            pubsub.Publish(PubSubChannels.GameSegmentLogger(), new GameSegmentLogMessageContent(GameSegmentId, new UserLeft_GameSegmentLogMessage()
            {
                IsMine = isMine,
                UserId = userId,
            }, DateTime.Now));*/
        }

        public static void LogUserMoved(string userId, int x, int y, List<string> neighbors)
        {
//            Global.Console.Log("Log-- User Moved");
/*            pubsub.Publish(PubSubChannels.GameSegmentLogger(), new GameSegmentLogMessageContent(GameSegmentId, new UserMoved_GameSegmentLogMessage()
            {
                UserId = userId,
                X = x,
                Y = y,
                Neighbors = neighbors
            }, DateTime.Now));*/
        }

        public static void LogTellUserMoved(string userId, int x, int y, List<string> neighbors)
        {
//            Global.Console.Log("Log-- tell User Moved");
            /*           pubsub.Publish(PubSubChannels.GameSegmentLogger(), new GameSegmentLogMessageContent(GameSegmentId, new TellUserMoved_GameSegmentLogMessage()
            {
                UserId = userId,
                X = x,
                Y = y,
                Neighbors = neighbors
            }, DateTime.Now));*/
        }
    }
}