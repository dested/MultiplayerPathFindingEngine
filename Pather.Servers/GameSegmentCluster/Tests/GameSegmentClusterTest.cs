using System;
using System.Diagnostics;
using System.Serialization;
using Pather.Common;
using Pather.Common.Models.GameSegmentCluster;
using Pather.Common.Models.GameSegmentCluster.Base;
using Pather.Common.TestFramework;
using Pather.Common.Utils;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.PushPop;

namespace Pather.Servers.GameSegmentCluster.Tests
{
    [TestClass]
    public class GameSegmentClusterTest
    {
        public GameSegmentClusterTest()
        {
        }

        [TestMethod]
        public void CreateGameSegment(Deferred testDeferred)
        {
            var gameSegmentClusterId = Utilities.UniqueId();

            var pubSub = new StubPubSub();
            var pushPop = new PushPop();

            Mocker.StubMethodCall<int,Promise>(pubSub.Init,(port => Q.ResolvedPromise()));


            Mocker.StubMethodCall<string, GameSegmentCluster_PubSub_Message>(pubSub.Publish, (channel, data) =>
            {
            });

            var gts = new GameSegmentCluster(pubSub, pushPop, gameSegmentClusterId);

            pubSub.ReceivedMessage(PubSubChannels.GameSegmentCluster(gameSegmentClusterId), new CreateGameSegment_GameWorld_GameSegmentCluster_PubSub_ReqRes_Message());

            Debugger.Break();
            testDeferred.Resolve();
        }
    }
}