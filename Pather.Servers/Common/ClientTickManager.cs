using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;

namespace Pather.Servers.Common
{
    public class ClientTickManager : TickManager
    {
        public ClientTickManager()
        {
        }

        public void Init(Action sendPing, Action tickManagerReady)
        {
            this.sendPing = sendPing;
            this.tickManagerReady = tickManagerReady;
            Global.SetTimeout(StartPing, Constants.LatencyPingInterval);
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
        private Action tickManagerReady;

        public void OnPongReceived()
        {
            var cur = new DateTime().GetTime();
            pingSent.Add(cur - lastPing);
            lastPing = cur;

            if (pingSent.Count < 6)
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

                double roundTripLatency = ((double)average / (double)(pingSent.Count));
                int oneWayLatency = (int)roundTripLatency / 2;

                SetServerLatency(oneWayLatency);
                pingSent = null;
            }
        }

        private bool hasLockstep = false;
        private bool hasLatency = false;
        private bool tickManagerInitialized= false;
        public override void SetLockStepTick(long lockStepTickNumber)
        {
            base.SetLockStepTick(lockStepTickNumber);
            hasLockstep = true;
            if (hasLatency && hasLockstep && !tickManagerInitialized)
            {
                tickManagerInitialized = true;
                tickManagerReady();
            }
        }

        public override void SetServerLatency(long latency)
        {
            base.SetServerLatency(latency);
            Global.Console.Log("Severy latency is ", latency, "ms");
            hasLatency = true;
            if (hasLatency && hasLockstep && !tickManagerInitialized)
            {
                tickManagerInitialized = true;
                tickManagerReady();
            }

        }
    }
}