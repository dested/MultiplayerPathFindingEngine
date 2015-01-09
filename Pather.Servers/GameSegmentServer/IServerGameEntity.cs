namespace Pather.Servers.GameSegmentServer
{
    public interface IServerGameEntity
    {
        void LockstepTick
            (long lockstepTickNumber);
    }
}