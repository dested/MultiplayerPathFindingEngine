using System;
using Pather.Common.Models.GameWorld;
using Pather.Common.Models.Gateway;
using Pather.Common.Utils.Promises;
using Pather.ServerManager.Common.PubSub;
using Pather.ServerManager.Database;

namespace Pather.ServerManager.GameWorldServer
{
    public class GameWorldServer
    {
        private readonly IPubSub pubSub;
        private readonly IDatabaseQueries DatabaseQueries;
        public GameWorld GameWorld;

        public GameWorldServer(IPubSub pubSub, IDatabaseQueries dbQueries)
        {
            this.pubSub = pubSub;
            DatabaseQueries = dbQueries;
            pubSub.Init().Then(pubsubReady);
        }


        private void pubsubReady()
        {
            var gameSegmentClusterPubSub = new GameWorldPubSub(pubSub);
            gameSegmentClusterPubSub.Init();
            gameSegmentClusterPubSub.Message += gameWorldMessage;

            GameWorld = new GameWorld(gameSegmentClusterPubSub);
        }

        private void gameWorldMessage(GameWorldPubSubMessage gameworldMessage)
        {
            switch (gameworldMessage.Type)
            {
                case GameWorldMessageType.UserJoined:
                    UserJoined((UserJoinedGameWorldPubSubMessage) gameworldMessage).Then(gwUser =>
                    {
                        pubSub.Publish(gwUser.GatewayServer, new UserJoinedGatewayPubSubMessage()
                        {
                            GameServerId = gwUser.GameSegment.GameSegmentId,
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

            //query database for user
            DatabaseQueries.GetUserByToken(userJoinedMessage.UserToken).Then(dbUser =>
            {
                deferred.PassPromiseThrough(GameWorld.UserJoined(userJoinedMessage.GatewayChannel, dbUser));
            });
            return deferred.Promise;
        }
    }
}