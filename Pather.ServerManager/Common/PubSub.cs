using System;
using System.Collections.Generic;
using System.Serialization;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.ServerManager.Libraries.Redis;

namespace Pather.ServerManager.Common
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

        public void Init(Action<IPubSub> ready)
        {
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
                    RecievedMessage(channel, message);
                });
            subClient.On("ready",
                () =>
                {
                    sready = true;
                    if (sready && pready)
                        ready(this);
                });
            pubClient.On("ready",
                () =>
                {
                    pready = true;
                    if (sready && pready)
                        ready(this);
                });
        }

        public void RecievedMessage(string channel, string message)
        {
            if (subbed[channel] != null)
                subbed[channel](message);
        }


        public void Publish(string channel, string content)
        {
            pubClient.Publish(channel, content);
        }
        public void Publish<T>(string channel, T content)
        {
            pubClient.Publish(channel, Json.Stringify(content));
        }


        public void Subscribe(string channel, Action<string> callback)
        {
            subClient.Subscribe(channel);
            subbed[channel] = callback;
        }
    }
}