using System;
using System.Collections.Generic;
using Pather.Common.Libraries;

namespace Pather.Common
{
    public class Game
    {
        public long NextGameTime { get; set; }
        public int[][] Grid { get; set; }
        public List<Person> People { get; set; }
        public long CurTime { get; set; }
        public Person Me { get; set; }

        public long TickNumber { get; set; }
        public long LockstepTickNumber { get; set; }
        
        public Game()
        {
            NextGameTime = new DateTime().GetTime();
            ConstructGrid();
            People = new List<Person>();

        }


        public virtual Person CreatePerson(string playerId)
        {
            return new Person(this, playerId);
        }

        public void ConstructGrid()
        {
            Grid = new int[Constants.NumberOfSquares][];
            for (int x = 0; x < Constants.NumberOfSquares; x++)
            {
                Grid[x] = new int[Constants.NumberOfSquares];
                for (int y = 0; y < Constants.NumberOfSquares; y++)
                {
                    Grid[x][y] = (Math.Random() * 100 < 15)?0:1;
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
            if (TickNumber%4 == 0)
            {
                LockstepTickNumber++;
                isLockstep = true;
            }
            var v = new DateTime().GetTime();
            NextGameTime += v - CurTime;
            CurTime = v;
            foreach (var person in People)
            {
                person.Tick(isLockstep);
            }
        }

    }
}