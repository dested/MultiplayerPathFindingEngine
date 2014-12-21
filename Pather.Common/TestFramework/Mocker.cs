using System;
using System.Runtime.CompilerServices;

namespace Pather.Common.TestFramework
{
    public class Mocker
    {
        static Mocker()
        {
            Script.Eval(@"
global.$overwiteMethodCallForMocker$=function ($call$,$overwrite$) {
    var $targets$=$call$._targets[0];
    for(var m in $targets$) {
        if($targets$[m]==$call$._targets[1]) {
            $targets$[m]=$overwrite$;
        }
    }
}");

            Script.Eval(@"
global.$instantiateInterface$=function ($type$) {
    var obj={};
    for(var m in $type$.prototype) {
        obj[m]=function(){throw new Error('Mock interface method '+m+' not overridden');};
    }
    return obj;
}");
        }
        [InlineCode("global.$overwiteMethodCallForMocker$({call},{overwrite})")]
        public static void OnMethodCall(Action call, Action overwrite)
        {

        }

        [InlineCode("global.$overwiteMethodCallForMocker$({call},{overwrite})")]
        public static void OnMethodCall<T>(Action<T> call, Action<T> overwrite)
        {

        }

        [InlineCode("global.$overwiteMethodCallForMocker$({call},{overwrite})")]
        public static void OnMethodCall<T, T2>(Action<T, T2> call, Action<T, T2> overwrite)
        {

        }

        [InlineCode("global.$overwiteMethodCallForMocker$({call},{overwrite})")]
        public static void OnMethodCall<T, T2, T3>(Action<T, T2, T3> call, Action<T, T2, T3> overwrite)
        {

        }


        [InlineCode("global.$overwiteMethodCallForMocker$({call},{overwrite})")]
        public static void OnMethodCall<TReturn>(Func<TReturn> call, Func<TReturn> overwrite)
        {

        }

        [InlineCode("global.$overwiteMethodCallForMocker$({call},{overwrite})")]
        public static void OnMethodCall<T, TReturn>(Func<T, TReturn> call, Func<T, TReturn> overwrite)
        {

        }

        [InlineCode("global.$overwiteMethodCallForMocker$({call},{overwrite})")]
        public static void OnMethodCall<T, T2, TReturn>(Func<T, T2, TReturn> call, Func<T, T2, TReturn> overwrite)
        {

        }

        [InlineCode("global.$overwiteMethodCallForMocker$({call},{overwrite})")]
        public static void OnMethodCall<T, T2, T3, TReturn>(Func<T, T2, T3, TReturn> call, Func<T, T2, T3, TReturn> overwrite)
        {

        }

        [InlineCode("global.$instantiateInterface$({T})")]
        public static  T InstantiateInterface<T>()
        {
            return default(T);
        }
    }
}