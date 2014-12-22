using System.Html;
using Pather.Common.TestFramework;

namespace Pather.Client
{
    internal class Program
    {
        private static void Main()
        {
            if (Window.Location.Hash == "#test")
            {
                TestFramework.RunTests((string) null);
                return;
            }


            var game = new ClientGame();
            game.Init();
        }
    }
}