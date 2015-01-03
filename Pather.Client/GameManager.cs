using System;
using System.Collections.Generic;
using System.Serialization;
using Pather.Common;
using Pather.Common.Definitions.AStar;
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
        public ClientGame clientGame;
        public GameManager()
        {
            NetworkManager = new NetworkManager();
            FrontEndTickManager = new FrontEndTickManager();
            NetworkManager.OnMessage += onGatewayMessage;
            FrontEndTickManager.Init(sendPing, () =>
            {
                Global.Console.Log("Connected To Tick Server");
            });
            clientGame=new ClientGame(ActiveUsers,FrontEndTickManager);
            clientGame.Init();

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

   
            clientGame.QueueUserAction(userActionMessage.Action);



        }

        private void userJoined(UserJoined_Gateway_User_Socket_Message userJoinedMessage)
        {
            var clientUser = new ClientUser(this.clientGame)
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
                var user = new ClientUser(this.clientGame);
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



    
    public class ClientGame
    {
        public TickManager tickManager;
        public GameBoard Board;
        private DictionaryList<string, ClientUser> allUsers;
        public StepManager StepManager;

        public ClientGame( DictionaryList<string, ClientUser> allUsers, TickManager tickManager)
        {
            this.tickManager = tickManager;
            this.allUsers = allUsers;
            StepManager = new StepManager(this);
            tickManager.OnProcessLockstep += StepManager.ProcessAction;
        }


        public void Init()
        {

            Board = new GameBoard();
            Board.ConstructGrid();
        }

        public void QueueUserAction(UserAction action)
        {
            StepManager.QueueUserAction(action);
   
        }

        public void ProcessUserAction(UserAction action)
        {
            switch (action.UserActionType)
            {
                case UserActionType.Move:
                    var moveAction = (MoveUserAction)action;
                    var user = allUsers[moveAction.UserId];
                    user.RePathFind(moveAction.X, moveAction.Y);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
        public void TellUserAction( UserAction action)
        {
            switch (action.UserActionType)
            {
                case UserActionType.Move:
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public void ProcessUserActionFromNeighbor(UserAction action)
        {
            switch (action.UserActionType)
            {
                case UserActionType.Move:
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
    }

    public class GameBoard
    {
        public int[][] Grid;
        public AStarGraph AStarGraph;
        public void ConstructGrid()
        {
            Grid = new int[Constants.NumberOfSquares][];
            for (var x = 0; x < Constants.NumberOfSquares; x++)
            {
                Grid[x] = new int[Constants.NumberOfSquares];
                for (var y = 0; y < Constants.NumberOfSquares; y++)
                {
                    Grid[x][y] = (Math.Random() * 100 < 15) ? 0 : 1;
                }
            }
            AStarGraph = new AStarGraph(Grid);
        }

    }

    public class StepManager
    {
        private readonly ClientGame serverGame;

        public StepManager(ClientGame serverGame)
        {
            this.serverGame = serverGame;
            StepActionsTicks = new Dictionary<long, List<UserAction>>();
            LastTickProcessed = 0;
        }

        public long LastTickProcessed;
        public Dictionary<long, List<UserAction>> StepActionsTicks;
        private int misprocess;

        public void QueueUserAction(UserAction action)
        {

            if (!StepActionsTicks.ContainsKey(action.LockstepTick))
            {
                if (action.LockstepTick <= serverGame.tickManager.LockstepTickNumber)
                {
                    serverGame.ProcessUserAction( action);
                    Global.Console.Log("Misprocess of action count", ++misprocess, serverGame.tickManager.LockstepTickNumber - action.LockstepTick);
                    return;
                }
                StepActionsTicks[action.LockstepTick] = new List<UserAction>();
            }
            StepActionsTicks[action.LockstepTick].Add(action);
        }

        public void ProcessAction(long lockstepTickNumber)
        {
            if (!StepActionsTicks.ContainsKey(lockstepTickNumber))
            {
                return;
            }
            var stepActions = StepActionsTicks[lockstepTickNumber];

            foreach (var stepAction in stepActions)
            {
                serverGame.ProcessUserAction(stepAction);
            }
            LastTickProcessed = lockstepTickNumber;
            StepActionsTicks.Remove(lockstepTickNumber);
        }
    }

}