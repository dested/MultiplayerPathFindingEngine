using System;
using System.Runtime.CompilerServices;
using Pather.Common;

namespace Pather.Servers.Common.ServerLogging
{
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