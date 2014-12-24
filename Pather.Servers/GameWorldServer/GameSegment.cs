using System.Collections.Generic;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameWorld;
using Pather.Common.Utils.Promises;
using Pather.Servers.GameWorldServer.Models;

namespace Pather.Servers.GameWorldServer
{
    public class GameSegment
    {
        public GameWorld GameWorld;

        public GameSegment(GameWorld gameWorld)
        {
            GameWorld = gameWorld;
            Users = new List<GameWorldUser>();
        }

        public List<GameWorldUser> Users;
        public string GameSegmentId;

        public Promise AddUserToSegment(GameWorldUser gwUser)
        {
            var deferred = Q.Defer();

            var userJoinGameWorldGameSegmentPubSubReqResMessage = new UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message()
            {
                X = gwUser.X,
                Y = gwUser.Y,
                GatewayServer = gwUser.GatewayServer,
                UserId = gwUser.UserId
            };
            GameWorld.GameWorldPubSub.PublishToGameSegmentWithCallback<UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message>(GameSegmentId, userJoinGameWorldGameSegmentPubSubReqResMessage).Then((userJoinResponse) =>
            {
                Users.Add(gwUser);
                gwUser.GameSegment = this;
                deferred.Resolve();
            });


            return deferred.Promise;
        }

        public Promise RemoveUserFromGameSegment(GameWorldUser gwUser)
        {
            var deferred = Q.Defer();

            var userJoinGameWorldGameSegmentPubSubReqResMessage = new UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message()
            {
                UserId = gwUser.UserId
            };
            GameWorld.GameWorldPubSub.PublishToGameSegmentWithCallback<UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message>(GameSegmentId, userJoinGameWorldGameSegmentPubSubReqResMessage).Then((userJoinResponse) =>
            {
                Users.Remove(gwUser);
                gwUser.GameSegment = null;
                deferred.Resolve();
            });

            return deferred.Promise;
        }
    }
}