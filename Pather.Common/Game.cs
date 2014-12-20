using System;
using System.Collections.Generic;
using Pather.Common.Definitions.AStar;
using Pather.Common.Libraries;
using Pather.Common.Libraries.NodeJS;

namespace Pather.Common
{
    public class Game
    {
        public int[][] Grid ;
        public List<Entity> Players ;
        public long CurLockstepTime ;
        public long CurTickTime ;
        public StepManager StepManager ;

        public long TickNumber ;
        public long LockstepTickNumber ;
        public bool Ready ;

        public Game()
        {
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
            AStarGraph = new AStarGraph(Grid);
        }

        public virtual void Init()
        {


            CurGameTime = new DateTime().GetTime();
            CurLockstepTime = new DateTime().GetTime();
            CurTickTime = new DateTime().GetTime();

            Global.SetTimeout(() => Tick(), 1);
        }

        public long CurGameTime ;

        public long NextGameTime ;
        public int ServerLatency ;
        public long TrackTickNumber ;
        public long TrackLockstepTickNumber ;


        public double PercentCompletedWithLockStep
        {
            get
            {
                var vc = new DateTime().GetTime();
                var l = (vc - CurLockstepTime);

                return l /(double) Constants.LockstepTicks;
            }
        }

        public AStarGraph AStarGraph;

        public virtual TickResult Tick()
        {
            Global.SetTimeout(() => Tick(), 1);

            var tickResult = TickResult.None;
            if (!Ready) return tickResult;

            var vc = new DateTime().GetTime();
            var l = (vc - CurLockstepTime);

            while (l > Constants.LockstepTicks)
            {
                l -= Constants.LockstepTicks;
                CurLockstepTime += Constants.LockstepTicks;
                LockstepTickNumber++;
                Global.Console.Log("Lockstep", LockstepTickNumber,new DateTime().GetTime());

                StepManager.ProcessAction(LockstepTickNumber);

                tickResult = TickResult.Lockstep;

            }


            var l2 = (vc - CurTickTime);
            var nextTickTime = l2 / Constants.GameTicks;
            while (nextTickTime > TrackTickNumber)
            {
                TrackTickNumber++;
                TickNumber++;
                foreach (var person in Players)
                {
                    person.Tick();
                }

                tickResult = tickResult == TickResult.Lockstep ? TickResult.Both : TickResult.Game;

                //todo probably should only happen once? and not in the loop
                var v = new DateTime().GetTime();
                NextGameTime += v - CurGameTime;
                CurGameTime = v;
            }

            return tickResult;
        }

    }

    public enum TickResult
    {
        None = 0,
        Game = 1,
        Lockstep = 2,
        Both = 3
    }
}