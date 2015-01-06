using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Definitions.AStar;
using Pather.Common.GameFramework;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Utils;

namespace Pather.Servers.GameSegmentServer
{
    public class ServerGameUser : GameUser, IServerGameEntity
    {


        public GameSegment GameSegment;
        public string GatewayId;
        public ServerGameUser(ServerGame game, string userId)
            : base(game, userId)
        {
            lockstepMovePoints = new List<Point>();
        }

        private List<Point> lockstepMovePoints;

        public override void Tick()
        {
            base.Tick();
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
                Global.Console.Log(EntityId, X, Y, lockstepMovePoints.Count);
            }
        }

        public override void RePathFind(double destinationX, double destinationY)
        {
            base.RePathFind(destinationX, destinationY);
            BuildMovement();
            Global.Console.Log("Path points:", lockstepMovePoints);
        }

        public void BuildMovement()
        {
            var x = X;
            var y = Y;

            var sqX = Utilities.ToSquare(x);
            var sqY = Utilities.ToSquare(y);

            var result = Path[0];

            int projectedSquareX = result == null ? sqX : (result.X);
            int projectedSquareY = result == null ? sqY : (result.Y);
            List<Point> points = new List<Point>();

            var gameTicksPerLockstepTick = Constants.GameFps / Constants.LockstepFps;
            var gameTick = 0;
            while (result != null)
            {
                sqX = Utilities.ToSquare(x);
                sqY = Utilities.ToSquare(y);

                if (sqX == result.X && sqY == result.Y)
                {
                    Path.RemoveAt(0);
                    result = Path[0];

                    projectedSquareX = result == null ? sqX : (result.X);
                    projectedSquareY = result == null ? sqY : (result.Y);
                }


                int projectedX = projectedSquareX * Constants.SquareSize + Constants.SquareSize / 2;
                int projectedY = projectedSquareY * Constants.SquareSize + Constants.SquareSize / 2;


                if (((int)projectedX) == ((int)x) && ((int)projectedY) == ((int)y))
                {
                    break;
                }

                x = Lerper.MoveTowards(x, projectedX, (Speed));
                y = Lerper.MoveTowards(y, projectedY, (Speed));
                gameTick++;
                if (gameTick % gameTicksPerLockstepTick == 0)
                {
                    points.Add(new Point(x, y));
                }
            }
            lockstepMovePoints = points;
            //todo path should .count==0
            Path .Clear();

        }


    }
}