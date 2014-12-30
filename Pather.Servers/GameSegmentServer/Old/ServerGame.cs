using System;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.old;
using Pather.Servers.Common.SocketManager;

namespace Pather.Servers.GameSegmentServer.Old
{
    public class ServerGame : Game
    {
        public ServerGame(ISocketManager socketManager, string gameServerName)
            : base()
        {
            Global.Console.Log(gameServerName + " Has come online");
            StepManager = new ServerStepManager(this, new ServerNetworkManager(this, socketManager));
            ConstructGrid();
            Ready = true;
        }

        public Action<long> SyncLockstep;

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