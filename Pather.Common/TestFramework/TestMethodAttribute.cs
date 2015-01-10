using System;

namespace Pather.Common.TestFramework
{
    public class TestMethodAttribute : Attribute
    {
        public bool Disable;

        public TestMethodAttribute(bool disable = false)
        {
            Disable = disable;
        }
    }
}