using System;
using Pather.Common.Models.Head.Base;
using Pather.Servers.Common.PubSub;

namespace Pather.Servers.ServerManager
{
    public class ServerManagerPubSub
    {
        public IPubSub PubSub;

        public ServerManagerPubSub(IPubSub pubSub)
        {
            PubSub = pubSub;
        }

        public Action<ServerManager_PubSub_Message> OnMessage;

        public void Init()
        {
          
            PubSub.Subscribe(PubSubChannels.ServerManager(), (message) =>
            {
                var headPubSubMessage = (ServerManager_PubSub_Message)(message);
                OnMessage(headPubSubMessage);
            });
        }
         
    }
}