using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Utils;
using Pather.Servers.Common.ServerLogging;

namespace Pather.Servers.Common
{
    public class BackEndTickManager : TickManager
    {


        public BackEndTickManager(ServerLogger serverLogger):base(serverLogger)
        {
        }
        public override void LockstepForced(long lockStepTickNumber)
        {
            ServerLogger.LogDebug("Force Lockstep", lockStepTickNumber);
        }

        public void Init(Action sendPing, Action onTickManagerReady)
        {
            this.sendPing = sendPing;
            this.onTickManagerReady = onTickManagerReady;
            Global.SetInterval(StartPing, Constants.LatencyPingInterval);
        }

        public void StartPing()
        {
            pingSent = new List<long>();
            lastPing = new DateTime().GetTime();
            sendPing();
        }

        private long lastPing = 0;
        private List<long> pingSent;

        private Action sendPing;
        private Action onTickManagerReady;

        public void OnPongReceived()
        {
            if (pingSent == null)
            {
                ServerLogger.LogError("Tried to send pong, but already completed ping cycle");
                return;
            }

            var cur = new DateTime().GetTime();
            pingSent.Add(cur - lastPing);
            lastPing = cur;

            if (pingSent.Count < 2)
            {
                sendPing();
            }
            else
            {
                var average = 0L;

                foreach (var l in pingSent)
                {
                    average += l;
                }

                var roundTripLatency = ((double) average/(double) (pingSent.Count));
                var oneWayLatency = (int) roundTripLatency/2;

                SetServerLatency(oneWayLatency);
                pingSent = null;
            }
        }

        private bool hasLockstep = false;
        private bool hasLatency = false;
        private bool tickManagerInitialized = false;

        public override void SetLockStepTick(long lockStepTickNumber)
        {
            base.SetLockStepTick(lockStepTickNumber);
            hasLockstep = true;
            if (hasLatency && hasLockstep && !tickManagerInitialized)
            {
                tickManagerInitialized = true;
                TickManagerReady();
            }
        }

        public override void SetServerLatency(int latency)
        {
            if (CurrentServerLatency != latency)
            {
                ServerLogger.LogDebug("Severy latency is ", latency, "ms");
            }
            base.SetServerLatency(latency);
            hasLatency = true;
            if (hasLatency && hasLockstep && !tickManagerInitialized)
            {
                tickManagerInitialized = true;
                TickManagerReady();
            }
        }

        private void TickManagerReady()
        {
            Init(LockstepTickNumber);
            onTickManagerReady();
        }
    }
}