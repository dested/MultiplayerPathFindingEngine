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

        public long LastTickProcessed { get; set; }

        public Game Game { get; set; }
        public Dictionary<long, List<IAction>> StepActionsTicks ;

        public virtual void ReceiveAction(SerializableAction serAction)
        {
            if (!StepActionsTicks.ContainsKey(serAction.LockstepTickNumber))
            {
                StepActionsTicks[serAction.LockstepTickNumber] = new List<IAction>();
            }
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
            StepActionsTicks[serAction.LockstepTickNumber].Add(action);
        }

        public void ProcessAction(long lockstepTickNumber)
        {
            if (!StepActionsTicks.ContainsKey(lockstepTickNumber))
            {
                Global.Console.Log("Didnt get any actions :-/");
                return;
            }
            var stepActions = StepActionsTicks[lockstepTickNumber];
            if (stepActions.Count != NetworkPlayers)
            {
                Global.Console.Log("Didnt get all actions for all players :-/", stepActions.Count,NetworkPlayers);
                return;
                throw new Exception("Didnt get all actions for all players :-/");
            }

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
        public object Data { get; set; }
        public long LockstepTickNumber { get; set; }
        public ActionType Type { get; set; }
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
        public MoveModel MoveModel { get; set; }
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