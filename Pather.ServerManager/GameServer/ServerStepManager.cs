using Pather.Common;

namespace Pather.ServerManager.GameServer
{
    public class ServerStepManager : StepManager
    {
        public ServerNetworkManager ServerNetworkManager ;

        public ServerStepManager(Game game, ServerNetworkManager serverNetworkManager)
            : base(game)
        {
            ServerNetworkManager = serverNetworkManager;
            ServerNetworkManager.OnRecieveAction += ReceiveAction;
        }

        public void SendActionServer(IAction action)
        {
            SerializableAction serAction = new SerializableAction();
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