using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.PushPop;
using Pather.Servers.Common.SocketManager;

namespace Pather.Servers.GameSegment
{
    public class GameSegment
    {
        public ISocketManager SocketManager { get; set; }
        public IPubSub Pubsub { get; set; }
        public IPushPop PushPop { get; set; }
        public string GameSegmentName { get; set; }

        public GameSegment(ISocketManager socketManager, IPubSub pubsub, IPushPop pushPop, string gameSegmentName)
        {
            SocketManager = socketManager;
            Pubsub = pubsub;
            PushPop = pushPop;
            GameSegmentName = gameSegmentName;
//            Global.SetInterval(() => { Global.Console.Log("keep alive " + new DateTime().ToString().Substring(17, 24)); }, 10 * 1000);

//            var game = new ServerGame(socketManager, gameServerName);
//            game.Init();


            pushPop.Init().Then(ready);
        }

        private void ready()
        {
            PushPop.Push(GameSegmentName, 1);
        }
    }
}