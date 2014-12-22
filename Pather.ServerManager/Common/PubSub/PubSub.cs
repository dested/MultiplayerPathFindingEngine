using System;
using System.Collections.Generic;
using System.Serialization;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Utils.Promises;
using Pather.ServerManager.Libraries.Redis;

namespace Pather.ServerManager.Common.PubSub
{
    public class PubSub : IPubSub
    {
        private bool pready;
        private RedisClient pubClient;
        private bool sready;
        private RedisClient subClient;
        private JsDictionary<string, Action<string>> subbed;

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
            Global.Console.Log("Pubsub Message Received",channel,message);
            Action<string> channelCallback = subbed[channel];
            if (channelCallback != null)
                channelCallback(message);
        }


        public void Publish(string channel, string message)
        {
            Global.Console.Log("Pubsub Message Sent", channel, message);
            pubClient.Publish(channel, message);
        }
        public void Publish<T>(string channel, T message)
        {
            string stringMessage = Json.Stringify(message);
            Global.Console.Log("Pubsub Message Sent", channel, stringMessage);
            pubClient.Publish(channel, stringMessage);
        }


        public void Subscribe(string channel, Action<string> callback)
        {
            subClient.Subscribe(channel);
            subbed[channel] = callback;
        }
    }
}