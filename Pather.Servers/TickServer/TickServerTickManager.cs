using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameWorld;
using Pather.Common.Models.Gateway;
using Pather.Servers.Common;

namespace Pather.Servers.TickServer
{
    public class TickServerTickManager : TickManager
    {
        public TickPubSub TickPubSub;

        public TickServerTickManager(TickPubSub tickPubSub)
        {
            TickPubSub = tickPubSub;
        }

        public override void ProcessLockstep(long lockstepTickNumber)
        {
            base.ProcessLockstep(lockstepTickNumber);

            if (lockstepTickNumber%15 == 0)
            {
                TickPubSub.PublishToAllGameSegments(new TickSync_GameSegment_PubSub_AllMessage(lockstepTickNumber));
                TickPubSub.PublishToAllGateways(new TickSync_Gateway_PubSub_AllMessage(lockstepTickNumber));
                TickPubSub.PublishToGameWorld(new TickSync_GameWorld_PubSub_Message(lockstepTickNumber));
            }
        }
    }
}