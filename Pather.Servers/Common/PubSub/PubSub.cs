using System;
using System.Collections.Generic;
using System.Serialization;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common.ServerLogging;
using Pather.Servers.Libraries.Redis;

namespace Pather.Servers.Common.PubSub
{
    public class PubSub : IPubSub
    {
        private bool pready;
        private RedisClient pubClient;
        private bool sready;
        private RedisClient subClient;
        private JsDictionary<string, Action<string>> subbed;
        private bool dontLog;

        public PubSub()
        {
        }

        public Promise Init()
        {
            var deferred = Q.Defer();
            subbed = new JsDictionary<string, Action<string>>();

            var redis = Global.Require<Redis>("redis");
            redis.DebugMode = false;
            subClient = redis.CreateClient(6379, ConnectionConstants.RedisIP);
            pubClient = redis.CreateClient(6379, ConnectionConstants.RedisIP);
            subClient.On("subscribe", (string channel, int count) => Logger.Log("subscribed: " + channel + " " + count, LogLevel.Information));
            subClient.On("unsubscribe", (string channel, int count) => Logger.Log("unsubscribed: " + channel + " " + count, LogLevel.Information));

            subClient.On("message",
                (string channel, string message) =>
                {
                    ReceivedMessage(channel, message);
                });
            subClient.On("ready",
                () =>
                {
                    sready = true;
                    if (sready && pready)
                        deferred.Resolve();
                });
            pubClient.On("ready",
                () =>
                {
                    pready = true;
                    if (sready && pready)
                        deferred.Resolve();
                });
            return deferred.Promise;
        }

        public void ReceivedMessage(string channel, string message)
        {
            try
            {
                if (!dontLog)
                {
                    if (channel != PubSubChannels.Tick() && !message.Contains("pong") && !message.Contains("tickSync") /*todo this pong stuff aint gonna fly when you remove namedvalues*/)
                        ServerLogger.LogTransport("Pubsub Message Received", channel, message);
                }
                var channelCallback = subbed[channel];
                if (channelCallback != null)
                    channelCallback(message);
            }
            catch (Exception e)
            {
                Global.Console.Log("An exception has occured", e, e.Stack);
                Global.Console.Log("Payload Dump", channel, message);
                ServerLogger.LogError("Exception", e, e.Stack, channel, message);
            }
        }

        public void DontLog()
        {
            dontLog = true;
        }


        public void Publish<T>(string channel, T message)
        {
            if (!dontLog)
                if (channel != PubSubChannels.Tick())
                    ServerLogger.LogTransport("Pubsub Message Sent", channel, message);


            var stringMessage = Json.Stringify(message);
            pubClient.Publish(channel, stringMessage);
        }


        public void Subscribe(string channel, Action<string> callback)
        {
            if (!dontLog)
                if (channel != PubSubChannels.Tick())
                    ServerLogger.LogDebug("Pubsub Subscribed to", channel);
            subClient.Subscribe(channel);
            subbed[channel] = callback;
        }
    }
}