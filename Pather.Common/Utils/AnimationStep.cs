namespace Pather.Common.Utils
{
    public class AnimationStep : Point
    {
        public double FromX;
        public double FromY;

        public AnimationStep(double fromX, double fromY, double x, double y)
            : base(x, y)
        {
            FromX = fromX;
            FromY = fromY;
        }
    }
}