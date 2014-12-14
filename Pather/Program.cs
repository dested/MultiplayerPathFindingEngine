using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Pather.Definitions;

namespace Pather
{
    class Program
    {
        static void Main()
        {
            var game = new Game();
            game.Init();
        }
    }

    public class Game
    {
        public long NextGameTick { get; set; }
        public bool[][] Grid { get; set; }
        public List<Person> People { get; set; }
        public long CurTick { get; set; }

        public CanvasElement Canvas { get; set; }
        public CanvasRenderingContext2D Context { get; set; }

        public Game()
        {
            NextGameTick = new DateTime().GetTime();
            ConstructGrid();
            People = new List<Person>();
            var sal = new Person(this);
            People.Add(sal);

            CurTick = new DateTime().GetTime();

            Canvas = (CanvasElement)Document.GetElementById("canvas");
            Context = (CanvasRenderingContext2D)Canvas.GetContext(CanvasContextId.Render2D);

            Canvas.OnMousedown = (ev) =>
            {
                var person = People[0];
                var @event = (dynamic)ev;
                person.RePathFind(((int)@event.offsetX) / Constants.SquareSize, ((int)@event.offsetY) / Constants.SquareSize);
            };
        }

        public void ConstructGrid()
        {
            Grid = new bool[Constants.NumberOfSquares][];
            for (int i = 0; i < Constants.NumberOfSquares; i++)
            {
                Grid[i] = new bool[Constants.NumberOfSquares];
                for (int j = 0; j < Constants.NumberOfSquares; j++)
                {
                    Grid[i][j] = !(Math.Random() * 100 < 15);
                }
            }
        }

        public void Init()
        {
            foreach (var person in People)
            {
                person.Init(0, 0);
            }
            Window.SetTimeout(Tick, Constants.GameTicks);
            Window.RequestAnimationFrame((a) => Draw());
        }

        public void Tick()
        {
            Window.SetTimeout(Tick, Constants.GameTicks);

            var v = new DateTime().GetTime();
            NextGameTick += v - CurTick;
            CurTick = v;
            foreach (var person in People)
            {
                person.Tick();
            }
        }

        public void Draw()
        {
            Window.RequestAnimationFrame((a) => Draw());

            Context.Save();
            Context.FillStyle = "black";
            Context.FillRect(0, 0, 1200, 1200);
            Context.Restore();
            for (var y = 0; y < Constants.NumberOfSquares; y++)
            {
                for (var x = 0; x < Constants.NumberOfSquares; x++)
                {
                    if (Grid[x][y])
                    {
                        Context.Save();
                        Context.LineWidth = 5;
                        Context.StrokeStyle = "white";
//                        Context.StrokeRect(x * Constants.SquareSize, y * Constants.SquareSize, Constants.SquareSize, Constants.SquareSize);
                        Context.Restore();
                    }
                }
            }
            for (var y = 0; y < Constants.NumberOfSquares; y++)
            {
                for (var x = 0; x < Constants.NumberOfSquares; x++)
                {
                    if (!Grid[x][y])
                    {
                        Context.Save();
                        Context.LineWidth = 5;
                        Context.StrokeStyle = "blue";
                        Context.StrokeRect(x * Constants.SquareSize, y * Constants.SquareSize, Constants.SquareSize, Constants.SquareSize);
                        Context.Restore();
                    }
                }
            }

            var interpolatedTime = (((new DateTime()).GetTime() - NextGameTick) / (double)Constants.GameTicks);


            foreach (var person in People)
            {
                person.Draw(Context, interpolatedTime);
            }
        }
    }

    public class Person
    {
        public double X { get; set; }
        public double Y { get; set; }
        public int SquareX { get; set; }
        public int SquareY { get; set; }
        public double Speed { get; set; }
        public List<AStarPath> Path { get; set; }
        public Point RePathFindPosition { get; set; }
        public List<AnimationPoint> Animations { get; set; }
        private Game Game { get; set; }

        public Person(Game game)
        {
            Game = game;
            X = 0;
            Y = 0;
            SquareX = 0;
            SquareY = 0;
            Speed = 50;
            Path = new List<AStarPath>();
            RePathFindPosition = null;

        }

        public void Init(int squareX, int squareY)
        {
            SquareX = squareX;
            SquareY = squareY;
            X = SquareX * Constants.SquareSize;
            Y = SquareY * Constants.SquareSize;
            Animations = new List<AnimationPoint>();
        }

        public void RePathFind(int SquareX, int SquareY)
        {
            RePathFindPosition = new Point(SquareX, SquareY);
        }

