using System;
using System.Collections.Generic;
using System.Serialization;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameSegmentCluster;
using Pather.Common.Models.GameWorld;
using Pather.Common.Models.Gateway;
using Pather.Common.Models.Tick;
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

        public Action<GameWorldPubSubMessage> Message;
        public Dictionary<string, Deferred<object, UndefinedPromiseError>> deferredMessages = new Dictionary<string, Deferred<object, UndefinedPromiseError>>();

        public void Init()
        {
            PubSub.Subscribe(PubSubChannels.GameWorld(), (message) =>
            {
                var gameWorldPubSubMessage = Json.Parse<GameWorldPubSubMessage>(message);

                var possibleMessageReqRes = Script.Reinterpret<IPubSubReqResMessage>(gameWorldPubSubMessage);


                if (!Script.IsUndefined(possibleMessageReqRes.MessageId))
                {
                    if (gameWorldPubSubMessage.Type == GameWorldPubSubMessageType.CreateGameSegmentResponse)
                    {
                        if (!deferredMessages.ContainsKey(possibleMessageReqRes.MessageId))
                        {
                            Global.Console.Log("Received message that I didnt ask for.");
                            throw new Exception("Received message that I didnt ask for.");
                        }
                        deferredMessages[possibleMessageReqRes.MessageId].Resolve(gameWorldPubSubMessage);
                        return;
                    }
                }

                Message(gameWorldPubSubMessage);
            });
        }

        public void PublishToGameSegment(string gameSegmentId,GameSegmentClusterPubSubMessage message)
        {
            PubSub.Publish(PubSubChannels.GameSegmentCluster(gameSegmentId), message);
        }

        public void PublishToTickServer(TickPubSubMessage message)
        {
            PubSub.Publish(PubSubChannels.Tick(), message);
        }


        public Promise<T, UndefinedPromiseError> PublishToGameSegmentClusterWithCallback<T>(string gameSegmentClusterId,IPubSubReqResMessage message)
        {
            var deferred = Q.Defer<T, UndefinedPromiseError>();
            PubSub.Publish(PubSubChannels.GameSegmentCluster(gameSegmentClusterId), message);
            deferredMessages.Add(message.MessageId, Script.Reinterpret<Deferred<object, UndefinedPromiseError>>(deferred));
            return deferred.Promise;
        }

        public void PublishToGatewayServer(string gatewayId, GatewayPubSubMessage message)
        {
            PubSub.Publish(gatewayId, message);

        }
    }
}