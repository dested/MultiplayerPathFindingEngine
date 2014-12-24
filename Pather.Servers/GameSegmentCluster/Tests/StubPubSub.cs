using System;
using System.Collections.Generic;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common.PubSub;

namespace Pather.Servers.GameSegmentCluster.Tests
{
    public class StubPubSub : IPubSub
    {

        public void Publish<T>(string channel, T content)
        {
            throw new NotImplementedException();
        }

        private readonly Dictionary<string, Action<string>> channels = new Dictionary<string, Action<string>>();

        public void Subscribe(string channel, Action<string> callback)
        {
            channels.Add(channel, callback);
        }

        public Promise Init()
        {
            throw new NotImplementedException();
        }

        public void ReceivedMessage(string channel, string message)
        {
            channels[channel](message);
        }

        public void DontLog()
        {
            throw new NotImplementedException();
        }
    }
}