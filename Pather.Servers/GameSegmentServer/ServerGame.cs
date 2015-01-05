using System;
using Pather.Common.GameFramework;
using Pather.Common.Models.Common.UserActions;
using Pather.Common.Utils;
using Pather.Servers.GameSegmentServer.Models;

namespace Pather.Servers.GameSegmentServer
{
    public class ServerGame
    {
        public TickManager tickManager;
        private GameBoard Board;
        private DictionaryList<string, GameSegmentUser> allUsers;
        private readonly Action<GameSegmentUser, UserAction> sendAction;
        public StepManager StepManager;

        public ServerGame(Action<GameSegmentUser, UserAction> sendAction, DictionaryList<string, GameSegmentUser> allUsers, TickManager tickManager)
        {
            this.tickManager = tickManager;
            this.allUsers = allUsers;
            this.sendAction = sendAction;
            StepManager = new StepManager(this);
            tickManager.OnProcessLockstep += StepManager.ProcessAction;
        }
    


        public void Init(int[][] grid)
        {

            Board = new GameBoard();
            Board.Init(grid);
        }

        public void QueueUserAction(GameSegmentUser user, UserAction action)
        {
            StepManager.QueueUserAction(user, action);
            switch (action.UserActionType)
            {
                case UserActionType.Move:
                    var moveAction = (MoveUserAction)action;
                    sendAction(user, new MoveUserAction()
                    {
                        X = moveAction.X,
                        Y = moveAction.Y,
                        UserId = user.UserId,
                        LockstepTick = moveAction.LockstepTick
                    });
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

        }

        public void ProcessUserAction(GameSegmentUser user, UserAction action)
        {
            switch (action.UserActionType)
            {
                case UserActionType.Move:
                    var moveAction = (MoveUserAction)action;
                    user.X = moveAction.X;
                    user.Y = moveAction.Y;
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
        public void TellUserAction(GameSegmentUser user, UserAction action)
        {
            switch (action.UserActionType)
            {
                case UserActionType.Move:
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public void ProcessUserActionFromNeighbor(GameSegmentUser gameSegmentUser, UserAction action)
        {
            switch (action.UserActionType)
            {
                case UserActionType.Move:
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

    }
}