using Pather.Common.Utils.Promises;

namespace Pather.Servers.Common.PushPop
{
    public interface IPushPop
    {
        Promise Init();
        void Push(string channel, object content);
        Promise<string, string> BlockingPop(string channel, int timeout);
    }
}