using System;
using Pather.Common.Models.ClusterManager.Base;
using Pather.Common.Models.GameWorld.Base;
using Pather.Common.Models.ServerManager;
using Pather.Common.Models.ServerManager.Base;
using Pather.Servers.Common.PubSub;

namespace Pather.Servers.ClusterManager
{
    public class ClusterManagerPubSub
    {
        public string ClusterManagerId;
        public IPubSub PubSub;

        public ClusterManagerPubSub(IPubSub pubSub, string clusterManagerId)
        {
            ClusterManagerId = clusterManagerId;
            PubSub = pubSub;
        }

        public Action<ClusterManager_PubSub_Message> OnMessage;

        public void Init()
        {
            PubSub.Subscribe(PubSubChannels.ClusterManager(ClusterManagerId), (message) =>
            {
                var gameWorldPubSubMessage = (ClusterManager_PubSub_Message)(message);
                OnMessage(gameWorldPubSubMessage);
            });
        }

        public void PublishToGameWorld(GameWorld_PubSub_Message message)
        {
            PubSub.Publish(PubSubChannels.GameWorld(), message);
        }

        public void PublishToServerManager(ServerManager_PubSub_Message message)
        {
            PubSub.Publish(PubSubChannels.ServerManager(), message);
            

        }
    }
}