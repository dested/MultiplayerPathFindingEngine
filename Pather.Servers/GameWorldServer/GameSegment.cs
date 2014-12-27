using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameWorld.GameSegment;
using Pather.Common.Utils.Promises;
using Pather.Servers.GameWorldServer.Models;
using Console = System.Console;

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


        public bool CanAcceptNewUsers()
        {
            return Users.Count < Constants.UsersPerGameSegment;
        }


        public Promise AddUserToSegment(GameWorldUser gwUser)
        {
            var deferred = Q.Defer();

            var userJoinGameWorldGameSegmentPubSubReqResMessage = new UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message()
            {
                X = gwUser.X,
                Y = gwUser.Y,
                GatewayId = gwUser.GatewayId,
                UserId = gwUser.UserId
            };
            GameWorld.GameWorldPubSub.PublishToGameSegmentWithCallback<UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message>(GameSegmentId, userJoinGameWorldGameSegmentPubSubReqResMessage).Then((userJoinResponse) =>
            {
                Global.Console.Log("User joined!");
                Users.Add(gwUser);
                gwUser.GameSegment = this;
                deferred.Resolve();
            });


            return deferred.Promise;
        }

        public Promise RemoveUserFromGameSegment(GameWorldUser gwUser)
        {
            var deferred = Q.Defer();

            var userJoin = new UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message()
            {
                UserId = gwUser.UserId
            };
            GameWorld.GameWorldPubSub.PublishToGameSegmentWithCallback<UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message>(GameSegmentId, userJoin)
                .Then((userJoinResponse) =>
                {
                    Users.Remove(gwUser);
                    gwUser.GameSegment = null;
                    deferred.Resolve();
                });

            return deferred.Promise;
        }

        public Promise TellSegmentAboutUser(GameWorldUser gwUser)
        {
            var deferred = Q.Defer();

            var tellUserJoin = new TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message()
            {
                X = gwUser.X,
                Y = gwUser.Y,
                GatewayId = gwUser.GatewayId,
                GameSegmentId = gwUser.GameSegment.GameSegmentId,
                UserId = gwUser.UserId
            };
            GameWorld.GameWorldPubSub.PublishToGameSegmentWithCallback<TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message>(GameSegmentId, tellUserJoin)
                .Then((userJoinResponse) =>
                {
                    //todo IDK
                    deferred.Resolve();
                });


            return deferred.Promise;
        }

        public Promise TellSegmentAboutRemoveUser(GameWorldUser gwUser)
        {
            var deferred = Q.Defer();

            var userJoinGameWorldGameSegmentPubSubReqResMessage = new TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message()
            {
                X = gwUser.X,
                Y = gwUser.Y,
                GatewayId = gwUser.GatewayId,
                UserId = gwUser.UserId
            };
            GameWorld.GameWorldPubSub.PublishToGameSegmentWithCallback<TellUserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message>(GameSegmentId, userJoinGameWorldGameSegmentPubSubReqResMessage).Then((userJoinResponse) =>
            {
                //todo IDK
                deferred.Resolve();
            });

            return deferred.Promise;
        }
    }
}