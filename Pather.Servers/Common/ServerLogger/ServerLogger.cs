using System;
using System.Runtime.CompilerServices;
using System.Serialization;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Servers.Common.PubSub;

namespace Pather.Servers.Common.ServerLogger
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
            pubsub.Init().Then(() =>
            {
                Global.SetInterval(() => LogKeepAlive(), 500);
            });
        }

        public static void LogInformation(string item, object jsonContent = null)
        {
            Logger.Log(item, LogLevel.Information);
            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.Information, DateTime.Now));

        }
        public static void LogDebug(string item, object jsonContent = null)
        {
            Logger.Log(item, LogLevel.DebugInformation);
            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.DebugInformation, DateTime.Now));

        }
        public static void LogKeepAlive()
        {
            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, null, null, LogLevel.KeepAlive, DateTime.Now));

        }
        public static void LogError(string item, object jsonContent = null)
        {
            Logger.Log(item, LogLevel.Error);
            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.Error, DateTime.Now));

        }
        public static void LogTransport(string item, object jsonContent = null)
        {
            Logger.Log(item, LogLevel.TransportInfo);
            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.TransportInfo, DateTime.Now));

        }
        public static void LogData(string item, object jsonContent = null)
        {
            Logger.Log(item, LogLevel.DataInfo);
            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.DataInfo, DateTime.Now));

        }

    }
    public class ServerLogListener
    {
        private PubSub.PubSub pubsub;
        private string ServerType;

        public ServerLogListener(string serverType, Action<ServerLogMessage> callback)
        {

            ServerType = serverType;
            pubsub = new PubSub.PubSub();
            pubsub.Init()
                .Then(() =>
                {
                    pubsub.Subscribe(PubSubChannels.ServerLogger(ServerType), (content) => callback(Json.Parse<ServerLogMessage>(content)));
                });
        }
    }
    [Serializable]
    public class ServerLogMessage
    {
        public DateTime Time { get; set; }
        public string ServerType { get; set; }
        public string ServerName { get; set; }
        public string Message { get; set; }
        public object Content { get; set; }
        public LogLevel LogLevel { get; set; }

        [ObjectLiteral]
        public ServerLogMessage(string serverType, string serverName, string message, object content, LogLevel logLevel, DateTime time)
        {
            ServerType = serverType;
            ServerName = serverName;
            Message = message;
            Content = content;
            LogLevel = logLevel;
            Time = time;
        }
    }
}