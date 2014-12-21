using System.Html;
using System.Runtime.CompilerServices;
using Pather.Common.TestFramework;
using Pather.Common.Utils;

namespace Pather.Client
{
    internal class Program
    {
        private static void Main()
        {

            if (Window.Location.Hash == "#test")
            {
                TestFramework.RunTests();
                return;
            }


            var game = new ClientGame();
            game.Init();
        }


    }
}
