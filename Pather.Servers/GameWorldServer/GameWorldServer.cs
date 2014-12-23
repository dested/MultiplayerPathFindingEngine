using System;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameWorld;
using Pather.Common.Models.Gateway;
using Pather.Common.Models.Tick;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Database;

namespace Pather.Servers.GameWorldServer
{
    public class GameWorldServer
    {
        private readonly IPubSub pubSub;
        private readonly IDatabaseQueries DatabaseQueries;
        public GameWorld GameWorld;
        public ClientTickManager ClientTickManager;
        private GameWorldPubSub gameSegmentClusterPubSub;

        public GameWorldServer(IPubSub pubSub, IDatabaseQueries dbQueries)
        {
            this.pubSub = pubSub;
            DatabaseQueries = dbQueries;
            pubSub.Init().Then(pubsubReady);
        }


        private void pubsubReady()
        {
            gameSegmentClusterPubSub = new GameWorldPubSub(pubSub);
            gameSegmentClusterPubSub.Init();
            gameSegmentClusterPubSub.Message += gameWorldMessage;

            GameWorld = new GameWorld(gameSegmentClusterPubSub);


            ClientTickManager = new ClientTickManager();
            ClientTickManager.Init(sendPing, ()=>{Global.Console.Log("Connected To Tick Server");});
            ClientTickManager.StartPing();
        }

        private void sendPing()
        {
            gameSegmentClusterPubSub.PublishToTickServer(new PingTickPubSubMessage() { Origin = PubSubChannels.GameWorld(), OriginType = PingTickPubSubMessageOriginType.GameWorld });
        }


        private void gameWorldMessage(GameWorld_PubSub_Message message)
        {
            switch (message.Type)
            {
                case GameWorld_PubSub_MessageType.UserJoined:
                    UserJoined((UserJoinedGameWorldPubSubMessage)message).Then(gwUser =>
                    {
                        gameSegmentClusterPubSub.PublishToGatewayServer(PubSubChannels.Gateway(gwUser.GatewayServer), new UserJoinedGatewayPubSubMessage()
                        {
                            GameSegmentId = gwUser.GameSegment.GameSegmentId,
                            UserId = gwUser.UserId,
                        });
                    });
                    break;
                case GameWorld_PubSub_MessageType.CreateGameSegmentResponse:
                    Global.Console.Log("Create game segment response, not handled", message);
                    break;

                case GameWorld_PubSub_MessageType.Pong:
                    var pongMessage = (PongGameWorldPubSubMessage)message;
                    ClientTickManager.OnPongReceived();
                    break;
                case GameWorld_PubSub_MessageType.TickSync:
                    var tickSyncMessage = (TickSyncGameWorldPubSubMessage)message;
                    ClientTickManager.SetLockStepTick(tickSyncMessage.LockstepTickNumber);
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