using System;
using System.Collections.Generic;
using System.Serialization;
using Pather.Client.Libraries;
using Pather.Client.Utils;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Gateway.Socket.Base;
using Pather.Common.Utils;

namespace Pather.Client
{
    public class GameManager
    {
        public NetworkManager NetworkManager;
        public FrontEndTickManager FrontEndTickManager;
        public DictionaryList<string, ClientUser> ActiveUsers = new DictionaryList<string, ClientUser>(a=>a.UserId);
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
            NetworkManager.SendMoveToLocation(x, y, FrontEndTickManager.LockstepTickNumber + 1);
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
                case Gateway_User_Socket_MessageType.Move:
                    userMoved(((MoveToLocation_Gateway_User_Socket_Message)message));
                    break;
                case Gateway_User_Socket_MessageType.UserJoined:
                    userJoined(((UserJoined_Gateway_User_Socket_Message) message));
                    break;
                case Gateway_User_Socket_MessageType.TickSync:
                    onTickSyncMessage((TickSync_Gateway_User_Socket_Message)message);
                    break;
                case Gateway_User_Socket_MessageType.UpdateNeighbors:
                    onUpdateNeighbors((UpdateNeighbors_Gateway_User_Socket_Message) message);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private void userMoved(MoveToLocation_Gateway_User_Socket_Message moveToLocationMessage)
        {
            var clientUser = ActiveUsers[moveToLocationMessage.UserId];
            if (clientUser == null)
            {
                throw new Exception("idk who this user is" + Json.Stringify(moveToLocationMessage));
            }

            clientUser.X = moveToLocationMessage.X;
            clientUser.Y = moveToLocationMessage.Y;
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

    public class ClientUser
    {
        public string UserId;
        public int X;
        public int Y;
    }

    public class FrontEndTickManager : TickManager
    {
        public FrontEndTickManager()
        {
        }

        public void Init(Action sendPing, Action onTickManagerReady)
        {
            this.sendPing = sendPing;
            this.onTickManagerReady = onTickManagerReady;
            Global.SetInterval(StartPing, Constants.LatencyPingInterval);
        }

        public void StartPing()
        {
            pingSent = new List<long>();
            lastPing = new DateTime().GetTime();
            sendPing();
        }

        private long lastPing = 0;
        private List<long> pingSent;

        private Action sendPing;
        private Action onTickManagerReady;

        public void OnPongReceived(Pong_Gateway_User_PubSub_Message pongMessage)
        {

            if (pingSent == null)
            {
                Global.Console.Log("Mis pong");
                return;
            }

            var cur = new DateTime().GetTime();
            pingSent.Add(cur - lastPing);
            lastPing = cur;

            if (pingSent.Count < 3)
            {
                sendPing();
            }
            else
            {
                var average = 0L;

                foreach (var l in pingSent)
                {
                    average += l;
                }

                var roundTripLatency = ((double)average / (double)(pingSent.Count));
                var oneWayLatency = (int)roundTripLatency / 2;

                SetServerLatency(oneWayLatency + pongMessage.GatewayLatency);
                pingSent = null;
            }
        }

        private bool hasLockstep = false;
        private bool hasLatency = false;
        private bool tickManagerInitialized = false;

        public override void SetLockStepTick(long lockStepTickNumber)
        {
            base.SetLockStepTick(lockStepTickNumber);
            hasLockstep = true;
            if (hasLatency && hasLockstep && !tickManagerInitialized)
            {
                tickManagerInitialized = true;
                TickManagerReady();
            }
        }

        public override void SetServerLatency(long latency)
        {
        
            base.SetServerLatency(latency);
            hasLatency = true;
            if (hasLatency && hasLockstep && !tickManagerInitialized)
            {
                tickManagerInitialized = true;
                TickManagerReady();
            }
        }

        private void TickManagerReady()
        {
            Init(LockstepTickNumber);
            onTickManagerReady();
        }
    }


    public class NetworkManager
    {
        private ClientCommunicator clientCommunicator;
        public Action<Gateway_User_Socket_Message> OnMessage;

        public NetworkManager()
        {
            GetRequest("http://localhost:2222/api/", 2222, (url) =>
            {
                Global.Console.Log(url);

                clientCommunicator = new ClientCommunicator(url);
                clientCommunicator.ListenForGatewayMessage((message) =>
                {
                    OnMessage(message);
                });

                clientCommunicator.SendMessage(new UserJoined_User_Gateway_Socket_Message()
                {
                    UserToken = "salvatore" + Utilities.UniqueId()
                });
            });
        }

        public void SendPing()
        {
            if (clientCommunicator != null)
            {
                clientCommunicator.SendMessage(new Ping_User_Gateway_Socket_Message());
            }
        }
        public void SendMoveToLocation(int x, int y, long lockstepTickNumber)
        {
            clientCommunicator.SendMessage(new MoveToLocation_User_Gateway_Socket_Message()
            {
                LockstepTick = lockstepTickNumber,
                X = x,
                Y = y,
            });
        }

        public static void GetRequest(string url, int port, Action<string> callback)
        {
            //todo stub out properly idiot

            if (Constants.TestServer)
            {
                var http = Global.Require<dynamic>("http");
                var options = new
                {
                    port = port,
                    path = url,
                    method = "get"
                };

                http.request(options, ((Action<dynamic>)((res) =>
                {
                    res.setEncoding("utf8");
                    res.on("data", (Action<string>)((chunk) =>
                    {
                        callback(chunk);
                    }));
                }))).end();
            }
            else
            {
                jQueryObject.Get(url, null, callback);
            }
        }

    }
}