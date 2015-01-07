using System;
using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;

namespace Pather.Common.GameFramework
{
    public class StepManager
    {
        private readonly Game game;

        public StepManager(Game game)
        {
            this.game = game;
            StepActionsTicks = new Dictionary<long, List<UserActionModel>>();
            LastTickProcessed = 0;
        }

        public long LastTickProcessed;
        public Dictionary<long, List<UserActionModel>> StepActionsTicks;
        private int misprocess;

        public void QueueUserAction(UserActionModel actionModel)
        {
            var action = actionModel.Action;
            if (!StepActionsTicks.ContainsKey(action.LockstepTick))
            {
                if (action.LockstepTick <= game.tickManager.LockstepTickNumber)
                {
                    ProcessUserActionModel(actionModel);
                    Global.Console.Log("Misprocess of action count", ++misprocess, game.tickManager.LockstepTickNumber - action.LockstepTick);
                    return;
                }
                StepActionsTicks[action.LockstepTick] = new List<UserActionModel>();
            }
            StepActionsTicks[action.LockstepTick].Add(actionModel);
        }

        private void ProcessUserActionModel(UserActionModel actionModel)
        {
            switch (actionModel.Type)
            {
                case UserActionModelType.Regular:
                    game.ProcessUserAction(actionModel.Action);
                    break;
                case UserActionModelType.Neighbor:
                    game.ProcessUserActionFromNeighbor(actionModel.Action);
                    break;
                case UserActionModelType.Tell:
                    game.TellUserAction(actionModel.Action);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }


        public void ProcessAction(long lockstepTickNumber)
        {
            if (!StepActionsTicks.ContainsKey(lockstepTickNumber))
            {
                return;
            }
            var stepActions = StepActionsTicks[lockstepTickNumber];

            foreach (var stepAction in stepActions)
            {
                ProcessUserActionModel(stepAction);
            }
            LastTickProcessed = lockstepTickNumber;
            StepActionsTicks.Remove(lockstepTickNumber);
        }
    }
}