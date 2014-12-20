namespace Pather.Server.GameServer
{
    public class GameServer
    {
        public GameServer()
        {
//            Global.SetInterval(() => { Global.Console.Log("keep alive " + new DateTime().ToString().Substring(17, 24)); }, 10 * 1000);

            var game = new ServerGame();
            game.Init();

        }

         
    }



}