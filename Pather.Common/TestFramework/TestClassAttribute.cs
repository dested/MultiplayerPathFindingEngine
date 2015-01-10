using System;

namespace Pather.Common.TestFramework
{
    public class TestClassAttribute : Attribute
    {
        public bool Disable;


        public TestClassAttribute(bool disable = false)
        {
            Disable = disable;
        }
    }
}