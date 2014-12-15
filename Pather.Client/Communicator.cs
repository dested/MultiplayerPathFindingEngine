using System;
using Pather.Common;
using Pather.Common.Models;
using Pather.Common.Utils;
using SocketIOWebLibrary;

namespace Pather.Client
{
    public class Communicator
    {
        public SocketIOClient Socket { get; set; }
        public string PlayerId { get; set; }

        public Action<NewPlayerModel> OnNewPlayer { get; set; }
        public Action<MoveModel> OnMove { get; set; }
        public Action<ConnectedModel> OnConnected { get; set; }
        public Action<PlayerLeftModel> OnPlayerLeft { get; set; }
        public Action<PlayerListModel> OnPlayerList { get; set; }

        public Communicator()
        {
            Socket = SocketIOClient.Connect("127.0.0.1:8998");
        }

        public void Connect(string playerId)
        {
            PlayerId = playerId;
            Socket.On<DataObject<ConnectedModel>>(SocketChannels.ServerChannel(SocketChannels.Server.Connect), OnConnectedCallback);
            Socket.On<DataObject<NewPlayerModel>>(SocketChannels.ServerChannel(SocketChannels.Server.NewPlayer), OnNewPlayerCallback);
            Socket.On<DataObject<MoveModel>>(SocketChannels.ServerChannel(SocketChannels.Server.Move), OnMoveCallback);

            Socket.On<DataObject<PlayerLeftModel>>(SocketChannels.ServerChannel(SocketChannels.Server.PlayerLeft), OnPlayerLeftCallback);
            Socket.On<DataObject<PlayerListModel>>(SocketChannels.ServerChannel(SocketChannels.Server.PlayerList), OnPlayerListCallback);


            Socket.Emit(SocketChannels.ClientChannel(SocketChannels.Client.Connect), new DataObject<string>(playerId));
        }

        private void OnPlayerListCallback(DataObject<PlayerListModel> obj)
        {
            if (OnPlayerList != null)
            {
                OnPlayerList(obj.Data);
            }
        }

        private void OnPlayerLeftCallback(DataObject<PlayerLeftModel> obj)
        {
            if (OnPlayerLeft != null)
            {
                OnPlayerLeft(obj.Data);
            }
        }


        private void OnMoveCallback(DataObject<MoveModel> obj)
        {
            if (OnMove != null)
                OnMove(obj.Data);
        }

        private void OnNewPlayerCallback(DataObject<NewPlayerModel> obj)
        {
            if (obj.Data.PlayerId == PlayerId)
                return;
            
            if (OnNewPlayer != null)
                OnNewPlayer(obj.Data);
        }

        private void OnConnectedCallback(DataObject<ConnectedModel> obj)
        {
            if (OnConnected != null)
                OnConnected(obj.Data);
        }

        public void SendMove(MoveModel moveModel)
        {
            moveModel.PlayerId = PlayerId;
            Socket.Emit(SocketChannels.ClientChannel(SocketChannels.Client.Move), new DataObject<MoveModel>(moveModel));

        }

    }
}