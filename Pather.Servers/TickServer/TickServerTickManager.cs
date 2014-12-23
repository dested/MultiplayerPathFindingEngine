using System;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
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

            if (lockstepTickNumber % 15 == 0)
            {
                TickPubSub.PublishToAllGameSegments(new TickSyncGameSegmentPubSubAllMessage(lockstepTickNumber));
                TickPubSub.PublishToAllGateways(new TickSyncGatewayPubSubAllMessage(lockstepTickNumber));
                TickPubSub.PublishToGameWorld(new TickSyncGameWorldPubSubMessage(lockstepTickNumber));

            }
        }
    }
}