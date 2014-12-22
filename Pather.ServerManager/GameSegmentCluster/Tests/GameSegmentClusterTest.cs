using System.Diagnostics;
using System.Serialization;
using Pather.Common.Models.GameSegmentCluster;
using Pather.Common.Models.Gateway;
using Pather.Common.TestFramework;
using Pather.Common.Utils.Promises;
using Pather.ServerManager.Common;
using Pather.ServerManager.Common.PubSub;
using Pather.ServerManager.Common.PushPop;
using Pather.ServerManager.Libraries.Redis;

namespace Pather.ServerManager.GameSegmentCluster.Tests
{
    [TestClass]
    public class GameSegmentClusterTest
    {
        public GameSegmentClusterTest()
        {
        }

        [TestMethod]
        public void CreateGameServer(Deferred testDeferred)
        {

            var pubSub = new StubPubSub();
            var pushPop = new PushPop();

            Mocker.StubMethodCall(pubSub.Init, (() => Q.ResolvedPromise()));


            Mocker.StubMethodCall<string, GameSegmentClusterPubSubMessage>(pubSub.Publish, (channel, data) =>
            {
            });

            var gts = new GameSegmentCluster(pubSub,pushPop);

            pubSub.ReceivedMessage(PubSubChannels.GameSegmentCluster + 0, Json.Stringify(new CreateGameServerGameSegmentClusterPubSubMessage()
            {
                Type=GameSegmentClusterMessageType.CreateGameSegment
            }));

            Debugger.Break();
            testDeferred.Resolve();

        }
    }
}