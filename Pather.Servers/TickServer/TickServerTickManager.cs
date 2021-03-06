﻿using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameWorld.Tick;
using Pather.Common.Models.Gateway.PubSub;
using Pather.Common.Utils;
using Pather.Servers.Common.ServerLogging;

namespace Pather.Servers.TickServer
{
    public class TickServerTickManager : TickManager
    {
        public TickPubSub TickPubSub;
        private bool forceOnNextTick;

        public TickServerTickManager(ServerLogger serverLogger,TickPubSub tickPubSub):base(serverLogger)
        {
            TickPubSub = tickPubSub;
            OnProcessLockstep += onProcessLockstep;
        }

        public override void LockstepForced(long lockStepTickNumber)
        {
            ServerLogger.LogDebug("Force Lockstep", lockStepTickNumber);
        }

        private void onProcessLockstep(long lockstepTickNumber)
        {
            if (lockstepTickNumber%15 == 0 || forceOnNextTick)
            {
                forceOnNextTick = false;
                ServerLogger.LogData("Pushed Lockstep Tick", lockstepTickNumber);
                TickPubSub.PublishToAllGameSegments(new TickSync_GameSegment_PubSub_AllMessage(lockstepTickNumber));
                TickPubSub.PublishToAllGateways(new TickSync_Tick_Gateway_PubSub_AllMessage(lockstepTickNumber));
                TickPubSub.PublishToGameWorld(new TickSync_Tick_GameWorld_PubSub_Message(lockstepTickNumber));
            }
        }

        public void ForceOnNextTick()
        {
            forceOnNextTick = true;
        }
    }
}