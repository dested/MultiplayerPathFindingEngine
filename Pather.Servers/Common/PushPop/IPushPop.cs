using Pather.Common.Utils.Promises;
using Pather.Servers.Common.ServerLogging;

namespace Pather.Servers.Common.PushPop
{
    public interface IPushPop
    {
        Promise Init(ServerLogger serverLogger);
        void Push(string channel, object content);
        Promise<string, string> BlockingPop(string channel, int timeout);
    }
}