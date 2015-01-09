using System;
using System.Collections.Generic;
using Pather.Common.GameFramework;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common.Actions.ClientActions.Base;

namespace Pather.Client.GameFramework
{
    public class StepManager
    {
        private readonly Game game;

        public StepManager(Game game)
        {
            this.game = game;
            StepActionsTicks = new Dictionary<long, List<ClientAction>>();
            LastTickProcessed = 0;
        }

        public long LastTickProcessed;
        public Dictionary<long, List<ClientAction>> StepActionsTicks;
        private int misprocess;

        public Action<ClientAction> ProcessClientAction;

        public void QueueClientAction(ClientAction action)
        {
            if (!StepActionsTicks.ContainsKey(action.LockstepTick))
            {
                if (action.LockstepTick <= game.tickManager.LockstepTickNumber)
                {
                    ProcessClientAction(action);
                    Global.Console.Log("Misprocess of action count", ++misprocess, game.tickManager.LockstepTickNumber - action.LockstepTick);
                    return;
                }
                StepActionsTicks[action.LockstepTick] = new List<ClientAction>();
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
                ProcessClientAction(stepAction);
            }
            LastTickProcessed = lockstepTickNumber;
            StepActionsTicks.Remove(lockstepTickNumber);
        }
    }
}