using System;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;

namespace Pather.Servers.Common
{
    public class TickManager
    {

        public TickManager()
        {
        }
        
        public long CurLockstepTime;
        public long LockstepTickNumber;
        public void Init(long currentLockstepTickNumber)
        {
            LockstepTickNumber = currentLockstepTickNumber;

            CurLockstepTime = new DateTime().GetTime();
            Global.SetTimeout(tick, 1);
        }

        public virtual void SetLockStepTick(long lockStepTickNumber)
        {
            LockstepTickNumber = lockStepTickNumber;
            //todo resolve if current > or < lockstep
        }
        public virtual void SetServerLatency(long latency)
        {
            CurLockstepTime = new DateTime().GetTime() - latency;
        }

        private void tick()
        {
            Global.SetTimeout(tick, 1);

            var vc = new DateTime().GetTime();
            var l = (vc - CurLockstepTime);

            while (l > Constants.LockstepTicks)
            {
                l -= Constants.LockstepTicks;
                CurLockstepTime += Constants.LockstepTicks;
                LockstepTickNumber++;
                ProcessLockstep(LockstepTickNumber);
            }
        }

        public virtual void ProcessLockstep(long lockstepTickNumber)
        {
            Global.Console.Log("Lockstep", LockstepTickNumber, new DateTime().GetTime());
        }
    }
}