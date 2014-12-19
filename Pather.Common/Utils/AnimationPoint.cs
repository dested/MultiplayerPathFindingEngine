namespace Pather.Client.Utils
{
    public class AnimationPoint : Point
    {
        public double FromX ;
        public double FromY ;

        public AnimationPoint(double fromX, double fromY, double x, double y)
            : base(x, y)
        {
            FromX = fromX;
            FromY = fromY;
        }
    }
}