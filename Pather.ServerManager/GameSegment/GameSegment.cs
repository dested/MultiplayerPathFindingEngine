using Pather.ServerManager.Common.PubSub;
using Pather.ServerManager.Common.PushPop;
using Pather.ServerManager.Common.SocketManager;

namespace Pather.ServerManager.GameSegment
{
    public class GameSegment
    {
        public ISocketManager SocketManager { get; set; }
        public IPubSub Pubsub { get; set; }
        public IPushPop PushPop { get; set; }
        public string GameServerName { get; set; }

        public GameSegment(ISocketManager socketManager, IPubSub pubsub, IPushPop pushPop, string gameServerName)
        {
            SocketManager = socketManager;
            Pubsub = pubsub;
            PushPop = pushPop;
            GameServerName = gameServerName;
//            Global.SetInterval(() => { Global.Console.Log("keep alive " + new DateTime().ToString().Substring(17, 24)); }, 10 * 1000);

//            var game = new ServerGame(socketManager, gameServerName);
//            game.Init();


            pushPop.Init().Then(ready);


        }

        private void ready()
        {
            PushPop.Push(GameServerName, 1);
        }
    }



}