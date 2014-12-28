using Pather.Common.Models.Game.Old;

namespace Pather.Common.old
{
    public class MoveAction : IAction
    {
        public MoveModel MoveModel;

        public object Data
        {
            get { return MoveModel; }
        }

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
}