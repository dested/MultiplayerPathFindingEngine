using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Models;
using Pather.Common.StepManager;

namespace Pather.Client
{
    public class StepManagerClient : StepManager
    {

        public StepManagerClient(Game game, NetworkManager networkManager): base(game) 
        {
            NetworkManager = networkManager;

            NetworkManager.OnReceiveAction = ReceiveAction;
        }

        public NetworkManager NetworkManager { get; set; }

        public override List<NetworkPlayer> NetworkPlayers
        {
            get { return NetworkManager.NetworkPlayers; }
        }

        public void SendActionClient(IAction action)
        {
            SerializableAction serAction = new SerializableAction
            {
                Data = action.Data,
                LockstepTickNumber = action.LockstepTickNumber,
                Type = action.Type
            };
            NetworkManager.SendAction(serAction);
        }

    }

}