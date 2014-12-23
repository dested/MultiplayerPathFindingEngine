using System.Diagnostics;
using System.Serialization;
using Pather.Common.Models.GameSegmentCluster;
using Pather.Common.TestFramework;
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
            var gameSegmentId = Pather.Common.Common.UniqueId();

            var pubSub = new StubPubSub();
            var pushPop = new PushPop();

            Mocker.StubMethodCall(pubSub.Init, (() => Q.ResolvedPromise()));


            Mocker.StubMethodCall<string, GameSegmentCluster_PubSub_Message>(pubSub.Publish, (channel, data) =>
            {
            });

            var gts = new GameSegmentCluster(pubSub, pushPop, gameSegmentId);

            pubSub.ReceivedMessage(PubSubChannels.GameSegmentCluster(gameSegmentId), Json.Stringify(new CreateGameSegment_GameSegmentCluster_PubSub_ReqRes_Message()));

            Debugger.Break();
            testDeferred.Resolve();
        }
    }
}