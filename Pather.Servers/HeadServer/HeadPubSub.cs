using System;
using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common;
using Pather.Common.Models.Gateway.PubSub.Base;
using Pather.Common.Models.Head.Base;
using Pather.Common.Models.ServerManager.Base;
using Pather.Common.Utils;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common.PubSub;

namespace Pather.Servers.HeadServer
{
    public class HeadPubSub
    {
        public IPubSub PubSub;

        public HeadPubSub(IPubSub pubSub)
        {
            PubSub = pubSub;
        }

        public Action<Head_PubSub_Message> OnMessage;
        private Dictionary<string, Deferred<object, UndefinedPromiseError>> deferredMessages = new Dictionary<string, Deferred<object, UndefinedPromiseError>>();
        public void Init()
        {
          
            PubSub.Subscribe(PubSubChannels.Head(), (message) =>
            {
                var headPubSubMessage = (Head_PubSub_Message)(message);

                if (Utilities.HasField<IPubSub_ReqRes_Message>(headPubSubMessage, m => m.MessageId) && ((IPubSub_ReqRes_Message)headPubSubMessage).Response)
                {
                    //                    Global.Console.Log("message", message);
                    var possibleMessageReqRes = (Head_PubSub_ReqRes_Message)headPubSubMessage;
                    if (!deferredMessages.ContainsKey(possibleMessageReqRes.MessageId))
                    {
                        Global.Console.Log("Received message that I didnt ask for.", message);
                        throw new Exception("Received message that I didnt ask for.");
                    }
                    deferredMessages[possibleMessageReqRes.MessageId].Resolve(headPubSubMessage);
                    deferredMessages.Remove(possibleMessageReqRes.MessageId);
                    return;
                }

                OnMessage(headPubSubMessage);
            });
        }


        public void PublishToGateway(string gatewayId, Gateway_PubSub_Message message)
        {
            PubSub.Publish(PubSubChannels.Gateway(gatewayId), message);
        }
        public void PublishToGateway( Gateway_PubSub_AllMessage message)
        {
            PubSub.Publish(PubSubChannels.Gateway(), message);
        }

        public Promise<T, UndefinedPromiseError> PublishToServerManagerWithCallback<T>(ServerManager_PubSub_ReqRes_Message message)
        {
            var deferred = Q.Defer<T, UndefinedPromiseError>();
            PubSub.Publish(PubSubChannels.ServerManager(), message);
            deferredMessages.Add(message.MessageId, Script.Reinterpret<Deferred<object, UndefinedPromiseError>>(deferred));
            return deferred.Promise;
        }
    }
}