using System.Html;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.TestFramework;

namespace GameLogic.Client
{
    class Program
    {
        static void Main()
        {
            if (((dynamic)Window.Instance).RunTests || Window.Location.Hash == "#test")
            {
                TestFramework.RunTests((string)null);
                return;
            }

            var gameClient = new LogicClientGameView(new ClientInstantiateLogic());

            Global.Console.Log("Hello client!");
        }
    }
}
