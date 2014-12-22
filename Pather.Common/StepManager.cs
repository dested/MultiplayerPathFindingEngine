using System;
using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Game;

namespace Pather.Common
{
    public abstract class StepManager
    {
        public StepManager(Game game)
        {
            Game = game;
            StepActionsTicks = new Dictionary<long, List<IAction>>();
            LastTickProcessed = 0;
        }

        public long LastTickProcessed;

        public Game Game;
        public Dictionary<long, List<IAction>> StepActionsTicks;
        private int misprocess;

        public virtual void ReceiveAction(SerializableAction serAction)
        {
            IAction action;
            switch (serAction.Type)
            {
                case ActionType.Move:
                    action = new MoveAction((MoveModel) serAction.Data, serAction.LockstepTickNumber);
                    break;
                case ActionType.Noop:
                    action = new NoopAction(serAction.LockstepTickNumber);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }


            if (!StepActionsTicks.ContainsKey(serAction.LockstepTickNumber))
            {
                if (serAction.LockstepTickNumber <= Game.LockstepTickNumber)
                {
                    action.Process(Game);
                    Global.Console.Log("Misprocess of action count", ++misprocess, Game.LockstepTickNumber - serAction.LockstepTickNumber);
                    return;
                }
                StepActionsTicks[serAction.LockstepTickNumber] = new List<IAction>();
            }
            StepActionsTicks[serAction.LockstepTickNumber].Add(action);
        }

        public void ProcessAction(long lockstepTickNumber)
        {
            if (!StepActionsTicks.ContainsKey(lockstepTickNumber))
            {
                return;
            }
            var stepActions = StepActionsTicks[lockstepTickNumber];


//            Global.Console.Log("Actions for", stepActions.Count, "Players");

            foreach (var stepAction in stepActions)
            {
                stepAction.Process(Game);
            }
            LastTickProcessed = lockstepTickNumber;
            StepActionsTicks.Remove(lockstepTickNumber);
        }

        public abstract int NetworkPlayers { get; }
    }
}