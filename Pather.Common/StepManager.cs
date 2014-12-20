using System;
using System.Collections.Generic;
using Pather.Common.Libraries;
using Pather.Common.Models;
using Console = System.Console;

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

        public long LastTickProcessed ;

        public Game Game ;
        public Dictionary<long, List<IAction>> StepActionsTicks ;
        private int misprocess;

        public virtual void ReceiveAction(SerializableAction serAction)
        {
            IAction action;
            switch (serAction.Type)
            {
                case ActionType.Move:
                    action = new MoveAction((MoveModel)serAction.Data, serAction.LockstepTickNumber);
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

    [Serializable]
    public class SerializableAction
    {
        public object Data ;
        public long LockstepTickNumber ;
        public ActionType Type ;
    }
    public interface IAction
    {
        object Data { get; }
        long LockstepTickNumber { get; }
        ActionType Type { get; }
        void Process(Game game);
    }

    public enum ActionType
    {
        Move, Noop
    }

    public class MoveAction : IAction
    {
        public MoveModel MoveModel ;
        public object Data { get { return MoveModel; } }

        public long LockstepTickNumber { get; private set; }

        public MoveAction(MoveModel moveModel, long lockstepTickNumber)
        {
            MoveModel = moveModel;
            LockstepTickNumber = lockstepTickNumber;
        }

        public void Process(Game game)
        {
            foreach (var person in game.Players)
            {
                if (person.PlayerId == MoveModel.PlayerId)
                {
                    person.RePathFind(MoveModel.X, MoveModel.Y);
                }
            }
        }
        public ActionType Type
        {
            get { return ActionType.Move; }
        }
    }
    public class NoopAction : IAction
    {
        public NoopAction(long lockstepTickNumber)
        {
            LockstepTickNumber = lockstepTickNumber;
        }

        public object Data { get { return null; } }

        public long LockstepTickNumber { get; private set; }

        public void Process(Game game)
        {
        }
        public ActionType Type
        {
            get { return ActionType.Noop; }
        }
    }
}