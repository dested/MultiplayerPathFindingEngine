using System;
using System.Serialization;
using Pather.Common.Models.GameSegmentCluster.Base;
using Pather.Common.Models.GameWorld.Base;
using Pather.Servers.Common.PubSub;

namespace Pather.Servers.GameSegmentCluster
{
    public class GameSegmentClusterPubSub
    {
        public string GameSegmentClusterId;
        public IPubSub PubSub;

        public GameSegmentClusterPubSub(IPubSub pubSub, string gameSegmentClusterId)
        {
            GameSegmentClusterId = gameSegmentClusterId;
            PubSub = pubSub;
        }

        public Action<GameSegmentCluster_PubSub_Message> OnMessage;

        public void Init()
        {
            PubSub.Subscribe(PubSubChannels.GameSegmentCluster(GameSegmentClusterId), (message) =>
            {
                var gameWorldPubSubMessage = Json.Parse<GameSegmentCluster_PubSub_Message>(message);


                OnMessage(gameWorldPubSubMessage);
            });
        }

        public void PublishToGameWorld(GameWorld_PubSub_Message message)
        {
            PubSub.Publish(PubSubChannels.GameWorld(), message);
        }
    }
}