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


        public virtual void Init(int[][] grid, long lockstepTickNumber)
        {
            Board = new GameBoard();
            Board.Init(grid);
            tickManager.SetLockStepTick(lockstepTickNumber);
        }

        public void QueueUserAction(UserAction action)
        {
            StepManager.QueueUserAction(new UserActionModel()
            {
                Action = action,
                Type=UserActionModelType.Regular
            });
        }
        public void QueueTellUserAction(UserAction action)
        {
            StepManager.QueueUserAction(new UserActionModel()
            {
                Action = action,
                Type = UserActionModelType.Tell
            });

        }
        public void QueueUserActionFromNeighbor(UserAction action)
        {
            StepManager.QueueUserAction(new UserActionModel()
            {
                Action = action,
                Type = UserActionModelType.Neighbor
            });

 
        }

        public void ProcessUserAction(UserAction action)
        {
            switch (action.UserActionType)
            {
                case UserActionType.Move:
                    var moveAction = (MoveEntityAction)action;
                    var user = (GameUser)ActiveEntities[moveAction.EntityId];
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

        public void AddEntity(GameEntity entity)
        {
            ActiveEntities.Add(entity);
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
        public virtual void LockstepTick(long lockstepTickNumber)
        {
            foreach (var entity in ActiveEntities.List)
            {
                entity.LockstepTick(lockstepTickNumber);
            }
        }
    }
}