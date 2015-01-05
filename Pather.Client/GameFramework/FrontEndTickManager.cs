using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Gateway.Socket.Base;
using Pather.Common.Utils;

namespace Pather.Client.GameFramework
{
    public class FrontEndTickManager : TickManager
    {
        public FrontEndTickManager()
        {
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

        public void OnPongReceived(Pong_Gateway_User_PubSub_Message pongMessage)
        {
            if (pingSent == null)
            {
                Global.Console.Log("Mis pong");
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

                var latency = oneWayLatency + pongMessage.GatewayLatency;
                SetServerLatency(latency);
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

        public override void SetServerLatency(long latency)
        {
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