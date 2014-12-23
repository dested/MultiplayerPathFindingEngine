using System;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameWorld;
using Pather.Common.Models.Gateway;

namespace Pather.Servers.TickServer
{
    public class TickManager
    {
        public TickPubSub TickPubSub;

        public TickManager(TickPubSub tickPubSub)
        {
            TickPubSub = tickPubSub;
        }

        public long CurLockstepTime;
        public long LockstepTickNumber;
        public void Init(long currentLockstepTickNumber)
        {
            LockstepTickNumber = currentLockstepTickNumber;

            CurLockstepTime = new DateTime().GetTime();
            Global.SetTimeout(Tick, 1);
        }

        private void Tick()
        {
            Global.SetTimeout(Tick, 1);

            var vc = new DateTime().GetTime();
            var l = (vc - CurLockstepTime);

            while (l > Constants.LockstepTicks)
            {
                l -= Constants.LockstepTicks;
                CurLockstepTime += Constants.LockstepTicks;
                LockstepTickNumber++;
                Global.Console.Log("Lockstep", LockstepTickNumber, new DateTime().GetTime());
                ProcessLockstep(LockstepTickNumber);
            }
        }

        private void ProcessLockstep(long lockstepTickNumber)
        {
            if (lockstepTickNumber % 15 == 0)
            {
                TickPubSub.PublishToAllGameSegments(new TickSyncGameSegmentPubSubMessage(lockstepTickNumber));
                TickPubSub.PublishToAllGateways(new TickSyncGatewayPubSubMessage(lockstepTickNumber));
                TickPubSub.PublishToGameWorld(new TickSyncGameWorldPubSubMessage(lockstepTickNumber));

            }
        }
    }
}