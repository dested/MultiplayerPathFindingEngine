using System;
using System.Html.Media.Graphics;
using GameLogic.Common;
using Pather.Client;
using Pather.Client.GameFramework;
using Pather.Common.Definitions.AStar;
using Pather.Common.GameFramework;
using Pather.Common.Models.Common.Actions.ClientActions;
using Pather.Common.Models.Common.Actions.GameSegmentAction;
using Pather.Common.Models.Common.Actions.GameSegmentAction.Base;
using Pather.Common.Utils;

namespace GameLogic.Client
{
    public class LogicClientGame : ClientGame
    {

        public LogicClientGame(FrontEndTickManager frontEndTickManager,NetworkManager networkManager)
            : base(frontEndTickManager, networkManager)
        {
        }

        public override void InitializeGameBoard(string[][] grid)
        {
            this.Board = new LogicGameBoard();
            this.Board.Init(grid);
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


        public bool ClickLocation(double x, double y)
        {

            var clickSquareX = Utilities.ToSquare(x);
            var clickSquareY = Utilities.ToSquare(y);

            var squareX = Utilities.ToSquare(MyUser.X);
            var squareY = Utilities.ToSquare(MyUser.Y);


            var distance = Utilities.PointDistance(clickSquareX, clickSquareY, squareX, squareY);

            var item=((LogicGameBoard)this.Board).GetAtXY(clickSquareX,clickSquareY);

            switch (item.Type)
            {
                case LogicGridItemType.Tree:


                    if (distance < 2)
                    {
                        NetworkManager.SendClientAction(new CutTree_CustomLogicAction_GameSegmentAction()
                        {
                            TreeX = Utilities.ToSquare(x),
                            TreeY = Utilities.ToSquare(y),
                            LockstepTick = tickManager.LockstepTickNumber + 1
                        });
                        return true;
                    }
                    break;
                case LogicGridItemType.Wall:
                    break;
                case LogicGridItemType.Empty:

                    if (distance < 20)
                    {
                        NetworkManager.SendClientAction(new MoveEntity_GameSegmentAction()
                        {
                            X = x,
                            Y = y,
                            LockstepTick = tickManager.LockstepTickNumber + 1
                        });
                    }
                        return true;
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
            return false;
        }

        public override void ProcessLogicAction(LogicAction_ClientAction logicAction)
        {
            var customLogicAction = ((CustomLogicAction_ClientAction)logicAction);
            var logicGameBoard = ((LogicGameBoard)Board);
            switch (customLogicAction.LogicActionType)
            {
                case LogicActionType.CutTree:
                    var cutTreeAction = ((CutTree_CustomLogicAction_ClientAction) customLogicAction);
                    var item = logicGameBoard.GetAtXY(cutTreeAction.TreeX, cutTreeAction.TreeY);

                    if (item.Type == LogicGridItemType.Tree)
                    {
                        if (item.Value <= 10)
                        {
                            logicGameBoard.ChangePoint(new LogicGridItem(LogicGridItemType.Empty), cutTreeAction.TreeX, cutTreeAction.TreeY);
                        }
                        else
                        {
                            item.Value -= 10;
                            logicGameBoard.ChangePoint(item, cutTreeAction.TreeX, cutTreeAction.TreeY);
                        }
                    }
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

        }
    }
}