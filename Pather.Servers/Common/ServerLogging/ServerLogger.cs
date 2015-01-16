using System;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Utils;
using Pather.Servers.Common.PubSub;

namespace Pather.Servers.Common.ServerLogging
{
    public class ServerLogger
    {
        private IPubSub pubsub;
        private string ServerType;
        private string ServerName;

        public ServerLogger(string serverType, string serverName="")
        {
            ServerName = serverName;
            ServerType = serverType;
            pubsub = new PubSub.PubSub();
            pubsub.DontLog();
            pubsub.Init(null,6380).Then(() =>
            {
                Global.SetInterval(() => LogKeepAlive(), 500);
            });
        }

        public void LogInformation(string item, params object[] jsonContent)
        {
            Logger.Log(ServerType+ServerName,item, jsonContent, LogLevel.Information);
            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.Information, DateTime.Now));
        }

        public void LogDebug(string item, params object[] jsonContent)
        {
            Logger.Log(ServerType + ServerName, item, jsonContent, LogLevel.DebugInformation);
            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.DebugInformation, DateTime.Now));
        }

        public void LogKeepAlive()
        {
            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, null, null, LogLevel.KeepAlive, DateTime.Now));
        }

        public void LogError(string item, params object[] jsonContent)
        {
            Logger.Log(ServerType + ServerName, item, jsonContent, LogLevel.Error);
            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.Error, DateTime.Now));
        }

        public void LogTransport(string item, params object[] jsonContent)
        {
            Logger.Log(ServerType + ServerName, item, jsonContent, LogLevel.TransportInfo);
            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.TransportInfo, DateTime.Now));
        }

        public void LogData(string item, params object[] jsonContent)
        {
            Logger.Log(ServerType + ServerName, item, jsonContent, LogLevel.DataInfo);
            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.DataInfo, DateTime.Now));
        }
    }

}