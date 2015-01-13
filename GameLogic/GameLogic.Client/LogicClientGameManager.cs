using System;
using System.Collections.Generic;
using System.Html.Media.Graphics;
using GameLogic.Common;
using Pather.Client.GameFramework;
using Pather.Client.Utils;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common.Actions.GameSegmentAction;

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
            context.FillStyle = "#83EFEF";
            context.FillRect(0, 0, Constants.NumberOfSquares * Constants.SquareSize, Constants.NumberOfSquares * Constants.SquareSize);

            for (var y = 0; y < Constants.NumberOfSquares; y++)
            {
                for (var x = 0; x < Constants.NumberOfSquares; x++)
                {

                    var item = ((LogicGameBoard)clientGame.Board).LogicGrid[x][y];

                    switch (item.Type)
                    {
                        case LogicGridItemType.Tree:

                            context.FillStyle = BlendColors("#45AD7B", "#83EFEF", 1-(item.Value / 100.0));
                            context.FillRect(x * Constants.SquareSize, y * Constants.SquareSize, Constants.SquareSize, Constants.SquareSize);


                            break;
                        case LogicGridItemType.Wall:

                            context.FillStyle = "#D3D3D3";

                            context.FillRect(x * Constants.SquareSize, y * Constants.SquareSize, Constants.SquareSize, Constants.SquareSize);

                            break;
                        case LogicGridItemType.Empty:
                            break;
                        default:
                            throw new ArgumentOutOfRangeException();
                    }


                }
            }
            context.Restore();
        }

        public void ClickLocation(double x, double y)
        {
            ((LogicClientGame)clientGame).ClickLocation(x, y);
        }

        public string BlendColors(string c0, string c1, double p)
        {

            int f = int.Parse(c0.Substr(1), 16);
            int t = int.Parse(c1.Substr(1), 16);
            int R1 = f >> 16;
            int G1 = f >> 8 & 0x00FF;
            int B1 = f & 0x0000FF;
            int R2 = t >> 16;
            int G2 = t >> 8 & 0x00FF;
            int B2 = t & 0x0000FF;

            int d = (0x1000000 + ((int)Math.JsRound((R2 - R1) * p) + R1) * 0x10000 + ((int)Math.JsRound((G2 - G1) * p) + G1) * 0x100 + ((int)Math.JsRound((B2 - B1) * p) + B1));

            return "#" + d.ToString(16).Substr(1);
        }
    }


}