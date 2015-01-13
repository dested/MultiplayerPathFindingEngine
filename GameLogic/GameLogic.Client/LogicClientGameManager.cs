using System.Collections.Generic;
using System.Html.Media.Graphics;
using Pather.Client.GameFramework;
using Pather.Client.Utils;
using Pather.Common;

namespace GameLogic.Client
{
    public class LogicClientGameManager : ClientGameManager
    {
        public LogicClientGameManager(IClientInstantiateLogic clientInstantiateLogic)
            : base(clientInstantiateLogic)
        {
        }


        public void Draw(JsDictionary<string, CanvasRenderingContext2D> contextCollection, double interpolatedTime)
        {
            contextCollection["Foreground"].ClearRect(0, 0, Constants.NumberOfSquares * Constants.SquareSize, Constants.NumberOfSquares * Constants.SquareSize);
            DrawBackground(contextCollection["Background"]);
            ((LogicClientGame)clientGame).DrawEntities(contextCollection["Foreground"], interpolatedTime);
        }

        private void DrawBackground(CanvasRenderingContext2D context)
        {
            context.ClearRect(0, 0, Constants.NumberOfSquares * Constants.SquareSize, Constants.NumberOfSquares * Constants.SquareSize);
            context.Save();
            context.FillStyle = "black";
            context.FillRect(0, 0, Constants.NumberOfSquares * Constants.SquareSize, Constants.NumberOfSquares * Constants.SquareSize);

            context.FillStyle = "blue";
            for (var y = 0; y < Constants.NumberOfSquares; y++)
            {
                for (var x = 0; x < Constants.NumberOfSquares; x++)
                {
                    if (clientGame.Board.Grid[x][y] == 0)
                    {
                        context.FillRect(x * Constants.SquareSize, y * Constants.SquareSize, Constants.SquareSize, Constants.SquareSize);
                    }
                }
            }
            context.Restore();
        }

    }
}