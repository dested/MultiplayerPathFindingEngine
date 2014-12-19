using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Models;

namespace Pather.Client
{
    public class ClientStepManager : StepManager
    {
        public ClientNetworkManager ClientNetworkManager { get; set; }

        public override int NetworkPlayers
        {
            get { return ClientNetworkManager.NetworkPlayers; }
        }

        public ClientStepManager(ClientGame game, ClientNetworkManager clientNetworkManager)
            : base(game)
        {
            ClientNetworkManager = clientNetworkManager;
            ClientNetworkManager.OnReceiveAction = ReceiveAction;
            ClientNetworkManager.OnConnected = Connected;
            ClientNetworkManager.OnPlayerSync = PlayerSync;
        }

        private void Connected(ConnectedModel model)
        {
            Game.LockstepTickNumber = model.LockstepTickNumber;
            Game.Players = new List<Entity>();
            ClientNetworkManager.JoinPlayer(((ClientGame)Game).MyPlayerId);
        }

        private void PlayerSync(PlayerSyncModel model)
        {
            if (model.JoinedPlayers != null)
                foreach (var playerModel in model.JoinedPlayers)
                {
                    var player = Game.CreatePlayer(playerModel.PlayerId);
                    player.Init(playerModel.X, playerModel.Y);
                    Game.Players.Add(player);
                    if (((ClientGame)Game).MyPlayerId == playerModel.PlayerId)
                    {
                        ((ClientGame)Game).LocalPlayerJoined(player);
                    }
                }

            if (model.LeftPlayers != null)
                foreach (var playerModel in model.LeftPlayers)
                {
                    foreach (var person in Game.Players)
                    {
                        if (person.PlayerId == playerModel.PlayerId)
                        {
                            Game.Players.Remove(person);
                            break;
                        }
                    }
                }
        }

        public void SendActionClient(IAction action)
        {
            SerializableAction serAction = new SerializableAction
            {
                Data = action.Data,
                LockstepTickNumber = action.LockstepTickNumber,
                Type = action.Type
            };
            ClientNetworkManager.SendAction(serAction);
        }

    }

}