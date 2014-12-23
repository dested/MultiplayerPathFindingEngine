using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameWorld;
using Pather.Common.Utils.Promises;

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
            Global.Console.Log("User added to game segment");

            GameWorld.GameWorldPubSub.PublishToGameSegmentWithCallback<UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message>(GameSegmentId, new UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message()
            {
                X = gwUser.X,
                Y = gwUser.Y,
                GatewayServer = gwUser.GatewayServer,
                UserId = gwUser.UserId
            }).Then((userJoinResponse) =>
            {
                Global.Console.Log("User added to game segment");
                Users.Add(gwUser);
                gwUser.GameSegment = this;
                deferred.Resolve();
            });


            return deferred.Promise;
        }
    }
}