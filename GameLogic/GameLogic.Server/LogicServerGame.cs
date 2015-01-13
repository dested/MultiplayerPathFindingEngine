using System;
using System.Collections.Generic;
using GameLogic.Common;
using Pather.Common.GameFramework;
using Pather.Common.Models.Common.Actions.GameSegmentAction;
using Pather.Common.Models.Common.Actions.NeighborGameSegmentAction;
using Pather.Common.Models.Common.Actions.TellGameSegmentAction;
using Pather.Common.Utils;
using Pather.Servers.Common;
using Pather.Servers.GameSegmentServer;

namespace GameLogic.Server
{
    public class LogicServerGame : ServerGame
    {
        JsDictionary<long, List<CustomLogicAction_NeighborGameSegmentAction>> queuedNeighborActions = new JsDictionary<long, List<CustomLogicAction_NeighborGameSegmentAction>>();
        JsDictionary<long, List<CustomLogicAction_TellGameSegmentAction>> queuedTellActions = new JsDictionary<long, List<CustomLogicAction_TellGameSegmentAction>>();

        public override void ProcessLogicAction(ServerGameUser user, LogicAction_GameSegmentAction action)
        {
            var logicUser = ((LogicServerGameUser)user);
            var logicAction = ((CustomLogicAction_GameSegmentAction)action);
            switch (logicAction.LogicActionType)
            {
                case LogicActionType.CutTree:

                    var cutTreeLogicAction = ((CutTree_CustomLogicAction_GameSegmentAction)action);

                    int treeX = cutTreeLogicAction.TreeX;
                    int treeY = cutTreeLogicAction.TreeY;

                    
                    
                    var completedLockStep = logicUser.CutTree(treeX, treeY, cutTreeLogicAction.LockstepTick);

                    if (completedLockStep == 0)
                    {
                        //bad movement
                        return;
                    }
                    gameManager.SendAction(user,
                        new CutTree_CustomLogicAction_ClientAction()
                        {
                            EntityId = user.EntityId,
                            LockstepTick = cutTreeLogicAction.LockstepTick,
                            TreeX = treeX,
                            TreeY = treeY,
                        },
                        new CutTree_CustomLogicAction_TellGameSegmentAction()
                        {
                            EntityId = user.EntityId,
                            LockstepTick = completedLockStep,
                            TreeX = treeX,
                            TreeY = treeY,
                        },
                        new CutTree_CustomLogicAction_NeighborGameSegmentAction()
                        {
                            EntityId = user.EntityId,
                            LockstepTick = cutTreeLogicAction.LockstepTick,
                            TreeX = treeX,
                            TreeY = treeY,
                        },
                        new CutTree_CustomLogicAction_GameWorldAction()
                        {
                            EntityId = user.EntityId,
                            LockstepTick = cutTreeLogicAction.LockstepTick,
                            TreeX = treeX,
                            TreeY = treeY,
                        }
                        );


                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public override void ProcessTellLogicAction(LogicAction_TellGameSegmentAction logicAction)
        {
            var customLogicAction = ((CustomLogicAction_TellGameSegmentAction)logicAction);
            switch (customLogicAction.LogicActionType)
            {
                case LogicActionType.CutTree:
                    var cutTreeAction = (CutTree_CustomLogicAction_TellGameSegmentAction)customLogicAction;
                    QueueTellAction(cutTreeAction.LockstepTick, cutTreeAction);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private void QueueNeighborAction(long lockstepTick, CustomLogicAction_NeighborGameSegmentAction action)
        {
            if (!queuedNeighborActions.ContainsKey(lockstepTick))
            {
                queuedNeighborActions[lockstepTick] = new List<CustomLogicAction_NeighborGameSegmentAction>();
            }
            queuedNeighborActions[lockstepTick].Add(action);
        }
        private void QueueTellAction(long lockstepTick, CustomLogicAction_TellGameSegmentAction action)
        {
            if (!queuedTellActions.ContainsKey(lockstepTick))
            {
                queuedTellActions[lockstepTick] = new List<CustomLogicAction_TellGameSegmentAction>();
            }
            queuedTellActions[lockstepTick].Add(action);
        }

        public override void ProcessNeighborLogicAction(LogicAction_NeighborGameSegmentAction logicAction)
        {
            var customLogicAction = ((CustomLogicAction_NeighborGameSegmentAction)logicAction);
            switch (customLogicAction.LogicActionType)
            {
                case LogicActionType.CutTree:
                    var cutTreeAction = (CutTree_CustomLogicAction_NeighborGameSegmentAction)customLogicAction;
                    QueueNeighborAction(cutTreeAction.LockstepTick, cutTreeAction);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

        }

        public LogicServerGame(ServerGameManager serverGameManager, BackEndTickManager backEndTickManager)
            : base(serverGameManager, backEndTickManager)
        {


        }

        public override void LockstepTick(long lockstepTickNumber)
        {
            base.LockstepTick(lockstepTickNumber);


            lockstepTellActions(lockstepTickNumber);
            lockstepNeighborActions(lockstepTickNumber);
        }

        private void lockstepNeighborActions(long lockstepTickNumber)
        {
            if (!queuedNeighborActions.ContainsKey(lockstepTickNumber))
            {
                return;
            }
            var customLogicActionGameSegmentActions = queuedNeighborActions[lockstepTickNumber];
            foreach (var action in customLogicActionGameSegmentActions)
            {
                switch (action.LogicActionType)
                {
                    case LogicActionType.CutTree:

                        var cutTreeLogicNeighborAction = (CutTree_CustomLogicAction_NeighborGameSegmentAction) action;
                        int treeX = cutTreeLogicNeighborAction.TreeX;
                        int treeY = cutTreeLogicNeighborAction.TreeY;
                        var logicUser = (LogicServerGameUser) ActiveEntities[cutTreeLogicNeighborAction.EntityId];
                        logicUser.ProcessAction(new CutTree_CustomLogicAction_ClientAction()
                        {
                            TreeX = treeX,
                            TreeY = treeY
                        });

                        break;
                    default:
                        throw new ArgumentOutOfRangeException();
                }
            }
        }
        private void lockstepTellActions(long lockstepTickNumber)
        {
            if (!queuedTellActions.ContainsKey(lockstepTickNumber))
            {
                return;
            }
            var customLogicActionGameSegmentActions = queuedTellActions[lockstepTickNumber];
            foreach (var action in customLogicActionGameSegmentActions)
            {
                switch (action.LogicActionType)
                {
                    case LogicActionType.CutTree:

                        var cutTreeLogicNeighborAction = (CutTree_CustomLogicAction_TellGameSegmentAction) action;
                        int treeX = cutTreeLogicNeighborAction.TreeX;
                        int treeY = cutTreeLogicNeighborAction.TreeY;
                        var logicUser = (LogicServerGameUser) ActiveEntities[cutTreeLogicNeighborAction.EntityId];
                        logicUser.ProcessAction(new CutTree_CustomLogicAction_ClientAction()
                        {
                            TreeX = treeX,
                            TreeY = treeY
                        });

                        break;
                    default:
                        throw new ArgumentOutOfRangeException();
                }
            }
        }
        
        public override void InitializeGameBoard(string[][] grid)
        {
            this.Board = new LogicGameBoard();
            this.Board.Init(grid);
        }

        public override GameUser CreateGameUser(string userId)
        {

            return new LogicServerGameUser(this, userId);
        }
    }
}