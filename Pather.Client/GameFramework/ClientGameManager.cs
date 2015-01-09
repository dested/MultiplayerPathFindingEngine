using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common.Actions.GameSegmentAction;
using Pather.Common.Models.Gateway.Socket.Base;

namespace Pather.Client.GameFramework
{
    public class ClientGameManager
    {
        public NetworkManager NetworkManager;
        public FrontEndTickManager FrontEndTickManager;
        public ClientGameUser MyUser;
        public Action OnReady;
        public ClientGame clientGame;

        public ClientGameManager()
        {
            NetworkManager = new NetworkManager();
            FrontEndTickManager = new FrontEndTickManager();
            NetworkManager.OnMessage += onGatewayMessage;
            FrontEndTickManager.Init(sendPing, () =>
            {
                Global.Console.Log("Connected To Tick Server");
            });
            clientGame = new ClientGame(FrontEndTickManager);
            FrontEndTickManager.StartPing();
        }

        private void sendPing()
        {
            NetworkManager.SendPing();
        }

        public void MoveToLocation(int x, int y)
        {
            NetworkManager.SendClientAction(new MoveEntity_GameSegmentAction()
            {
                X = x,
                Y = y,
                LockstepTick = FrontEndTickManager.LockstepTickNumber + 1
            });
        }


        private void onGatewayMessage(Gateway_User_Socket_Message message)
        {
            Global.Console.Log("Gateway Message", message);

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
            clientGame.Init(userJoinedMessage.Grid, userJoinedMessage.LockstepTickNumber, userJoinedMessage.ServerLatency);

            clientGame.MyUserJoined(userJoinedMessage.UserId, userJoinedMessage.X, userJoinedMessage.Y);


            OnReady();
        }

        private void onTickSyncMessage(TickSync_Gateway_User_Socket_Message message)
        {
            FrontEndTickManager.SetLockStepTick(message.LockstepTickNumber);
        }

        public void Draw(Dictionary<string, CanvasRenderingContext2D> contextCollection, double interpolatedTime)
        {
            contextCollection["Foreground"].ClearRect(0, 0, 1200, 1200);
            DrawBackground(contextCollection["Background"]);
            clientGame.DrawEntities(contextCollection["Foreground"], interpolatedTime);
        }

        private void DrawBackground(CanvasRenderingContext2D context)
        {
            context.ClearRect(0, 0, 1200, 1200);
            context.Save();
            context.FillStyle = "black";
            context.FillRect(0, 0, 1200, 1200);

            context.FillStyle = "blue";
            for (var y = 0; y < Constants.NumberOfSquares; y++)
            {
                for (var x = 0; x < Constants.NumberOfSquares; x++)
                {
                    if (clientGame.Board.Grid[x][y] == 0)
                    {
                        context.FillRect(x*Constants.SquareSize, y*Constants.SquareSize, Constants.SquareSize, Constants.SquareSize);
                    }
                }
            }
            context.Restore();
        }

        public void Tick(long tickNumber)
        {
            clientGame.Tick(tickNumber);
        }
    }
}