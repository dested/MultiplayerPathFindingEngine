using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Definitions.AStar;
using Pather.Common.GameFramework;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common;
using Pather.Common.Models.Common.Actions.ClientActions;
using Pather.Common.Models.Common.Actions.GameSegmentAction;
using Pather.Common.Utils;

namespace Pather.Servers.GameSegmentServer
{
    public class ServerGameUser : GameUser, IServerGameEntity
    {
        public GameSegment GameSegment;
        public string GatewayId;
        public List<InProgressClientAction> InProgressActions;
        public JsDictionary<long, Point> LockstepMovePoints;

        public ServerGameUser(ServerGame game, string userId)
            : base(game, userId)
        {
            LockstepMovePoints = new JsDictionary<long, Point>();
            InProgressActions = new List<InProgressClientAction>();
        }

        public Point GetPositionAtLockstep(long lockstepTickNumber)
        {
            return LockstepMovePoints[lockstepTickNumber] ?? new Point(X, Y);
        }

        public void LockstepTick(long lockstepTickNumber)
        {
            if (LockstepMovePoints.ContainsKey(lockstepTickNumber))
            {
                var point = LockstepMovePoints[lockstepTickNumber];
                X = point.X;
                Y = point.Y;

                LockstepMovePoints.Remove(lockstepTickNumber);
//                Global.Console.Log(EntityId, X, Y, LockstepMovePoints.Count, lockstepTickNumber);
            }

            for (var index = InProgressActions.Count - 1; index >= 0; index--)
            {
                var inProgressAction = InProgressActions[index];
                if (inProgressAction.EndingLockStepTicking <= lockstepTickNumber)
                {
                    InProgressActions.Remove(inProgressAction);
                }
            }
        }

        public long RePathFind(MoveEntity_GameSegmentAction destinationAction)
        {
            var graph = game.Board.AStarGraph;

            var p = GetPositionAtLockstep(destinationAction.LockstepTick);

            var x = p.X;
            var y = p.Y;


            var start = graph.Grid[Utilities.ToSquare(x)][Utilities.ToSquare(y)];
            var end = graph.Grid[Utilities.ToSquare(destinationAction.X)][Utilities.ToSquare(destinationAction.Y)];
            var path = AStar.Search(graph, start, end).Select(a => new AStarLockstepPath(a.X, a.Y));
            if (path.Count == 0)
            {
                //bad result
                return 0;
            }

            var moveEntityOnPathAction = new MoveEntityOnPath_ClientAction()
            {
                EntityId = EntityId,
                LockstepTick = destinationAction.LockstepTick,
                Path = path
            };

            var lockstepTickNumber = ProjectMovement(x, y, destinationAction.LockstepTick, path);
//            Global.Console.Log("Move entity on path:", moveEntityOnPathAction);
            InProgressActions.Add(new InProgressClientAction(moveEntityOnPathAction, lockstepTickNumber));

            return lockstepTickNumber;
            //            Global.Console.Log("Path points:", InProgressActions);
        }

        public long ProjectMovement(double x, double y, long startingLockstepTickNumber, List<AStarLockstepPath> path)
        {
            var pathIndex = 0;

            //            Global.Console.Log(EntityId,"Projecting movement");

            var nextPathPoint = path[pathIndex];
            if (nextPathPoint == null) return startingLockstepTickNumber;
            var gameTicksPerLockstepTick = Constants.GameFps/Constants.LockstepFps;
            var gameTick = 0;

            var halfSquareSize = Constants.SquareSize/2;
            var animationDividedSpeed = (Speed/Constants.NumberOfAnimationSteps);


            var projectedX = nextPathPoint.X*Constants.SquareSize + halfSquareSize;
            var projectedY = nextPathPoint.Y*Constants.SquareSize + halfSquareSize;
            //            Global.Console.Log(EntityId, projectedX,projectedY);

            while (true)
            {
                var over = false;

                for (var i = 0; i < Constants.NumberOfAnimationSteps; i++)
                {
                    var squareX = Utilities.ToSquare(x);
                    var squareY = Utilities.ToSquare(y);

                    if (squareX == nextPathPoint.X && squareY == nextPathPoint.Y)
                    {
                        nextPathPoint.RemoveAfterLockstep = startingLockstepTickNumber;
                        pathIndex++;
                        nextPathPoint = path[pathIndex];
                        //                        Global.Console.Log(EntityId, "next path");

                        if (nextPathPoint == null)
                        {
                            //                            Global.Console.Log(EntityId, "done");
                            over = true;
                            break;
                        }

                        projectedX = nextPathPoint.X*Constants.SquareSize + halfSquareSize;
                        projectedY = nextPathPoint.Y*Constants.SquareSize + halfSquareSize;
                    }

                    if ((projectedX) == (int) x && (projectedY) == (int) y)
                    {
                        //                        Global.Console.Log(EntityId, "done");
                        over = true;
                        break;
                    }

                    x = Lerper.MoveTowards(x, projectedX, animationDividedSpeed);
                    y = Lerper.MoveTowards(y, projectedY, animationDividedSpeed);
                }
                if (over) break;

                //                Global.Console.Log(EntityId, x, y);
                gameTick++;
                if (gameTick%gameTicksPerLockstepTick == 0)
                {
                    startingLockstepTickNumber++;
                    LockstepMovePoints[startingLockstepTickNumber] = new Point(x, y);
                }
            }


            LockstepMovePoints[startingLockstepTickNumber] = new Point(x, y);

            return startingLockstepTickNumber;
        }

        public void SetPath(JsDictionary<long, Point> lockstepMovePoints)
        {
            LockstepMovePoints = lockstepMovePoints;
        }

        public void SetPointInTime(double x, double y, long lockstepTick)
        {
            LockstepMovePoints[lockstepTick] = new Point(x, y);
        }
    }
}