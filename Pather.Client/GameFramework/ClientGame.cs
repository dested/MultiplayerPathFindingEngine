using System.Html.Media.Graphics;
using Pather.Common.GameFramework;
using Pather.Common.Utils;

namespace Pather.Client.GameFramework
{
    public class ClientGame : Game
    {
        public ClientGame(TickManager tickManager)
            : base(tickManager)
        {
        }

        public void MyUserJoined(string userId, int x, int y)
        {
            var clientUser = CreateGameUser(userId);
            clientUser.X = x;
            clientUser.Y = y;
            ActiveEntities.Add(clientUser);
            MyUser = clientUser;
        }

        public override GameUser CreateGameUser(string userId)
        {
            return new ClientGameUser(this, userId);
        }

        public void DrawEntities(CanvasRenderingContext2D context, double interpolatedTime)
        {
            foreach (IClientGameEntity entity in ActiveEntities.List)
            {
                context.Save();
                entity.Draw(context, interpolatedTime);

                context.Restore();
            }
        }
    }
}