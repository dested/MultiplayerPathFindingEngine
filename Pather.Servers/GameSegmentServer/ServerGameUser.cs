using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Definitions.AStar;
using Pather.Common.GameFramework;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common;
using Pather.Common.Models.Common.UserActions;
using Pather.Common.Utils;

namespace Pather.Servers.GameSegmentServer
{
    public class ServerGameUser : GameUser, IServerGameEntity
    {
        public GameSegment GameSegment;
        public string GatewayId;
        public List<InProgressAction> InProgressActions;
        private readonly List<Point> lockstepMovePoints;

        public ServerGameUser(ServerGame game, string userId)
            : base(game, userId)
        {
            lockstepMovePoints = new List<Point>();
            InProgressActions = new List<InProgressAction>();
        }

        public Point GetPositionAtLockstep(long lockstepTickNumber)
        {
            if (lockstepTickNumber < lockstepMovePoints.Count + game.tickManager.LockstepTickNumber)
            {
                return lockstepMovePoints[(int) (lockstepTickNumber - game.tickManager.LockstepTickNumber)];
            }

            return new Point(X, Y);
        }

        public override void LockstepTick(long lockstepTickNumber)
        {
            base.LockstepTick(lockstepTickNumber);

            if (lockstepMovePoints.Count > 0)
            {
                var point = lockstepMovePoints[0];
                X = point.X;
                Y = point.Y;

                lockstepMovePoints.RemoveAt(0);
                Global.Console.Log(EntityId, X, Y, lockstepMovePoints.Count, lockstepTickNumber);
            }

            emptyInProgressActions(lockstepTickNumber);
        }

        private void emptyInProgressActions(long lockstepTickNumber)
        {
            for (var index = InProgressActions.Count - 1; index >= 0; index--)
            {
                var inProgressAction = InProgressActions[index];
                if (inProgressAction.EndingLockStepTicking <= lockstepTickNumber)
                {
                    InProgressActions.Remove(inProgressAction);
                }
            }
        }

        public override void RePathFind(MoveEntityAction destinationAction)
        {
            base.RePathFind(destinationAction);


            var moveEntityOnPathAction = new MoveEntityOnPathAction()
            {
                EntityId = destinationAction.EntityId,
                LockstepTick = destinationAction.LockstepTick,
                Path = new List<AStarLockstepPath>(Path)
            };
            ProjectMovement();
            Global.Console.Log("Move entity on path:", moveEntityOnPathAction);
            InProgressActions.Add(new InProgressAction(moveEntityOnPathAction, destinationAction.LockstepTick + lockstepMovePoints.Count));


            //            Global.Console.Log("Path points:", InProgressActions);
        }

        public void ProjectMovement()
        {
            var x = X;
            var y = Y;
            //            Global.Console.Log(EntityId,"Projecting movement");

            var pathCopy = new List<AStarLockstepPath>(Path);
            var startingLockstepTickNumber = game.tickManager.LockstepTickNumber;

            var nextPathPoint = pathCopy[0];
            lockstepMovePoints.Clear();
            if (nextPathPoint == null) return;
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
                        nextPathPoint.RemovedAtLockstep = startingLockstepTickNumber + lockstepMovePoints.Count;
                        pathCopy.RemoveAt(0);
                        nextPathPoint = pathCopy[0];
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
                    lockstepMovePoints.Add(new Point(x, y));
                }
            }


            var lastLockstepMovePoint = lockstepMovePoints.Last();
            if (lastLockstepMovePoint != null)
            {
                lastLockstepMovePoint.X = x;
                lastLockstepMovePoint.Y = y;
            }

            //todo path should .count==0
            Path.Clear();
        }
    }
}