using System;
using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common.UserActions;
using Pather.Servers.GameSegmentServer.Models;

namespace Pather.Servers.GameSegmentServer
{
    public   class StepManager
    {
        private readonly ServerGame serverGame;

        public StepManager(ServerGame serverGame)
        {
            this.serverGame = serverGame;
            StepActionsTicks = new Dictionary<long, List<Tuple<GameSegmentUser, UserAction>>>();
            LastTickProcessed = 0;
        }

        public long LastTickProcessed;
        public Dictionary<long, List<Tuple<GameSegmentUser, UserAction>>> StepActionsTicks;
        private int misprocess;
        
        public   void QueueUserAction(GameSegmentUser user, UserAction action)
        {

            if (!StepActionsTicks.ContainsKey(action.LockstepTick))
            {
                if (action.LockstepTick <= serverGame.tickManager.LockstepTickNumber)
                {
                    serverGame.ProcessUserAction(user,action);
                    Global.Console.Log("Misprocess of action count", ++misprocess, serverGame.tickManager.LockstepTickNumber - action.LockstepTick);
                    return;
                }
                StepActionsTicks[action.LockstepTick] = new List<Tuple<GameSegmentUser,UserAction>>();
            }
            StepActionsTicks[action.LockstepTick].Add(Tuple.Create(user, action));
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
                serverGame.ProcessUserAction(stepAction.Item1, stepAction.Item2);
            }
            LastTickProcessed = lockstepTickNumber;
            StepActionsTicks.Remove(lockstepTickNumber);
        }
    }
}