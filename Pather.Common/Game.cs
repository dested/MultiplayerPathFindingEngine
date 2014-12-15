using System;
using System.Collections.Generic;
using Pather.Common.Libraries;

namespace Pather.Common
{
    public class Game
    {
        public long NextGameTick { get; set; }
        public int[][] Grid { get; set; }
        public List<Person> People { get; set; }
        public long CurTick { get; set; }
        
        public Game()
        {
            NextGameTick = new DateTime().GetTime();
            ConstructGrid();
            People = new List<Person>();
            var sal = CreatePerson();
            People.Add(sal);

            CurTick = new DateTime().GetTime();

        }

        public virtual Person CreatePerson()
        {
            return new Person(this);
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
            foreach (var person in People)
            {
                person.Init(0, 0);
            }
            Global.SetTimeout(Tick, Constants.GameTicks);
        }

        public virtual void Tick()
        {
            Global.SetTimeout(Tick, Constants.GameTicks);

            var v = new DateTime().GetTime();
            NextGameTick += v - CurTick;
            CurTick = v;
            foreach (var person in People)
            {
                person.Tick();
            }
        }

    }
}