using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace Pather.Common.Libraries.NodeJS
{
    [IgnoreNamespace]
    [Imported()]
    public class Console
    {
        public void Log(object o)
        {
        }
        [InlineCode("console.log.apply(null,{o})")]
        public void Log(object[] o)
        {
        }
        [InlineCode("console.log.apply(null,{o})")]
        public void Log(List<object> o)
        {
        }

        public void Log(object o, object o2)
        {
        }

        public void Log(object o, object o2, object o3)
        {
        }

        public void Log(object o, object o2, object o3, object o4)
        {
        }

        public void Log(object o, object o2, object o3, object o4, object o5)
        {
        }

        public void Log(object o, object o2, object o3, object o4, object o5, object o6)
        {
        }

        public void Log(object o, object o2, object o3, object o4, object o5, object o6, object o7)
        {
        }

        public void Log(object o, object o2, object o3, object o4, object o5, object o6, object o7, object o8)
        {
        }

        public void Log(Exception log)
        {
        }
    }
}