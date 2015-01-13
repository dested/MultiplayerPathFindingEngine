using System;
using GameLogic.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common;
using Pather.Common.Models.Common.Actions.ClientActions.Base;
using Pather.Common.Utils;
using Pather.Servers.GameSegmentServer;

namespace GameLogic.Server
{
    public class LogicServerGameUser : ServerGameUser
    {
        public LogicServerGameUser(LogicServerGame logicServerGame, string userId)
            : base(logicServerGame, userId)
        {


        }

        public override void ProcessAction(ClientAction action)
        {

            switch (action.ClientActionType)
            {
                case ClientActionType.Move:
                case ClientActionType.UpdateNeighbors:
                case ClientActionType.MoveEntityOnPath:
                    break;
                case ClientActionType.LogicAction:
                    var logicAction = ((CustomLogicAction_ClientAction)action);
                    ProcessLogicAction(logicAction);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private void ProcessLogicAction(CustomLogicAction_ClientAction logicAction)
        {
            var logicGameBoard = ((LogicGameBoard)Game.Board);
            switch (logicAction.LogicActionType)
            {
                case LogicActionType.CutTree:
                    var cutTreeAction = ((CutTree_CustomLogicAction_ClientAction)logicAction);
                    var item = logicGameBoard.GetAtXY(cutTreeAction.TreeX, cutTreeAction.TreeY);

                    if (item.Type == LogicGridItemType.Tree)
                    {
                        if (item.Value <= 10)
                        {
                            logicGameBoard.ChangePoint(new LogicGridItem(LogicGridItemType.Empty), cutTreeAction.TreeX, cutTreeAction.TreeY);
                            Global.Console.Log("Removed Tree At", cutTreeAction.TreeX, cutTreeAction.TreeY);
                        }
                        else
                        {
                            item.Value -= 10;
                            logicGameBoard.ChangePoint(item, cutTreeAction.TreeX, cutTreeAction.TreeY);
                            Global.Console.Log("Cut Tree At", cutTreeAction.TreeX, cutTreeAction.TreeY, item.Value, "Left");

                        }
                    }

                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public long CutTree(int x, int y, long lockstepTick)
        {

            var item = ((LogicGameBoard)Game.Board).LogicGrid[x][y];

            var point = GetPositionAtLockstep(lockstepTick);

            //todo project if tree is still there at lockstep:??????
            if (Utilities.PointDistance(Utilities.ToSquare(point.X), Utilities.ToSquare(point.Y), x, y)<2)
            {
                if (item.Type == LogicGridItemType.Tree)
                {
                    AddAction(new CutTree_CustomLogicAction_ClientAction() { TreeX = x, TreeY = y }, lockstepTick);
                    return lockstepTick;

                }
            }
            return 0;
        }
    }
}