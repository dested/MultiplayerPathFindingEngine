using System;
using System.Collections.Generic;
using Pather.Common.Libraries;

namespace Pather.Common
{
    public class Game
    {
        public long NextGameTime { get; set; }
        public int[][] Grid { get; set; }
        public List<Entity> Players { get; set; }
        public long CurTime { get; set; }
        public StepManager StepManager { get; set; }

        public long TickNumber { get; set; }
        public long LockstepTickNumber { get; set; }
        public bool Ready { get; set; }

        public Game()
        {
            NextGameTime = new DateTime().GetTime();
            ConstructGrid();
            Players = new List<Entity>();

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

            Global.SetTimeout(Tick, Constants.GameTicks);
        }

        public virtual void Tick()
        {
            Global.SetTimeout(Tick, Constants.GameTicks);

            TickNumber++;
            bool isLockstep = false;
            if (TickNumber % 5 == 0)
            {
                LockstepTickNumber++;
                isLockstep = true;
            }


            if (!Ready) return;

            if (isLockstep)
            {
                Global.Console.Log("Lockstep", LockstepTickNumber);
                StepManager.ProcessAction(LockstepTickNumber);
            }



            var v = new DateTime().GetTime();
            NextGameTime += v - CurTime;
            CurTime = v;
            foreach (var person in Players)
            {
                person.Tick(isLockstep);
            }
        }

    }
}