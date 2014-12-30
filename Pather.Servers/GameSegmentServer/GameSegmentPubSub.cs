using System;
using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameSegment.Base;
using Pather.Common.Models.GameWorld.Base;
using Pather.Common.Models.Gateway.PubSub.Base;
using Pather.Common.Models.Tick.Base;
using Pather.Common.Utils;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common.PubSub;

namespace Pather.Servers.GameSegmentServer
{
    public class GameSegmentPubSub
    {
        public string GameSegmentId;
        public IPubSub PubSub;

        public GameSegmentPubSub(IPubSub pubSub, string gameSegmentId)
        {
            GameSegmentId = gameSegmentId;
            PubSub = pubSub;
        }

        public Action<GameSegment_PubSub_Message> OnMessage;
        public Action<GameSegment_PubSub_AllMessage> OnAllMessage;
        public Dictionary<string, Deferred<object, UndefinedPromiseError>> deferredMessages = new Dictionary<string, Deferred<object, UndefinedPromiseError>>();

        public Promise Init()
        {
            var deferred = Q.Defer();

            PubSub.Subscribe(PubSubChannels.GameSegment(), (message) =>
            {
                var gameSegmentPubSubMessage = (GameSegment_PubSub_AllMessage)(message);
                OnAllMessage(gameSegmentPubSubMessage);
            });

            PubSub.Subscribe(PubSubChannels.GameSegment(GameSegmentId), (message) =>
            {
                var gameSegmentPubSubMessage = (GameSegment_PubSub_Message)(message);
                if (Utilities.HasField<GameSegment_PubSub_ReqRes_Message>(gameSegmentPubSubMessage, m => m.MessageId) && ((GameSegment_PubSub_ReqRes_Message) gameSegmentPubSubMessage).Response)
                {
                    var possibleMessageReqRes = (GameSegment_PubSub_ReqRes_Message) gameSegmentPubSubMessage;
                    if (!deferredMessages.ContainsKey(possibleMessageReqRes.MessageId))
                    {
                        Global.Console.Log("Received message that I didnt ask for.", message);
                        throw new Exception("Received message that I didnt ask for.");
                    }
                    deferredMessages[possibleMessageReqRes.MessageId].Resolve(gameSegmentPubSubMessage);
                    deferredMessages.Remove(possibleMessageReqRes.MessageId);
                    return;
                }


                OnMessage(gameSegmentPubSubMessage);
            });

            deferred.Resolve();
            return deferred.Promise;
        }

        public void PublishToTickServer(Tick_PubSub_Message message)
        {
            PubSub.Publish(PubSubChannels.Tick(), message);
        }

        public void PublishToGateway(string gatewayId, Gateway_PubSub_Message message)
        {
            var gateway = PubSubChannels.Gateway(gatewayId);
            PubSub.Publish(gateway, message);
        }

        public void PublishToGameWorld(GameWorld_PubSub_Message message)
        {
            PubSub.Publish(PubSubChannels.GameWorld(), message);
        }
        public void PublishToGameWorld_Force(GameWorld_PubSub_Message message)
        {
            PubSub.PublishForce(PubSubChannels.GameWorld(), message);
        }

        public Promise<T, UndefinedPromiseError> PublishToGameWorldWithCallback<T>(GameWorld_PubSub_ReqRes_Message message)
        {
            var deferred = Q.Defer<T, UndefinedPromiseError>();
            PubSub.Publish(PubSubChannels.GameWorld(), message);
            deferredMessages.Add(message.MessageId, Script.Reinterpret<Deferred<object, UndefinedPromiseError>>(deferred));
            return deferred.Promise;
        }

        public void PublishToGameSegment(string gameSegmentId, GameSegment_PubSub_Message message)
        {
            PubSub.Publish(PubSubChannels.GameSegment(gameSegmentId), message);
        }
    }
}