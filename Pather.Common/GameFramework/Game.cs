using System;
using System.Collections.Generic;
using Pather.Common.Models.Common;
using Pather.Common.Models.Common.UserActions;
using Pather.Common.Utils;

namespace Pather.Common.GameFramework
{
    public abstract class Game
    {
        public TickManager tickManager;
        public GameBoard Board;
        public StepManager StepManager;
        public DictionaryList<string, GameEntity> ActiveEntities = new DictionaryList<string, GameEntity>(a => a.EntityId);
        public GameUser MyUser;

        public Game(TickManager tickManager)
        {
            this.tickManager = tickManager;
            StepManager = new StepManager(this);
            tickManager.OnProcessLockstep += StepManager.ProcessAction;
        }


        public virtual void Init(int[][] grid)
        {
            Board = new GameBoard();
            Board.Init(grid);
        }

        public void QueueUserAction(UserAction action)
        {
            StepManager.QueueUserAction(action);
        }

        public void ProcessUserAction(UserAction action)
        {
            switch (action.UserActionType)
            {
                case UserActionType.Move:
                    var moveAction = (MoveUserAction)action;
                    var user = (GameUser)ActiveEntities[moveAction.UserId];
                    user.RePathFind(moveAction.X, moveAction.Y);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
        public void TellUserAction(UserAction action)
        {
            switch (action.UserActionType)
            {
                case UserActionType.Move:
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public void ProcessUserActionFromNeighbor(UserAction action)
        {
            switch (action.UserActionType)
            {
                case UserActionType.Move:
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public void MyUserJoined(string userId, int x, int y)
        {


            var clientUser = CreateGameUser(userId);
            clientUser.X = x;
            clientUser.Y = y;
            ActiveEntities.Add(clientUser);
            MyUser = clientUser;


        }

        public virtual GameUser CreateGameUser(string userId)
        {
            return new GameUser(this, userId);
        }

        public void UpdateNeighbors(List<UpdatedNeighbor> added, List<string> removed)
        {
            foreach (var userId in removed)
            {
                var user = ActiveEntities[userId];
                ActiveEntities.Remove(user);
            }

            foreach (var updatedNeighbor in added)
            {
                var user = CreateGameUser(updatedNeighbor.UserId);
                user.X = updatedNeighbor.X;
                user.Y = updatedNeighbor.Y;
                ActiveEntities.Add(user);
            }
        }

        public virtual void Tick(long tickNumber)
        {
            foreach (var person in ActiveEntities.List)
            {
                person.Tick();
            }
        }
    }
}