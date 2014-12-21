namespace Pather.Common
{
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