using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Serialization;
using Pather.Common;
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
        public ServerLogger ServerLogger;
        private bool dontLog;

        public PubSub()
        {
        }

        public Promise Init(ServerLogger serverLogger, int port = 6379)
        {
            this.ServerLogger = serverLogger;
            var deferred = Q.Defer();
            subbed = new JsDictionary<string, Action<IPubSub_Message>>();

            var redis = Global.Require<Redis>("redis");
            redis.DebugMode = false;
            subClient = redis.CreateClient(port, ConnectionConstants.RedisIP);
            pubClient = redis.CreateClient(port, ConnectionConstants.RedisIP);

            subClient.On("subscribe", (string channel, int count) => { if (ServerLogger != null) ServerLogger.LogDebug("subscribed: " + channel + " " + count); });
            subClient.On("unsubscribe", (string channel, int count) => { if (ServerLogger != null) ServerLogger.LogDebug("unsubscribed: " + channel + " " + count); });

            subClient.On("message",
                (string channel, string messageString) =>
                {
                    ReceivedMessage(channel, Json.Parse<IPubSub_Message>(messageString));
                });
            subClient.On("ready",
                () =>
                {
                    sready = true;
                    if (deferred.Promise.IsRejected || deferred.Promise.IsResolved)
                    {
                        if (ServerLogger != null)
                            ServerLogger.LogError("Forced reconnect of redis");

                        return;

                    }

                    if (sready && pready)
                        deferred.Resolve();
                });
            pubClient.On("ready",
                () =>
                {
                    pready = true;
                    if (deferred.Promise.IsRejected || deferred.Promise.IsResolved)
                    {
                        if (ServerLogger != null)
                            ServerLogger.LogError("Forced reconnect of redis");
                        return;
                    }
                    if (sready && pready)
                        deferred.Resolve();
                });
            pubClient.On<Exception>("error", (err) =>
            {
                if (ServerLogger != null)
                    ServerLogger.LogError("Error " + err);
            });
            subClient.On<Exception>("error", (err) =>
            {
                if (ServerLogger != null)
                    ServerLogger.LogError("Error " + err);
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


        private readonly JsDictionary<string, List<IPubSub_Message>> channelCache = new JsDictionary<string, List<IPubSub_Message>>();


        private void flush()
        {
            if (channelCache.Count == 0) return;

            var count = 0;
            foreach (var channel in channelCache)
            {
                if (channel.Value.Count == 1)
                {
                    pubClient.Publish(channel.Key, Json.Stringify(channel.Value[0]));
                }
                else
                {
                    var pubSubMessageCollection = new PubSub_Message_Collection()
                    {
                        MessageCollection = channel.Value
                    };

                    pubClient.Publish(channel.Key, Json.Stringify(pubSubMessageCollection));
                }

                count += channel.Value.Count;
            }
            if (count > 70)
            {
                if (ServerLogger != null)
                    ServerLogger.LogInformation("Flushing Pubsub with over 70 items", count);
            }
            channelCache.Clear();
        }

        public void ReceivedMessage(string channel, IPubSub_Message message)
        {
            try
            {
                if (!dontLog)
                {
                    if (ServerLogger != null)
                        ServerLogger.LogTransport("Pubsub Message Received", channel, message);
                }
                var channelCallback = subbed[channel];
                if (channelCallback != null)
                {
                    if (Utilities.HasField<PubSub_Message_Collection>(message, a => a.MessageCollection))
                    {
                        var messages = (PubSub_Message_Collection)message;

                        foreach (var m in messages.MessageCollection)
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
                if (ServerLogger != null)
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
                    if (ServerLogger != null)
                        ServerLogger.LogTransport("Pubsub Message Sent", channel, message);

            addToCache(channel, message);
        }

        public void PublishForce<T>(string channel, T message) where T : IPubSub_Message
        {
            if (!dontLog)
                if (channel != PubSubChannels.Tick())
                    if (ServerLogger != null)
                        ServerLogger.LogTransport("Pubsub Message Sent", channel, message);


            pubClient.Publish(channel, Json.Stringify(message));
        }

        private void addToCache(string channel, IPubSub_Message message)
        {
            if (!channelCache.ContainsKey(channel))
            {
                channelCache[channel] = new List<IPubSub_Message>();
            }
            channelCache[channel].Add(message);
        }


        public void Subscribe(string channel, Action<IPubSub_Message> callback)
        {
            if (!dontLog)
                if (channel != PubSubChannels.Tick())
                    if (ServerLogger != null)
                        ServerLogger.LogDebug("Pubsub Subscribed to", channel);
            subClient.Subscribe(channel);
            subbed[channel] = callback;
        }
    }
}