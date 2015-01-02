using System;
using Pather.Common.Libraries.NodeJS;

namespace Pather.Common.Utils
{
    public class TickManager
    {
        public TickManager()
        {
        }

        public long LockstepTickNumber;

        private long CurrentLockstepTime;
        public long CurrentServerLatency;

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
                ProcessLockstep(LockstepTickNumber);
            }

            if (LockstepTickNumber < lockStepTickNumber)
            {
                Global.Console.Log("Force Lockstep", lockStepTickNumber);
                while (LockstepTickNumber < lockStepTickNumber)
                {
                    LockstepTickNumber++;
                    ProcessLockstep(LockstepTickNumber);
                }
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
//            Global.Console.Log("Lockstep", LockstepTickNumber, new DateTime().GetTime());
//            ServerLogger.LogInformation("Lockstep", LockstepTickNumber, new DateTime().GetTime());
        }
    }
}