using System;
using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.ClusterManager.Base;
using Pather.Common.Models.Common;
using Pather.Common.Models.GameWorld.Base;
using Pather.Common.Models.Head;
using Pather.Common.Models.Head.Base;
using Pather.Common.Models.ServerManager.Base;
using Pather.Common.Utils;
using Pather.Common.Utils.Promises;
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
        private Dictionary<string, Deferred<object, UndefinedPromiseError>> deferredMessages = new Dictionary<string, Deferred<object, UndefinedPromiseError>>();

        public void Init()
        {
          
            PubSub.Subscribe(PubSubChannels.ServerManager(), (message) =>
            {
                var serverManagerPubSubMessage = (ServerManager_PubSub_Message)(message);

                if (Utilities.HasField<IPubSub_ReqRes_Message>(serverManagerPubSubMessage, m => m.MessageId) && ((IPubSub_ReqRes_Message)serverManagerPubSubMessage).Response)
                {
                    //                    Global.Console.Log("message", message);
                    var possibleMessageReqRes = (ServerManager_PubSub_ReqRes_Message)serverManagerPubSubMessage;
                    if (!deferredMessages.ContainsKey(possibleMessageReqRes.MessageId))
                    {
                        Global.Console.Log("Received message that I didnt ask for.", message);
                        throw new Exception("Received message that I didnt ask for.");
                    }
                    deferredMessages[possibleMessageReqRes.MessageId].Resolve(serverManagerPubSubMessage);
                    deferredMessages.Remove(possibleMessageReqRes.MessageId);
                    return;
                }


                OnMessage(serverManagerPubSubMessage);
            });
        }

        public Promise<T, UndefinedPromiseError> PublishToClusterManagerWithCallback<T>(string clusterManagerId, ClusterManager_PubSub_ReqRes_Message message)
        {
            var deferred = Q.Defer<T, UndefinedPromiseError>();
            PubSub.Publish(PubSubChannels.ClusterManager(clusterManagerId), message);
            deferredMessages.Add(message.MessageId, Script.Reinterpret<Deferred<object, UndefinedPromiseError>>(deferred));
            return deferred.Promise;
        }


        public void PublishToClusterManager(string clusterManagerId, ClusterManager_PubSub_Message message)
        {
            PubSub.Publish(PubSubChannels.ClusterManager(clusterManagerId), message);
        }

        public void PublishToHead(Head_PubSub_Message message)
        {
            PubSub.Publish(PubSubChannels.Head(), message);
        }
        public void PublishToGameWorld(GameWorld_PubSub_Message message)
        {
            PubSub.Publish(PubSubChannels.GameWorld(), message);
        }
    }
}