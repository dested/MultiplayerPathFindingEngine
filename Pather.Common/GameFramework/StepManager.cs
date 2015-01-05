using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common.UserActions;

namespace Pather.Common.GameFramework
{
    public class StepManager
    {
        private readonly Game game;

        public StepManager(Game game)
        {
            this.game = game;
            StepActionsTicks = new Dictionary<long, List<UserAction>>();
            LastTickProcessed = 0;
        }

        public long LastTickProcessed;
        public Dictionary<long, List<UserAction>> StepActionsTicks;
        private int misprocess;

        public void QueueUserAction(UserAction action)
        {

            if (!StepActionsTicks.ContainsKey(action.LockstepTick))
            {
                if (action.LockstepTick <= game.tickManager.LockstepTickNumber)
                {
                    game.ProcessUserAction(action);
                    Global.Console.Log("Misprocess of action count", ++misprocess, game.tickManager.LockstepTickNumber - action.LockstepTick);
                    return;
                }
                StepActionsTicks[action.LockstepTick] = new List<UserAction>();
            }
            StepActionsTicks[action.LockstepTick].Add(action);
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
                game.ProcessUserAction(stepAction);
            }
            LastTickProcessed = lockstepTickNumber;
            StepActionsTicks.Remove(lockstepTickNumber);
        }
    }
}