using Pather.Common.Libraries.NodeJS;
using Pather.Common.Utils.Promises;
using Pather.ServerManager.Libraries.Redis;

namespace Pather.ServerManager.Common.PushPop
{
    public class PushPop : IPushPop
    {
        private bool pushReady;
        private RedisClient pushClient;
        private bool popReady;
        private RedisClient popClient;
        public PushPop()
        {
        }

        public Promise Init()
        {
            var deferred = Q.Defer();
            var redis = Global.Require<Redis>("redis");
            redis.DebugMode = false;
            pushClient = redis.CreateClient(6379, ConnectionConstants.RedisIP);
            popClient = redis.CreateClient(6379, ConnectionConstants.RedisIP);

            pushClient.On("ready",
                () =>
                {
                    pushReady = true;
                    if (pushReady && popReady)
                        deferred.Resolve();
                });
            popClient.On("ready",
                () =>
                {
                    popReady = true;
                    if (pushReady && popReady)
                        deferred.Resolve();
                });
            return deferred.Promise;
        }


        public void Push(string channel, object content)
        {
            pushClient.RPush(channel, content);
        }
        public Promise<string,string> BlockingPop(string channel,int timeout)
        {
            var d = Q.Defer<string, string>();
            popClient.BLPop(new object[] { channel, timeout }, (caller, dtj) =>
            {
                if (dtj != null)
                {
                    d.Resolve(dtj[1]);
                }
                else
                {
                    d.Reject(null);
                }
            });
            return d.Promise;
        }
    }
}