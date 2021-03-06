using System;
using System.Collections.Generic;
using System.Diagnostics;
using Pather.Common;
using Pather.Common.GameFramework;
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
using Pather.Servers.Common.ServerLogging;
using Pather.Servers.Database;
using Pather.Servers.GameWorldServer.Models;
using Pather.Servers.Utils;

namespace Pather.Servers.GameWorldServer
{
    public class GameWorld
    {
        public ServerLogger ServerLogger;
        public GameWorldPubSub GameWorldPubSub;
        private readonly BackEndTickManager backEndTickManager;
        private readonly IInstantiateLogic instantiateLogic;
        public DictionaryList<string, GameWorldUser> Users;
        public DictionaryList<string, GameSegment> GameSegments;
        public GameBoard Board;


        public GameWorld(GameWorldPubSub gameWorldPubSub, BackEndTickManager backEndTickManager,IInstantiateLogic instantiateLogic,ServerLogger serverLogger)
        {
            ServerLogger = serverLogger;
            GameWorldPubSub = gameWorldPubSub;
            this.backEndTickManager = backEndTickManager;
            this.instantiateLogic = instantiateLogic;
            Users = new DictionaryList<string, GameWorldUser>(a => a.UserId);
            GameSegments = new DictionaryList<string, GameSegment>(a => a.GameSegmentId);
            backEndTickManager.OnProcessLockstep += OnProcessLockstep;


            Board=instantiateLogic.CreateGameBoard();

        }

        public void Init()
        {
            Board.Init();
        }


        public Promise<GameWorldUser, UserJoinError> CreateUser(string gatewayChannel, DBUser dbUser)
        {
            var defer = Q.Defer<GameWorldUser, UserJoinError>();

            var gwUser = new GameWorldUser(this);
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
                ServerLogger.LogError("IDK WHO THIS USER IS", dbUser.Token,dbUser.UserId);
                deferred.Reject();
                //                throw new Exception("IDK WHO THIS USER IS");
            }
            else
            {


                var promises = GameSegments.List
                    .Where(seg => seg != gwUser.GameSegment)
                    .Select(seg => seg.TellSegmentAboutRemoveUser(gwUser));

                promises.Add(gwUser.GameSegment.RemoveUserFromGameSegment(gwUser));

                Q.All(promises)
                    .Then(() =>
                    {
                        Users.Remove(gwUser);
                        ServerLogger.LogInformation("User left", gwUser.UserId);
                        deferred.Resolve();
                    });
            }

            return deferred.Promise;
        }


        private Promise<GameSegment, UndefinedPromiseError> determineGameSegment(GameWorldUser gwUser)
        {
            var deferred = Q.Defer<GameSegment, UndefinedPromiseError>();

            ServerLogger.LogDebug("Trying to determine new game segment");
            var noneFound = true;
            foreach (var neighbor in findClosestNeighbors(gwUser))
            {
                var neighborGameSegment = neighbor.GameSegment;
                if (neighborGameSegment.CanAcceptNewUsers())
                {
                    ServerLogger.LogDebug("Found space in game segment", neighborGameSegment.GameSegmentId);
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
                        ServerLogger.LogDebug("Found space in empty game segment", gameSegment.GameSegmentId);
                        deferred.Resolve(gameSegment);
                        noneFound = false;
                        break;
                    }
                }
            }

            if (noneFound)
            {
                ServerLogger.LogInformation("Creating new segment");
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
                    var gs = new GameSegment(this, ServerLogger);
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
                var reorg = Math.Min(needToReorganize.Count, Constants.NumberOfReorganizedPlayersPerSession);
                ServerLogger.LogDebug("Reorganizing ", reorg, "Users");
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


        public  void GameWorldAction(GameWorldAction_GameSegment_GameWorld_PubSub_Message gameWorldActionGameSegment)
        {
            switch (gameWorldActionGameSegment.Action.GameWorldActionType)
            {
                case GameWorldActionType.MoveEntity:
                    var moveEntity = (MoveEntity_GameWorldAction)gameWorldActionGameSegment.Action;
                    ServerLogger.LogData("Move entity:", moveEntity.LockstepMovePoints);
                    var user = Users[moveEntity.EntityId];
                    user.SetLockstepMovePoints(moveEntity.LockstepMovePoints);
                    break;
                case GameWorldActionType.LogicAction:
                    var logicAction = (LogicAction_GameWorldAction)gameWorldActionGameSegment.Action;
                    ProcessLogicAction(logicAction);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public virtual void ProcessLogicAction(LogicAction_GameWorldAction logicAction)
        {

        }
    }
}