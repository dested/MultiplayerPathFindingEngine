using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.StepManager;

namespace Pather.Client
{
    public class NetworkManager
    {
        public Communicator Communicator { get; set; }
        public List<NetworkPlayer> NetworkPlayers { get; set; }
        public Action<SerializableAction> OnReceiveAction { get; set; }

        public NetworkManager()
        {
            Communicator = new Communicator();
            NetworkPlayers = new List<NetworkPlayer>();
            Communicator.Connect();
        }

        public void SendAction(SerializableAction serAction)
        {
            Communicator.SendMessage(SocketChannels.ClientChannel(SocketChannels.Client.PostAction), serAction);
        }

        public void ReceiveAction(SerializableAction serAction)
        {
            OnReceiveAction(serAction);
        }
    }


}