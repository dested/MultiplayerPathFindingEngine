using System;
using System.Runtime.CompilerServices;

namespace Pather.Common.Models.Gateway.Socket.Base
{
    [Serializable]
    public abstract class Socket_Message
    {
    }

    [Serializable]
    public abstract class Gateway_Socket_Message : Socket_Message
    {
    }
    [Serializable]
    public abstract class User_Socket_Message : Socket_Message
    {
    }
    [Serializable]
    public abstract class User_Gateway_Socket_Message : Gateway_Socket_Message
    {
        public User_Gateway_Socket_MessageType UserGatewayMessageType;
    }
    [Serializable]
    public abstract class Gateway_User_Socket_Message : User_Socket_Message
    {
        public Gateway_User_Socket_MessageType GatewayUserMessageType;
    }

    [Serializable]
    public class UserJoined_User_Gateway_Socket_Message : User_Gateway_Socket_Message
    {
        public UserJoined_User_Gateway_Socket_Message()
        {
            UserGatewayMessageType = User_Gateway_Socket_MessageType.Join;
        }
        public string UserToken { get; set; }

    }




    [Serializable]
    public class UserJoined_Gateway_User_Socket_Message : Gateway_User_Socket_Message
    {
        public UserJoined_Gateway_User_Socket_Message()
        {
            GatewayUserMessageType = Gateway_User_Socket_MessageType.UserJoined;
        }

        public string GameSegmentId;
        public string UserId;
    }



    [Serializable]
    public class MoveToLocation_User_Gateway_Socket_Message : User_Gateway_Socket_Message
    {
        public MoveToLocation_User_Gateway_Socket_Message()
        {
            UserGatewayMessageType = User_Gateway_Socket_MessageType.Move;
        }

        public int X;
        public int Y;
        public long LockstepTick;
    }
    [Serializable]
    public class MoveToLocation_Gateway_User_Socket_Message : Gateway_User_Socket_Message
    {
        public MoveToLocation_Gateway_User_Socket_Message()
        {
            GatewayUserMessageType = Gateway_User_Socket_MessageType.Move;
        }

        public int X;
        public int Y;
        public long LockstepTick;
    }


    [NamedValues]
    public enum Gateway_User_Socket_MessageType
    {
        Move,
        UserJoined
    }
    [NamedValues]
    public enum User_Gateway_Socket_MessageType
    {
        Move,
        Join
    }
}