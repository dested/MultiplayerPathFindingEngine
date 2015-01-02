using System;
using System.Serialization;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common.UserActions;
using Pather.Common.Models.Gateway.Socket.Base;
using Pather.Common.Utils;

namespace Pather.Client
{
    public class GameManager
    {
        public NetworkManager NetworkManager;
        public FrontEndTickManager FrontEndTickManager;
        public DictionaryList<string, ClientUser> ActiveUsers = new DictionaryList<string, ClientUser>(a => a.UserId);
        public ClientUser MyUser;


        public Action OnReady;

        public GameManager()
        {
            NetworkManager = new NetworkManager();
            FrontEndTickManager = new FrontEndTickManager();
            NetworkManager.OnMessage += onGatewayMessage;
            FrontEndTickManager.Init(sendPing, () =>
            {
                Global.Console.Log("Connected To Tick Server");
            });
            FrontEndTickManager.StartPing();
        }

        private void sendPing()
        {
            NetworkManager.SendPing();
        }

        public void MoveToLocation(int x, int y)
        {
            NetworkManager.SendAction(new MoveUserAction()
            {
                X = x,
                Y = y,
                LockstepTick = FrontEndTickManager.LockstepTickNumber + 1
            });
        }


        private void onGatewayMessage(Gateway_User_Socket_Message message)
        {
            Global.Console.Log(message);

            switch (message.GatewayUserMessageType)
            {
                case Gateway_User_Socket_MessageType.Pong:
                    var pongMessage = (Pong_Gateway_User_PubSub_Message)message;
                    FrontEndTickManager.OnPongReceived(pongMessage);
                    break;
                case Gateway_User_Socket_MessageType.UserAction:
                    userAction(((UserAction_Gateway_User_Socket_Message)message));
                    break;
                case Gateway_User_Socket_MessageType.UserJoined:
                    userJoined(((UserJoined_Gateway_User_Socket_Message)message));
                    break;
                case Gateway_User_Socket_MessageType.TickSync:
                    onTickSyncMessage((TickSync_Gateway_User_Socket_Message)message);
                    break;
                case Gateway_User_Socket_MessageType.UpdateNeighbors:
                    onUpdateNeighbors((UpdateNeighbors_Gateway_User_Socket_Message)message);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private void userAction(UserAction_Gateway_User_Socket_Message userActionMessage)
        {
            switch (userActionMessage.Action.UserActionType)
            {
                case UserActionType.Move:
                    var moveUserAction = (MoveUserAction)userActionMessage.Action;


                    var clientUser = ActiveUsers[moveUserAction.UserId];
                    if (clientUser == null)
                    {
                        throw new Exception("idk who this user is" + Json.Stringify(moveUserAction));
                    }

                    clientUser.X = moveUserAction.X;
                    clientUser.Y = moveUserAction.Y;


                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }


        }

        private void userJoined(UserJoined_Gateway_User_Socket_Message userJoinedMessage)
        {
            var clientUser = new ClientUser()
            {
                X = userJoinedMessage.X,
                Y = userJoinedMessage.Y,
                UserId = userJoinedMessage.UserId,
            };
            ActiveUsers.Add(clientUser);
            MyUser = clientUser;

            OnReady();
        }


        private void onUpdateNeighbors(UpdateNeighbors_Gateway_User_Socket_Message message)
        {
            foreach (var userId in message.Removed)
            {
                var user = ActiveUsers[userId];
                ActiveUsers.Remove(user);
            }

            foreach (var updatedNeighbor in message.Added)
            {
                var user = new ClientUser();
                user.UserId = updatedNeighbor.UserId;
                user.X = updatedNeighbor.X;
                user.Y = updatedNeighbor.Y;

                ActiveUsers.Add(user);
            }
        }

        private void onTickSyncMessage(TickSync_Gateway_User_Socket_Message message)
        {
            FrontEndTickManager.SetLockStepTick(message.LockstepTickNumber);
        }
    }
}