        public void Draw(CanvasRenderingContext2D context, double interpolatedTime)
        {
            context.Save();

            if (interpolatedTime < 0) interpolatedTime = 0;
            if (interpolatedTime > 1) interpolatedTime = 1;

            var _x = (int)X;
            var _y = (int)Y;
            if (Animations.Count > 0)
            {
                var animationIndex = ((int)(interpolatedTime * Constants.AnimationSteps));
                var animation = Animations[animationIndex];
                if (animation != null)
                {

                    var interpolateStep = (interpolatedTime % (1.0 / Constants.AnimationSteps)) * Constants.AnimationSteps;
                    _x = (int)(animation.FromX + (animation.X - animation.FromX) * interpolateStep);
                    _y = (int)(animation.FromY + (animation.Y - animation.FromY) * interpolateStep);
                }
            }

            var result = Path[0];
            if (result != null)
            {

                context.LineWidth = 5;
                context.StrokeStyle = "yellow";
                //                context.StrokeRect(result.X * Constants.SquareSize, result.Y * Constants.SquareSize, Constants.SquareSize, Constants.SquareSize);

            }
            context.StrokeStyle = "green";
            //            context.StrokeRect(SquareX * Constants.SquareSize, SquareY * Constants.SquareSize, Constants.SquareSize, Constants.SquareSize);

//            Console.WriteLine(_x + " " + _y);


            context.LineWidth = 5;
            context.StrokeStyle = "yellow";
            context.FillStyle = "red";
            context.FillRect((_x) - (Constants.SquareSize / 2), (_y) - (Constants.SquareSize / 2), (Constants.SquareSize), (Constants.SquareSize));
            context.StrokeRect((_x) - (Constants.SquareSize / 2), (_y) - (Constants.SquareSize / 2), (Constants.SquareSize), (Constants.SquareSize));
            context.Restore();
        }

        public void Tick()
        {
            //            console.log('ticked');

            if (RePathFindPosition != null)
            {
                var graph = new AStarGraph(Game.Grid);
                var start = graph.Grid[SquareX][SquareY];
                var end = graph.Grid[(int)RePathFindPosition.X][(int)RePathFindPosition.Y];
                Path = new List<AStarPath>(AStar.Search(graph, start, end));
                RePathFindPosition = null;
            }


            var result = Path[0];
            Animations = new List<AnimationPoint>();

            int projectedX;
            int projectedY;
            int projectedSquareX;
            int projectedSquareY;

            projectedSquareX = result == null ? SquareX : (result.X);
            projectedSquareY = result == null ? SquareY : (result.Y);




            for (var i = 0; i < Constants.AnimationSteps; i++)
            {



                SquareX = (int)((X) / Constants.SquareSize);
                SquareY = (int)((Y) / Constants.SquareSize);
                var fromX = X;
                var fromY = Y;


                if (result != null && (SquareX == result.X && SquareY == result.Y))
                {
                    Path.RemoveAt(0);
                    result = Path[0];

                    projectedSquareX = result == null ? SquareX : (result.X);
                    projectedSquareY = result == null ? SquareY : (result.Y);
                }



                projectedX = projectedSquareX * Constants.SquareSize + Constants.SquareSize / 2;
                projectedY = projectedSquareY * Constants.SquareSize + Constants.SquareSize / 2;


                if (((int)projectedX) == ((int)X) && ((int)projectedY) == ((int)Y))
                {
                    return;
                }

                X = Constants.MoveTowards(X, projectedX, (Speed / Constants.AnimationSteps));
                Y = Constants.MoveTowards(Y, projectedY, (Speed / Constants.AnimationSteps));


                Animations.Add(new AnimationPoint(fromX, fromY, X, Y));
            }


        }

    }

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

    public class Point
    {
        public double X { get; set; }
        public double Y { get; set; }

        public Point(double x, double y)
        {
            X = x;
            Y = y;
        }
    }

    public static class Constants
    {
        static Constants()
        {
            SquareSize = 16;
            NumberOfSquares = 80;
            DrawFps = 60;
            DrawTicks = 1000 / DrawFps;
            GameFps = 10;
            GameTicks = 1000 / GameFps;
            AnimationSteps = 5;

        }

        public static int AnimationSteps { get; set; }
        public static int GameFps { get; set; }
        public static int DrawTicks { get; set; }
        public static int DrawFps { get; set; }
        public static int SquareSize { get; set; }
        public static int NumberOfSquares { get; set; }
        public static int GameTicks { get; set; }

        public static double Lerp(double start, double end, double duration)
        {
            return start + (end - start) * duration;
        }
        public static double MoveTowards(double start, double end, double amount)
        {
            if (Math.Abs(start - end) < amount)
                return end;
            if (start < end)
                return start + amount;
            if (start > end)
                return start - amount;
            return start;
        }
    }
}
