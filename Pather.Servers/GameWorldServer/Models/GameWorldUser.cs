using System;
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
//                Global.Console.Log(UserId, X, Y, LockstepMovePoints.Count, lockstepTickNumber);
            }
        }


        public void SetLockstepMovePoints(JsDictionary<long, Point> lockstepMovePoints)
        {
            LockstepMovePoints = lockstepMovePoints;
        }

        public double Distance(GameWorldUser user)
        {
            return Math.Sqrt((Math.Pow(X - user.X, 2) + Math.Pow(Y - user.Y, 2)));
        }
    }
}