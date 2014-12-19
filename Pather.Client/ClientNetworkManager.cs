using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Libraries;
using Pather.Common.Models;

namespace Pather.Client
{
    public class ClientNetworkManager
    {
        public ClientCommunicator ClientCommunicator { get; set; }
        public int NetworkPlayers { get; set; }

        public Action<SerializableAction> OnReceiveAction { get; set; }
        public Action<ConnectedModel> OnConnected { get; set; }
        public Action<PlayerSyncModel> OnPlayerSync { get; set; }




        public ClientNetworkManager()
        {
            ClientCommunicator = new ClientCommunicator();
            NetworkPlayers = 0;

            ClientCommunicator.ListenOnChannel<ConnectedModel>(SocketChannels.ServerChannel(SocketChannels.Server.Connect),
                (model) =>
                {
                    OnConnected(model);
                });

            ClientCommunicator.ListenOnChannel<PlayerSyncModel>(
                SocketChannels.ServerChannel(SocketChannels.Server.PlayerSync),
                (model) =>
                {
                    if (model.JoinedPlayers != null)
                        NetworkPlayers += model.JoinedPlayers.Count;
                    if (model.LeftPlayers != null)
                        NetworkPlayers -= model.LeftPlayers.Count;
                    OnPlayerSync(model);
                });


            ClientCommunicator.ListenOnChannel<SerializableAction>(
                SocketChannels.ServerChannel(SocketChannels.Server.PostAction),
                (model) =>
                {
                    ReceiveAction(model);
                });



        }

        public void SendAction(SerializableAction serAction)
        {
            ClientCommunicator.SendMessage(SocketChannels.ClientChannel(SocketChannels.Client.PostAction), serAction);
        }

        public void ReceiveAction(SerializableAction serAction)
        {
            OnReceiveAction(serAction);
        }

        public void JoinPlayer(string myPlayerId)
        {
            ClientCommunicator.SendMessage(SocketChannels.ClientChannel(SocketChannels.Client.JoinPlayer),
                new PlayerJoinModel() { PlayerId = myPlayerId }
                );

        }
    }
}