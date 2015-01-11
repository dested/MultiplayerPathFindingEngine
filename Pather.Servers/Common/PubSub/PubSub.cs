using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Serialization;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common;
using Pather.Common.Utils;
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
        private JsDictionary<string, Action<IPubSub_Message>> subbed;
        private bool dontLog;

        public PubSub()
        {
        }

        public Promise Init(int port = 6379)
        {
            var deferred = Q.Defer();
            subbed = new JsDictionary<string, Action<IPubSub_Message>>();

            var redis = Global.Require<Redis>("redis");
            redis.DebugMode = false;
            subClient = redis.CreateClient(port, ConnectionConstants.RedisIP);
            pubClient = redis.CreateClient(port, ConnectionConstants.RedisIP);
            subClient.On("subscribe", (string channel, int count) => Logger.Log("subscribed: " + channel + " " + count, LogLevel.Information));
            subClient.On("unsubscribe", (string channel, int count) => Logger.Log("unsubscribed: " + channel + " " + count, LogLevel.Information));

            subClient.On("message",
                (string channel, string messageString) =>
                {
                    ReceivedMessage(channel, Json.Parse<IPubSub_Message>(messageString));
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


            Global.SetInterval(NoDelegateFlush(), 10);

            dontLog = true;
            return deferred.Promise;
        }

        [InlineCode("this.$flush.bind(this)")]
        public static Action NoDelegateFlush()
        {
            return null;
        }


        private readonly JsDictionary<string, List<IPubSub_Message>> channelCacheDict = new JsDictionary<string, List<IPubSub_Message>>();
        private readonly List<Tuple<string, List<IPubSub_Message>>> channelCache = new List<Tuple<string, List<IPubSub_Message>>>();


        private void flush()
        {
            if (channelCache.Count == 0) return;

            var count = 0;
            foreach (var channel in channelCache)
            {
                var pubSubMessageCollection = new PubSub_Message_Collection()
                {
                    Collection = channel.Item2
                };

                pubClient.Publish(channel.Item1, Json.Stringify(pubSubMessageCollection));
                count += channel.Item2.Count;
            }
            if (count > 70)
            {
                Global.Console.Log("Flushing", count);
            }
            channelCacheDict.Clear();
            channelCache.Clear();
        }

        public void ReceivedMessage(string channel, IPubSub_Message message)
        {
            try
            {
                if (!dontLog)
                {
                    ServerLogger.LogTransport("Pubsub Message Received", channel, message);
                }
                var channelCallback = subbed[channel];
                if (channelCallback != null)
                {
                    if (Utilities.HasField<PubSub_Message_Collection>(message, a => a.Collection))
                    {
                        var messages = (PubSub_Message_Collection) message;

                        foreach (var m in messages.Collection)
                        {
                            channelCallback(m);
                        }
                    }

                    else
                    {
                        channelCallback(message);
                    }
                }
            }
            catch (Exception e)
            {
                Global.Console.Log("Payload Dump", channel, Json.Stringify(message));
                Global.Console.Log("An exception has occured", e, e.Stack);
                ServerLogger.LogError("Exception", e, e.Stack, channel, message);
            }
        }

        public void DontLog()
        {
            dontLog = true;
        }


        public void Publish<T>(string channel, T message) where T : IPubSub_Message
        {
            if (!dontLog)
                if (channel != PubSubChannels.Tick())
                    ServerLogger.LogTransport("Pubsub Message Sent", channel, message);

            addToCache(channel, message);
        }

        public void PublishForce<T>(string channel, T message) where T : IPubSub_Message
        {
            if (!dontLog)
                if (channel != PubSubChannels.Tick())
                    ServerLogger.LogTransport("Pubsub Message Sent", channel, message);


            pubClient.Publish(channel, Json.Stringify(message));
        }

        private void addToCache(string channel, IPubSub_Message message)
        {
            if (!channelCacheDict.ContainsKey(channel))
            {
                channelCacheDict[channel] = new List<IPubSub_Message>();
                channelCache.Add(new Tuple<string, List<IPubSub_Message>>(channel, channelCacheDict[channel]));
            }
            channelCacheDict[channel].Add(message);
        }


        public void Subscribe(string channel, Action<IPubSub_Message> callback)
        {
            if (!dontLog)
                if (channel != PubSubChannels.Tick())
                    ServerLogger.LogDebug("Pubsub Subscribed to", channel);
            subClient.Subscribe(channel);
            subbed[channel] = callback;
        }
    }
}