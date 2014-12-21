using System;
using Pather.Common;

namespace Pather.ServerManager.GameServer
{
    public class ServerGame : Game
    {
        public ServerGame()
            : base()
        {
            StepManager = new ServerStepManager(this, new ServerNetworkManager(this));
            ConstructGrid();
            Ready = true;
        }

        public Action<long> SyncLockstep ;

        public override Entity CreatePlayer(string playerId)
        {
            return new ServerEntity(this, playerId);
        }

        public override TickResult Tick()
        {
            var tickResult = base.Tick();

            if (tickResult == TickResult.Lockstep || tickResult == TickResult.Both)
            {
                SyncLockstep(LockstepTickNumber);
            }


            return tickResult;
        }
    }
}