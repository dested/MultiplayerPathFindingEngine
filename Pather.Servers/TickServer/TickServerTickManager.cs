using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameWorld;
using Pather.Common.Models.Gateway;
using Pather.Servers.Common;
using Pather.Servers.Common.ServerLogging;

namespace Pather.Servers.TickServer
{
    public class TickServerTickManager : TickManager
    {
        public TickPubSub TickPubSub;
        private bool forceOnNextTick;

        public TickServerTickManager(TickPubSub tickPubSub)
        {
            TickPubSub = tickPubSub;
        }

        public override void ProcessLockstep(long lockstepTickNumber)
        {
            base.ProcessLockstep(lockstepTickNumber);

            if (lockstepTickNumber%15 == 0 || forceOnNextTick)
            {
                forceOnNextTick = false;
                ServerLogger.LogInformation("Pushed Lockstep Tick", lockstepTickNumber);
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