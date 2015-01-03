using Pather.Common.old;

namespace Pather.Servers.GameSegmentServer.Old
{
    public class ServerStepManager : Pather.Common.old.StepManager
    {
        public ServerNetworkManager ServerNetworkManager;

        public ServerStepManager(Game game, ServerNetworkManager serverNetworkManager)
            : base(game)
        {
            ServerNetworkManager = serverNetworkManager;
            ServerNetworkManager.OnRecieveAction += ReceiveAction;
        }

        public void SendActionServer(IAction action)
        {
            var serAction = new SerializableAction();
            serAction.Data = action.Data;
            serAction.LockstepTickNumber = action.LockstepTickNumber;
            serAction.Type = action.Type;
        }

        public override void ReceiveAction(SerializableAction serAction)
        {
            base.ReceiveAction(serAction);

            ServerNetworkManager.SendAction(serAction);
        }


        public override int NetworkPlayers
        {
            get { return Game.Players.Count; }
        }
    }
}