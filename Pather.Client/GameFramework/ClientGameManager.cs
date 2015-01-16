using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using Pather.Client.Utils;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common.Actions.GameSegmentAction;
using Pather.Common.Models.Gateway.Socket.Base;

namespace Pather.Client.GameFramework
{
    public class ClientGameManager
    {
        private   IClientInstantiateLogic clientInstantiateLogic;
        public NetworkManager NetworkManager;
        public FrontEndTickManager FrontEndTickManager;
        public Action OnReady;
        public ClientGame clientGame;

        public ClientGameManager(IClientInstantiateLogic clientInstantiateLogic)
        {
            this.clientInstantiateLogic = clientInstantiateLogic;
            NetworkManager = new NetworkManager();
            FrontEndTickManager = new FrontEndTickManager();
            NetworkManager.OnMessage += onGatewayMessage;
            FrontEndTickManager.Init(sendPing, () =>
            {
//                Global.Console.Log("Connected To Tick Server");
            });

            clientGame = clientInstantiateLogic.CreateClientGame(FrontEndTickManager, NetworkManager);
            FrontEndTickManager.StartPing();
        }

        private void sendPing()
        {
            NetworkManager.SendPing();
        }



        private void onGatewayMessage(Gateway_User_Socket_Message message)
        {
//            Global.Console.Log("Gateway Message", message);

            switch (message.GatewayUserMessageType)
            {
                case Gateway_User_Socket_MessageType.Pong:
                    var pongMessage = (Pong_Gateway_User_PubSub_Message) message;
                    FrontEndTickManager.OnPongReceived(pongMessage);
                    break;
                case Gateway_User_Socket_MessageType.ClientAction:
                    onClientAction(((ClientAction_Gateway_User_Socket_Message) message));
                    break;
                case Gateway_User_Socket_MessageType.UserJoined:
                    onUserJoined(((UserJoined_Gateway_User_Socket_Message) message));
                    break;
                case Gateway_User_Socket_MessageType.TickSync:
                    onTickSyncMessage((TickSync_Gateway_User_Socket_Message) message);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private void onClientAction(ClientAction_Gateway_User_Socket_Message clientActionGatewayUserSocketMessage)
        {
            clientGame.QueueClientAction(clientActionGatewayUserSocketMessage.Action);
        }

        private void onUserJoined(UserJoined_Gateway_User_Socket_Message userJoinedMessage)
        {
            clientGame.Init(userJoinedMessage.LockstepTickNumber, userJoinedMessage.ServerLatency);
            clientGame.InitializeGameBoard(userJoinedMessage.Grid);
            clientGame.MyUserJoined(userJoinedMessage.UserId, userJoinedMessage.X, userJoinedMessage.Y);


            OnReady();
        }

        private void onTickSyncMessage(TickSync_Gateway_User_Socket_Message message)
        {
            FrontEndTickManager.SetLockStepTick(message.LockstepTickNumber);
        }

        public void Tick(long tickNumber)
        {
            clientGame.Tick(tickNumber);
        }
    }
}