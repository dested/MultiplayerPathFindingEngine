using System;
using System.Collections.Generic;
using System.Html;
using Pather.Common;
using Pather.Common.Libraries;
using Pather.Common.Models;

namespace Pather.Client
{
    public class ClientNetworkManager
    {
        public ClientCommunicator ClientCommunicator ;
        public int NetworkPlayers ;

        public Action<SerializableAction> OnReceiveAction ;
        public Action<ConnectedModel> OnConnected ;
        public Action<PlayerSyncModel> OnPlayerSync ;
        public Action<SyncLockstepModel> OnSetLockStep ;
        public Action<int> OnSetLatency ;

        private long lastPing=0;
        private List<long> pingSent;

        public ClientNetworkManager()
        {
            ClientCommunicator = new ClientCommunicator();
            NetworkPlayers = 0;

            ClientCommunicator.ListenOnChannel<ConnectedModel>(SocketChannels.ServerChannel(SocketChannels.Server.Connect),
                (model) =>
                {
                    OnConnected(model);
                    TriggerPingTest();
                    Window.SetInterval(TriggerPingTest, 1000*60);
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


            ClientCommunicator.ListenOnChannel<PingPongModel>(
                SocketChannels.ServerChannel(SocketChannels.Server.Pong),
                (model) =>
                {

                    var cur= new DateTime().GetTime();
                    pingSent.Add(cur - lastPing);
                    lastPing = cur;

                    if (pingSent.Count < 6)
                    {
                        ClientCommunicator.SendMessage(SocketChannels.ClientChannel(SocketChannels.Client.Ping), new PingPongModel());
                    }
                    else
                    {
                        var average = 0L;

                        foreach (var l in pingSent)
                        {
                            average += l;
                        }


                        OnSetLatency((int)((double)average / (double)(pingSent.Count)) / 2);
                        pingSent = null;
                    }
                });


            ClientCommunicator.ListenOnChannel<SyncLockstepModel>(
                SocketChannels.ServerChannel(SocketChannels.Server.SyncLockstep),
                (model) =>
                {
                    OnSetLockStep(model);
                });



            ClientCommunicator.ListenOnChannel<SerializableAction>(
                SocketChannels.ServerChannel(SocketChannels.Server.PostAction),
                (model) =>
                {
                    ReceiveAction(model);
                });



        }

        private void TriggerPingTest()
        {

            pingSent = new List<long>();
            lastPing = new DateTime().GetTime();
            ClientCommunicator.SendMessage(SocketChannels.ClientChannel(SocketChannels.Client.Ping), new PingPongModel());
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