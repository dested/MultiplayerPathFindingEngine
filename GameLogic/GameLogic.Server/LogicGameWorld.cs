using System;
using System.Runtime.CompilerServices;
using GameLogic.Common;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common.Actions.ClientActions;
using Pather.Common.Models.Common.Actions.GameWorldAction;
using Pather.Servers.Common;
using Pather.Servers.GameWorldServer;
using Pather.Servers.Utils;

namespace GameLogic.Server
{
    public class LogicGameWorld : GameWorld
    {

        public LogicGameWorld(GameWorldPubSub gameWorldPubSub, BackEndTickManager backEndTickManager, IInstantiateLogic instantiateLogic)
            : base(gameWorldPubSub, backEndTickManager, instantiateLogic)
        {
            Global.Console.Log("Hello logic!");
        }


        public override void ProcessLogicAction(LogicAction_GameWorldAction logicAction)
        {
            var customLogicAction = ((CustomLogicAction_GameWorldAction)logicAction);
            var logicGameBoard = ((LogicGameBoard)Board);
            switch (customLogicAction.LogicActionType)
            {
                case LogicActionType.CutTree:
                    var cutTreeAction = ((CutTree_CustomLogicAction_GameWorldAction)customLogicAction);
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
    }
}