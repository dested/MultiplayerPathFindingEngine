﻿using System;
using System.Runtime.CompilerServices;
namespace SocketIOWebLibrary
{
    [IgnoreNamespace]
    [Imported()]
    public class EventEmitter
    {
        [ScriptName("emit")]
        public void Emit<T>(string channel, T content) { }

        [ScriptName("on")]
        public void On(string channel, Action callback) { }

        [ScriptName("on")]

        public void On<T>(string channel, Action<T> callback) { }

        [ScriptName("on")]

        public void On<T, T2>(string channel, Action<T, T2> callback) { }

        [ScriptName("on")]

        public void On<T, T2, T3>(string channel, Action<T, T2, T3> callback) { }
    }
}