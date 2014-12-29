using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameWorld.GameSegment;
using Pather.Common.Utils;
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
            Users = new List<Models.GameWorldUser>();
            PreAddedUsers = new List<Models.GameWorldUser>();
        }

        public List<Models.GameWorldUser> PreAddedUsers;
        public List<Models.GameWorldUser> Users;
        public string GameSegmentId;


        public bool CanAcceptNewUsers()
        {
            return (Users.Count+ PreAddedUsers.Count) < Constants.UsersPerGameSegment;
        }


        public Promise<List<Tuple<Models.GameWorldUser, Deferred<Models.GameWorldUser, UserJoinError>>>, UndefinedPromiseError> AddUsersToSegment(List<Tuple<Models.GameWorldUser, Deferred<Models.GameWorldUser, UserJoinError>>> gwUsers)
        {
            var deferred = Q.Defer<List<Tuple<Models.GameWorldUser, Deferred<Models.GameWorldUser, UserJoinError>>>, UndefinedPromiseError>();

            var collection = gwUsers.Take(30);
            gwUsers.RemoveRange(0, 30);
            var userJoinGameWorldGameSegmentPubSubReqResMessage = new UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message()
            {
                Collection = collection.Select(gwUser => new UserJoinGameUser()
                {
                    X = gwUser.Item1.X,
                    Y = gwUser.Item1.Y,
                    GatewayId = gwUser.Item1.GatewayId,
                    UserId = gwUser.Item1.UserId
                })
            };
            GameWorld.GameWorldPubSub.PublishToGameSegmentWithCallback<UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message>(GameSegmentId, userJoinGameWorldGameSegmentPubSubReqResMessage).Then((userJoinResponse) =>
            {
//                Global.Console.Log("User joined!");
                foreach (var gwUser in collection)
                {
                    Users.Add(gwUser.Item1);
                    PreAddedUsers.Remove(gwUser.Item1);
                }
                deferred.Resolve(collection);
            });


            return deferred.Promise;
        }

        public void PreAddUserToSegment(Models.GameWorldUser gwUser)
        {
            gwUser.GameSegment = this;
            PreAddedUsers.Add(gwUser);
        }
        public void RemovePreAddedUserToSegment(Models.GameWorldUser gwUser)
        {
            PreAddedUsers.Remove(gwUser);
        }


        public Promise RemoveUserFromGameSegment(Models.GameWorldUser gwUser)
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

        public Promise<Models.GameWorldUser,UndefinedPromiseError> TellSegmentAboutUser(Models.GameWorldUser gwUser)
        {
            var deferred = Q.Defer<Models.GameWorldUser, UndefinedPromiseError>();

            var tellUserJoin = new TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message()
            {
                X = gwUser.X,
                Y = gwUser.Y,
                GatewayId = gwUser.GatewayId,
                GameSegmentId = gwUser.GameSegment.GameSegmentId,
                UserId = gwUser.UserId
            };
            //todo no request response?
            GameWorld.GameWorldPubSub.PublishToGameSegmentWithCallback<TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message>(GameSegmentId, tellUserJoin)
                .Then((userJoinResponse) =>
                {
                    //todo IDK
                });

            deferred.Resolve(gwUser);

            return deferred.Promise;
        }

        public Promise TellSegmentAboutRemoveUser(Models.GameWorldUser gwUser)
        {
            var deferred = Q.Defer();

            var userLeftGameWorldGameSegmentPubSubReqResMessage = new TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message()
            {
                UserId = gwUser.UserId
            };
            GameWorld.GameWorldPubSub.PublishToGameSegmentWithCallback<TellUserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message>(GameSegmentId, userLeftGameWorldGameSegmentPubSubReqResMessage).Then((userJoinResponse) =>
            {
                //todo IDK
                deferred.Resolve();
            });

            return deferred.Promise;
        }

    }
}