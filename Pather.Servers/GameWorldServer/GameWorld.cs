using System;
using System.Collections.Generic;
using System.Diagnostics;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common.Actions.GameWorldAction;
using Pather.Common.Models.Common.Actions.GameWorldAction.Base;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameWorld.Gateway;
using Pather.Common.Models.GameWorld.ServerManager;
using Pather.Common.Models.Gateway.PubSub;
using Pather.Common.Models.ServerManager.Base;
using Pather.Common.Utils;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common;
using Pather.Servers.Database;
using Pather.Servers.GameWorldServer.Models;

namespace Pather.Servers.GameWorldServer
{
    public class GameWorld
    {
        public GameWorldPubSub GameWorldPubSub;
        private readonly BackEndTickManager backEndTickManager;
        public DictionaryList<string, GameWorldUser> Users;
        public DictionaryList<string, GameSegment> GameSegments;

        public GameWorld(GameWorldPubSub gameWorldPubSub, BackEndTickManager backEndTickManager)
        {
            GameWorldPubSub = gameWorldPubSub;
            this.backEndTickManager = backEndTickManager;
            Users = new DictionaryList<string, GameWorldUser>(a => a.UserId);
            GameSegments = new DictionaryList<string, GameSegment>(a => a.GameSegmentId);
            backEndTickManager.OnProcessLockstep += OnProcessLockstep;
        }


        public Promise<GameWorldUser, UserJoinError> CreateUser(string gatewayChannel, DBUser dbUser)
        {
            var defer = Q.Defer<GameWorldUser, UserJoinError>();

            var gwUser = new GameWorldUser();
            gwUser.UserId = dbUser.UserId;
            gwUser.X = dbUser.X;
            gwUser.Y = dbUser.Y;
            gwUser.GatewayId = gatewayChannel;
            determineGameSegment(gwUser).Then(gameSegment =>
            {
                gameSegment.PreAddUserToSegment(gwUser);
                defer.Resolve(gwUser);
            });
            Global.SetInterval(Reorganize, Constants.ReorganizeGameWorldInterval);
            return defer.Promise;
        }

        public Promise UserLeft(DBUser dbUser)
        {
            var deferred = Q.Defer();

            var gwUser = Users[dbUser.UserId];

            if (gwUser == null)
            {
                Global.Console.Log("IDK WHO THIS USER IS", dbUser);
                throw new Exception("IDK WHO THIS USER IS");
            }


            var promises = GameSegments.List
                .Where(seg => seg != gwUser.GameSegment)
                .Select(seg => seg.TellSegmentAboutRemoveUser(gwUser));

            promises.Add(gwUser.GameSegment.RemoveUserFromGameSegment(gwUser));

            Q.All(promises)
                .Then(() =>
                {
                    Users.Remove(gwUser);
                    Global.Console.Log("User left", gwUser.UserId);
                    deferred.Resolve();
                });


            return deferred.Promise;
        }


        private Promise<GameSegment, UndefinedPromiseError> determineGameSegment(GameWorldUser gwUser)
        {
            var deferred = Q.Defer<GameSegment, UndefinedPromiseError>();

            Global.Console.Log("Trying to determine new game segment");
            var noneFound = true;
            foreach (var neighbor in findClosestNeighbors(gwUser))
            {
                var neighborGameSegment = neighbor.GameSegment;
                if (neighborGameSegment.CanAcceptNewUsers())
                {
                    Global.Console.Log("Found", neighborGameSegment.GameSegmentId);
                    deferred.Resolve(neighborGameSegment);
                    noneFound = false;
                    break;
                }
            }

            if (noneFound)
            {
                foreach (var gameSegment in GameSegments.List)
                {
                    if (gameSegment.CanAcceptNewUsers())
                    {
                        Global.Console.Log("Found2", gameSegment.GameSegmentId);
                        deferred.Resolve(gameSegment);
                        noneFound = false;
                        break;
                    }
                }
            }

            if (noneFound)
            {
                Global.Console.Log("Creating new ");
                return CreateGameSegment();
            }

            return deferred.Promise;
        }

