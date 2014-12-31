using System.Html;
using Pather.Client.Old;
using Pather.Common.TestFramework;

namespace Pather.Client
{
    internal class Program
    {
        private static void Main()
        {
            if (((dynamic)Window.Instance).RunTests || Window.Location.Hash == "#test")
            {
                TestFramework.RunTests((string) null);
                return;
            }

            GameClient gameClient = new GameClient();
            


//            var game = new ClientGame();
//            game.Init();
        }
    }
}