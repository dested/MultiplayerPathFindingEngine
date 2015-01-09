using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Utils;

namespace Pather.Servers.GameWorldServer.Models
{
    public class GameWorldUser
    {
        public string UserId;
        public double X;
        public double Y;
        public string GatewayId;
        public GameSegment GameSegment;
        public List<GameWorldNeighbor> Neighbors { get; set; }
        public JsDictionary<long, Point> LockstepMovePoints;

        public GameWorldUser()
        {
            LockstepMovePoints = new JsDictionary<long, Point>();
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
                Global.Console.Log(UserId, X, Y, LockstepMovePoints.Count, lockstepTickNumber);
            }
             
        }
        public GameWorldNeighbor ClosestNeighbor()
        {
            GameWorldNeighbor closestNeighbor = null;
            foreach (var gameWorldNeighbor in Neighbors)
            {
                if (closestNeighbor == null || gameWorldNeighbor.Distance < closestNeighbor.Distance)
                {
                    closestNeighbor = gameWorldNeighbor;
                }
            }
            return closestNeighbor;
        }

        public void SetLockstepMovePoints(JsDictionary<long, Point> lockstepMovePoints)
        {
            LockstepMovePoints = lockstepMovePoints;
        }
    }
}