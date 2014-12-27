using System;
using System.Runtime.CompilerServices;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Servers.Common.PubSub;

namespace Pather.Servers.Common.ServerLogging
{
    public static class ServerLogger
    {
        private static IPubSub pubsub;
        private static string ServerType;
        private static string ServerName;

        public static void InitLogger(string serverType, string serverName)
        {
            ServerName = serverName;
            ServerType = serverType;
            pubsub = new PubSub.PubSub();
            pubsub.DontLog();
            pubsub.Init().Then(() =>
            {
                Global.SetInterval(() => LogKeepAlive(), 500);
            });
        }

        public static void LogInformation(string item, params object[] jsonContent)
        {
            Logger.Log(item, LogLevel.Information);
            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.Information, DateTime.Now));
        }

        public static void LogDebug(string item, params object[] jsonContent)
        {
            Logger.Log(item, LogLevel.DebugInformation);
            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.DebugInformation, DateTime.Now));
        }

        public static void LogKeepAlive()
        {
            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, null, null, LogLevel.KeepAlive, DateTime.Now));
        }

        public static void LogError(string item, params object[] jsonContent)
        {
            Logger.Log(item, LogLevel.Error);
            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.Error, DateTime.Now));
        }

        public static void LogTransport(string item, params object[] jsonContent)
        {
            Logger.Log(item, LogLevel.TransportInfo);
            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.TransportInfo, DateTime.Now));
        }

        public static void LogData(string item, params object[] jsonContent)
        {
            Logger.Log(item, LogLevel.DataInfo);
            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.DataInfo, DateTime.Now));
        }
    }
}