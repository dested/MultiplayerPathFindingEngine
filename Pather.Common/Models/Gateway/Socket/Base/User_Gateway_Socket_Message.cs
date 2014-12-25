using System;

namespace Pather.Common.Models.Gateway.Socket.Base
{
    [Serializable]
    public abstract class Gateway_Socket_Message
    {
    }

    [Serializable]
    public abstract class User_Gateway_Socket_Message : Gateway_Socket_Message
    {
        public User_Socket_MessageType UserMessageType;
    }

    [Serializable]
    public class MoveToLocation_User_Gateway_Socket_Message : User_Gateway_Socket_Message
    {
        public MoveToLocation_User_Gateway_Socket_Message()
        {
            UserMessageType = User_Socket_MessageType.Move;
        }

        public int X;
        public int Y;
        public long LockstepTick;
    }

    public enum User_Socket_MessageType
    {
        Move
    }
}