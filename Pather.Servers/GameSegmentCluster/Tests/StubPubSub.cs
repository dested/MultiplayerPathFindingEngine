using System;
using System.Collections.Generic;
using Pather.Common.Models.Common;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common.PubSub;

namespace Pather.Servers.GameSegmentCluster.Tests
{
    public class StubPubSub : IPubSub
    {
        public void Publish<T>(string channel, T content) where T : IPubSub_Message
        {
            throw new NotImplementedException();
        }

        public void PublishForce<T>(string channel, T content) where T : IPubSub_Message
        {
            throw new NotImplementedException();
        }

        private readonly Dictionary<string, Action<IPubSub_Message>> channels = new Dictionary<string, Action<IPubSub_Message>>();

        public void Subscribe(string channel, Action<IPubSub_Message> callback)
        {
            channels.Add(channel, callback);
        }

        public Promise Init(int port = 6379)
        {
            throw new NotImplementedException();
        }

        public void ReceivedMessage(string channel, IPubSub_Message message)
        {
            channels[channel](message);
        }

        public void DontLog()
        {
            throw new NotImplementedException();
        }
    }
}