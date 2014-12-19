using System;
using System.Collections.Generic;
using Pather.Common.Libraries;

namespace Pather.Common
{
    public class Game
    {
        public int[][] Grid { get; set; }
        public List<Entity> Players { get; set; }
        public long CurTime { get; set; }
        public StepManager StepManager { get; set; }

        public long TickNumber { get; set; }
        public long LockstepTickNumber { get; set; }
        public bool Ready { get; set; }

        public Game()
        {
            ConstructGrid();
            Players = new List<Entity>();

            NextGameTime = new DateTime().GetTime();
        }


        public virtual Entity CreatePlayer(string playerId)
        {
            return new Entity(this, playerId);
        }

        public void ConstructGrid()
        {
            Grid = new int[Constants.NumberOfSquares][];
            for (int x = 0; x < Constants.NumberOfSquares; x++)
            {
                Grid[x] = new int[Constants.NumberOfSquares];
                for (int y = 0; y < Constants.NumberOfSquares; y++)
                {
                    Grid[x][y] = (Math.Random() * 100 < 15) ? 0 : 1;
                }
            }
        }

        public virtual void Init()
        {


            CurTime = new DateTime().GetTime();
            LastExecutedTick = 0;
            LastExecutedLockstep = 0;

            Global.SetTimeout(Tick, 1);
        }

        private long LastExecutedTick = 0;
        private long LastExecutedLockstep = 0;
        public long NextGameTime { get; set; }
        public virtual void Tick()
        {
            Global.SetTimeout(Tick, 1);
            if (!Ready) return;

            var vc = new DateTime().GetTime();
            var nextTickTime = (vc - CurTime) / Constants.GameTicks;
            var nextLockstepTime = (vc - CurTime) / Constants.LockstepTicks;


            
            var v = new DateTime().GetTime();
            NextGameTime += v - CurTime;
            CurTime = v;


            while (nextLockstepTime > LastExecutedLockstep)
            {
                LastExecutedLockstep++;
                LockstepTickNumber++;
                Global.Console.Log("Lockstep", LockstepTickNumber);
                StepManager.ProcessAction(LockstepTickNumber);

            }


            while (nextTickTime > LastExecutedTick)
            {
                LastExecutedTick++;
                TickNumber++;
                foreach (var person in Players)
                {
                    person.Tick();
                }

            }


        }

    }
}