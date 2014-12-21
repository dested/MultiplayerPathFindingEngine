namespace Pather.Common
{
    public interface IAction
    {
        object Data { get; }
        long LockstepTickNumber { get; }
        ActionType Type { get; }
        void Process(Game game);
    }
}