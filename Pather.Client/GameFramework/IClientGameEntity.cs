using System.Html.Media.Graphics;

namespace Pather.Client.GameFramework
{
    public interface IClientGameEntity
    {
        void Draw(CanvasRenderingContext2D context, double interpolatedTime);
    }
}