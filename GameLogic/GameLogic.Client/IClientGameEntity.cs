using System.Html.Media.Graphics;

namespace GameLogic.Client
{
    public interface IClientGameEntity
    {
        void Draw(CanvasRenderingContext2D context, double interpolatedTime);
    }
}