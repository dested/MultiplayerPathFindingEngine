using System;

namespace Pather.Common.TestFramework
{
    public class TestMethodAttribute : Attribute
    {
        public bool Disable { get; set; }

        public TestMethodAttribute(bool disable = false)
        {
            Disable = disable;
        }
    }
}