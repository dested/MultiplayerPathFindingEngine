using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Definitions.AStar;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Game.Old;

namespace Pather.Client.Old
{
    public class ClientStepManager : StepManager
    {
        public ClientNetworkManager ClientNetworkManager;

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
            ClientNetworkManager.OnSetLockStep = OnSetLockstep;
            ClientNetworkManager.OnSetLatency = OnSetLatency;
        }


        private void OnSetLatency(int latency)
        {
            Game.ServerLatency = latency;
            Global.Console.Log("Latency:", latency);
        }

        private void OnSetLockstep(SyncLockstepModel model)
        {
//            Global.Console.Log("Tick Number ", model.LockstepTickNumber, "Happened ", Game.ServerLatency, "Ago");
            //todo this should happen at the same time as setlat3ency 
            Game.CurLockstepTime = new DateTime().GetTime() - Game.ServerLatency;

            if (Game.LockstepTickNumber == 0)
            {
                Game.Ready = true;
                Game.LockstepTickNumber = model.LockstepTickNumber;
            }
            else
            {
                if (Game.LockstepTickNumber > model.LockstepTickNumber)
                {
                    Game.LockstepTickNumber = model.LockstepTickNumber;
                    Global.Console.Log("Force Lockstep", Game.LockstepTickNumber);
                    Game.StepManager.ProcessAction(Game.LockstepTickNumber);
                }
                if (Game.LockstepTickNumber < model.LockstepTickNumber)
                {
                    Global.Console.Log("Force Lockstep", Game.LockstepTickNumber);
                    while (Game.LockstepTickNumber < model.LockstepTickNumber)
                    {
                        Game.LockstepTickNumber++;
                        Game.StepManager.ProcessAction(Game.LockstepTickNumber);
                    }
                }
            }
        }

        private void Connected(ConnectedModel model)
        {
            Game.Grid = model.Grid;
            Game.AStarGraph = new AStarGraph(Game.Grid);

            Game.Players = new List<Entity>();
            ClientNetworkManager.JoinPlayer(((ClientGame) Game).MyPlayerId);
        }

        private void PlayerSync(PlayerSyncModel model)
        {
            if (model.JoinedPlayers != null)
            {
                foreach (var playerModel in model.JoinedPlayers)
                {
                    var player = Game.CreatePlayer(playerModel.PlayerId);
                    player.Init(playerModel.X, playerModel.Y);
                    Game.Players.Add(player);
                    if (((ClientGame) Game).MyPlayerId == playerModel.PlayerId)
                    {
                        ((ClientGame) Game).LocalPlayerJoined(player);
                    }
                }
            }

            if (model.LeftPlayers != null)
            {
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
        }

        public void SendActionClient(IAction action)
        {
            var serAction = new SerializableAction
            {
                Data = action.Data,
                LockstepTickNumber = action.LockstepTickNumber,
                Type = action.Type
            };
            ClientNetworkManager.SendAction(serAction);
        }
    }
}