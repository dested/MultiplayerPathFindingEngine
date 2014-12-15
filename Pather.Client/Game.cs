using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;

namespace Pather.Client
{
    public class Game
    {
        public long NextGameTick { get; set; }
        public int[][] Grid { get; set; }
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
            Grid = new int[Constants.NumberOfSquares][];
            for (int x = 0; x < Constants.NumberOfSquares; x++)
            {
                Grid[x] = new int[Constants.NumberOfSquares];
                for (int y = 0; y < Constants.NumberOfSquares; y++)
                {
                    Grid[x][y] = (Math.Random() * 100 < 15)?0:1;
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
                    if (Grid[x][y]==1)
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
                    if (Grid[x][y]==0)
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
}