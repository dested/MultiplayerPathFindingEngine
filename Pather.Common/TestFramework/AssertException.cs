using System;

namespace Pather.Common.TestFramework
{
    public class AssertException : Exception
    {
        public string FailedAssertion { get; set; }

        public AssertException(string failedAssertion)
        {
            FailedAssertion = failedAssertion;
        }
    }
}