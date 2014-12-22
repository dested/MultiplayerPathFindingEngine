using System;
using System.Collections.Generic;
using System.Serialization;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameSegmentCluster;
using Pather.Common.Models.GameWorld;
using Pather.Common.Utils.Promises;
using Pather.ServerManager.Common.PubSub;

namespace Pather.ServerManager.GameWorldServer
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
            PubSub.Subscribe(PubSubChannels.GameWorld, (message) =>
            {
                var gameWorldPubSubMessage = Json.Parse<GameWorldPubSubMessage>(message);

                var possibleMessageReqRes = Script.Reinterpret<IPubSubReqResMessage>(gameWorldPubSubMessage);


                if (!Script.IsUndefined(possibleMessageReqRes.MessageId))
                {
                    if (gameWorldPubSubMessage.Type == GameWorldMessageType.CreateGameServerResponse)
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

        public void PublishToGameSegment(GameSegmentClusterPubSubMessage message)
        {
            PubSub.Publish(PubSubChannels.GameSegmentCluster + 1, message);
        }

        public Promise<T, UndefinedPromiseError> PublishToGameSegmentWithCallback<T>(IPubSubReqResMessage message)
        {
            var deferred = Q.Defer<T, UndefinedPromiseError>();
            PubSub.Publish(PubSubChannels.GameSegmentCluster + 1, message);
            deferredMessages.Add(message.MessageId, Script.Reinterpret<Deferred<object, UndefinedPromiseError>>(deferred));
            return deferred.Promise;
        }
    }
}