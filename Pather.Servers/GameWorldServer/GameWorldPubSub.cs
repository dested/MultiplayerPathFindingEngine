using System;
using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common;
using Pather.Common.Models.GameSegment.Base;
using Pather.Common.Models.GameWorld.Base;
using Pather.Common.Models.Gateway.PubSub.Base;
using Pather.Common.Models.ServerManager.Base;
using Pather.Common.Models.Tick.Base;
using Pather.Common.Utils;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common.PubSub;

namespace Pather.Servers.GameWorldServer
{
    public class GameWorldPubSub
    {
        public IPubSub PubSub;

        public GameWorldPubSub(IPubSub pubSub)
        {
            PubSub = pubSub;
        }

        public Action<GameWorld_PubSub_Message> Message;
        private readonly Dictionary<string, Deferred<object, UndefinedPromiseError>> deferredMessages = new Dictionary<string, Deferred<object, UndefinedPromiseError>>();

        public void Init()
        {
            PubSub.Subscribe(PubSubChannels.GameWorld(), (message) =>
            {
                var gameWorldPubSubMessage = (GameWorld_PubSub_Message) (message);

                if (Utilities.HasField<IPubSub_ReqRes_Message>(gameWorldPubSubMessage, m => m.MessageId) && ((GameWorld_PubSub_ReqRes_Message) gameWorldPubSubMessage).Response)
                {
//                    Global.Console.Log("message", message);
                    var possibleMessageReqRes = (GameWorld_PubSub_ReqRes_Message) gameWorldPubSubMessage;
                    if (!deferredMessages.ContainsKey(possibleMessageReqRes.MessageId))
                    {
                        Global.Console.Log("Received message that I didnt ask for.", message);
                        throw new Exception("Received message that I didnt ask for.");
                    }
                    deferredMessages[possibleMessageReqRes.MessageId].Resolve(gameWorldPubSubMessage);
                    deferredMessages.Remove(possibleMessageReqRes.MessageId);
                    return;
                }

                Message(gameWorldPubSubMessage);
            });
        }

        public void PublishToGameSegment(string gameSegmentId, GameSegment_PubSub_Message message)
        {
            PubSub.Publish(PubSubChannels.GameSegment(gameSegmentId), message);
        }

        public Promise<T, UndefinedPromiseError> PublishToGameSegmentWithCallback<T>(string gameSegmentId, GameSegment_PubSub_ReqRes_Message message)
        {
            var deferred = Q.Defer<T, UndefinedPromiseError>();
            PubSub.Publish(PubSubChannels.GameSegment(gameSegmentId), message);
            deferredMessages.Add(message.MessageId, Script.Reinterpret<Deferred<object, UndefinedPromiseError>>(deferred));
            return deferred.Promise;
        }

        public void PublishToTickServer(Tick_PubSub_Message message)
        {
            PubSub.Publish(PubSubChannels.Tick(), message);
        }


        public void PublishToGatewayServer(string gatewayId, Gateway_PubSub_Message message)
        {
            PubSub.Publish(PubSubChannels.Gateway(gatewayId), message);
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