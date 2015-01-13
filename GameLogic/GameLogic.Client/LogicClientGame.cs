using System.Html.Media.Graphics;
using Pather.Client.GameFramework;
using Pather.Common.GameFramework;

namespace GameLogic.Client
{
    public class LogicClientGame : ClientGame
    {
        public LogicClientGame(FrontEndTickManager frontEndTickManager)
            : base(frontEndTickManager)
        {


        }

        public override GameUser CreateGameUser(string userId)
        {
            return new LogicClientGameUser(this, userId);
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