        private IEnumerable<GameWorldUser> findClosestNeighbors(GameWorldUser gwUser)
        {
            foreach (var user in Users.List)
            {
                if (gwUser.Distance(user) < Constants.NeighborDistance*2)
                {
                    yield return user;
                }
            }
        }


        public Promise<GameSegment, UndefinedPromiseError> CreateGameSegment()
        {
            var deferred = Q.Defer<GameSegment, UndefinedPromiseError>();


            GameWorldPubSub.PublishToServerManagerWithCallback<CreateGameSegment_Response_ServerManager_GameWorld_PubSub_ReqRes_Message>(new CreateGameSegment_GameWorld_ServerManager_PubSub_ReqRes_Message())
                .Then((createGameMessageResponse) =>
                {
                    var gs = new GameSegment(this);
                    gs.GameSegmentId = createGameMessageResponse.GameSegmentId;


                    foreach (var gameSegment in GameSegments.List)
                    {
                        GameWorldPubSub.PublishToGameSegment(gameSegment.GameSegmentId, new NewGameSegment_GameWorld_GameSegment_PubSub_Message()
                        {
                            GameSegmentId = gs.GameSegmentId
                        });
                    }

                    GameSegments.Add(gs);
                    deferred.Resolve(gs);
                });


            return deferred.Promise;
        }


        private readonly List<ReoragGameWorldModel> needToReorganize = new List<ReoragGameWorldModel>();

        public void ChangeUsersGameSegment(GameWorldUser gameWorldUser, GameSegment bestGameSegment)
        {
            needToReorganize.Add(new ReoragGameWorldModel(gameWorldUser, bestGameSegment));
        }

        public void Reorganize()
        {
            if (needToReorganize.Count > 0)
            {
                Debug.Break();
                Global.Console.Log(needToReorganize);
                var reorg = Math.Min(needToReorganize.Count, Constants.NumberOfReorganizedPlayersPerSession);
                for (var i = reorg - 1; i >= 0; i--)
                {
                    var gameWorldUser = needToReorganize[i].GameWorldUser;
                    var oldGameSegment = gameWorldUser.GameSegment;
                    var newGameSegment = needToReorganize[i].BestGameSegment;

                    gameWorldUser.GameSegment = newGameSegment;
                    GameWorldPubSub.PublishToGameSegment(oldGameSegment.GameSegmentId, new ReorganizeUser_GameWorld_GameSegment_PubSub_Message()
                    {
                        NewGameSegmentId = newGameSegment.GameSegmentId,
                        UserId = gameWorldUser.UserId,
                        SwitchAtLockstepNumber = backEndTickManager.LockstepTickNumber + Constants.GameSegmentReorgSwitchLockstepOffset
                    });
                    GameWorldPubSub.PublishToGatewayServer(gameWorldUser.GatewayId, new ReorganizeUser_GameWorld_Gateway_PubSub_Message()
                    {
                        NewGameSegmentId = newGameSegment.GameSegmentId,
                        UserId = gameWorldUser.UserId,
                        SwitchAtLockstepNumber = backEndTickManager.LockstepTickNumber + Constants.GameSegmentReorgSwitchLockstepOffset
                    });
                    needToReorganize.RemoveAt(i);
                }
            }
        }

        private void OnProcessLockstep(long lockstepTickNumber)
        {
            foreach (var gameWorldUser in Users.List)
            {
                gameWorldUser.LockstepTick(lockstepTickNumber);
            }
        }


        public void GameWorldAction(GameWorldAction_GameSegment_GameWorld_PubSub_Message gameWorldActionGameSegment)
        {
            switch (gameWorldActionGameSegment.Action.GameWorldActionType)
            {
                case GameWorldActionType.MoveEntity:
                    var moveEntity = (MoveEntity_GameWorldAction) gameWorldActionGameSegment.Action;
//                    Global.Console.Log("Move entity:",moveEntity);
                    var user = Users[moveEntity.EntityId];
                    user.SetLockstepMovePoints(moveEntity.LockstepMovePoints);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
    }
}