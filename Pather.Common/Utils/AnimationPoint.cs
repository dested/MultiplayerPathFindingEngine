namespace Pather.Client.Utils
{
    public class AnimationPoint : Point
    {
        public double FromX { get; set; }
        public double FromY { get; set; }

        public AnimationPoint(double fromX, double fromY, double x, double y)
            : base(x, y)
        {
            FromX = fromX;
            FromY = fromY;
        }
    }
}