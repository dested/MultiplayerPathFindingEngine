using System;
using System.Serialization;
using Pather.Common.Models.GameWorld;
using Pather.Common.Models.Gateway;
using Pather.Common.Utils.Promises;
using Pather.ServerManager.Common;
using Pather.ServerManager.Database;

namespace Pather.ServerManager.GameWorldServer
{
    public class GameWorldServer
    {
        private IPubSub pubSub;
        private IDatabaseQueries DatabaseQueries;
        public GameWorld GameWorld;

        public GameWorldServer(IPubSub pubSub, IDatabaseQueries dbQueries)
        {
            DatabaseQueries = dbQueries;
            GameWorld = new GameWorld();
            pubSub.Init(pubsubReady);
        }


        private void pubsubReady(IPubSub pubSub)
        {
            this.pubSub = pubSub;
            pubSub.Subscribe(PubSubChannels.GameWorld, gameworldMessage);
        }

        private void gameworldMessage(string message)
        {
            var gameworldMessage = Json.Parse<GameWorldPubSubMessage>(message);
            switch (gameworldMessage.Type)
            {
                case GameWorldMessageType.UserJoined:
                    UserJoined((UserJoinedGameWorldPubSubMessage)gameworldMessage).Then(gwUser =>
                    {
                        pubSub.Publish(gwUser.GatewayServer, new UserJoinedGatewayPubSubMessage()
                        {
                            GameServerId = gwUser.GameServer.GameServerId,
                            UserId = gwUser.UserId,
                        });
                    });
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private Promise<GameWorldUser, UserJoinError> UserJoined(UserJoinedGameWorldPubSubMessage userJoinedMessage)
        {
            var deferred = Q.Defer<GameWorldUser, UserJoinError>();
            DatabaseQueries.GetUserByToken(userJoinedMessage.UserToken).Then(dbUser =>
            {
                deferred.PassThrough(GameWorld.UserJoined(dbUser));
            });
            return deferred.Promise;
        }
    }
}