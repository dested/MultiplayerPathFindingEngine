using System;
using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Utils.Histogram;

namespace Pather.Common.Utils
{
    public abstract class TickManager
    {
        public IServerLogger ServerLogger;

        public TickManager(IServerLogger serverLogger)
        {
            ServerLogger = serverLogger;
        }

        public long LockstepTickNumber;
        public Action<long> OnProcessLockstep;

        public long CurrentLockstepTime;
        public int CurrentServerLatency;

        public virtual void Init(long currentLockstepTickNumber)
        {
            LockstepTickNumber = currentLockstepTickNumber;

            CurrentLockstepTime = new DateTime().GetTime();
            Global.SetTimeout(tick, 1);
        }

        public abstract void LockstepForced(long lockStepTickNumber);

        public virtual void SetLockStepTick(long lockStepTickNumber)
        {
            //todo resolve if current > or < lockstep
            if (LockstepTickNumber > lockStepTickNumber)
            {
                LockstepTickNumber = lockStepTickNumber;
                LockstepForced(lockStepTickNumber);
                ProcessLockstep(LockstepTickNumber);
            }

            if (LockstepTickNumber < lockStepTickNumber)
            {
                LockstepForced(lockStepTickNumber);
                while (LockstepTickNumber < lockStepTickNumber)
                {
                    LockstepTickNumber++;
                    ProcessLockstep(LockstepTickNumber);
                }
            }


            CurrentLockstepTime = new DateTime().GetTime() - CurrentServerLatency;
        }

        public virtual void SetServerLatency(int latency)
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

                var now = DateTime.Now;
                ProcessLockstep(LockstepTickNumber);
                var dt = DateTime.Now - now;
                HistogramManager.AddPoint("Tick", dt);
            }
        }

        public void ProcessLockstep(long lockstepTickNumber)
        {
            if (OnProcessLockstep != null)
            {
                try
                {
                    OnProcessLockstep(lockstepTickNumber);
                }
                catch (Exception ex)
                {
                    if (ServerLogger != null)
                        ServerLogger.LogError("Error on lockstep", ex);
                    else
                    {
                        Logger.Log("Client", "Error on lockstep", new object[] {ex.Message,ex.Stack,ex.InnerException}, LogLevel.Error);
                    }
                }

            }
//            ServerLogger.LogInformation("Lockstep", LockstepTickNumber, new DateTime().GetTime());
        }
    }
    public interface IServerLogger
    {
        void LogInformation(string item, params object[] jsonContent);
        void LogDebug(string item, params object[] jsonContent);
        void LogKeepAlive();
        void LogError(string item, params object[] jsonContent);
        void LogError(string item, Exception ex);
        void LogTransport(string item, params object[] jsonContent);
        void LogData(string item, params object[] jsonContent);
    }

}