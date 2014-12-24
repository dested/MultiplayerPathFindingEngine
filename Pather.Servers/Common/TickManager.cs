using System;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Servers.Common.ServerLogging;

namespace Pather.Servers.Common
{
    public class TickManager
    {
        public TickManager()
        {
        }

        public long LockstepTickNumber;

        private long CurrentLockstepTime;
        private long CurrentServerLatency;

        public virtual void Init(long currentLockstepTickNumber)
        {
            LockstepTickNumber = currentLockstepTickNumber;

            CurrentLockstepTime = new DateTime().GetTime();
            Global.SetTimeout(tick, 1);
        }

        public virtual void SetLockStepTick(long lockStepTickNumber)
        {
            //todo resolve if current > or < lockstep
            if (LockstepTickNumber > lockStepTickNumber)
            {
                LockstepTickNumber = lockStepTickNumber;
                Global.Console.Log("Force Lockstep", lockStepTickNumber);
//           TODO     Game.StepManager.ProcessAction(Game.LockstepTickNumber);
            }
            while (LockstepTickNumber < lockStepTickNumber)
            {
                LockstepTickNumber++;
                Global.Console.Log("Force Lockstep", lockStepTickNumber);
//           TODO     Game.StepManager.ProcessAction(Game.LockstepTickNumber);
            }


            CurrentLockstepTime = new DateTime().GetTime() - CurrentServerLatency;
        }

        public virtual void SetServerLatency(long latency)
        {
            CurrentServerLatency = latency;
        }


        private void tick()
        {
            Global.SetTimeout(tick, 1);

            var vc = new DateTime().GetTime();
            var l = (vc - CurrentLockstepTime);

            while (l > Constants.LockstepTicks)
            {
                l -= Constants.LockstepTicks;
                CurrentLockstepTime += Constants.LockstepTicks;
                LockstepTickNumber++;
                ProcessLockstep(LockstepTickNumber);
            }
        }

        public virtual void ProcessLockstep(long lockstepTickNumber)
        {
            ServerLogger.LogInformation("Lockstep", LockstepTickNumber, new DateTime().GetTime());
        }
    }
}