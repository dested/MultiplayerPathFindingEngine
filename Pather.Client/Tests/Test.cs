using Pather.Common.Libraries.NodeJS;
using Pather.Common.TestFramework;
using Pather.Common.Utils.Promises;

namespace Pather.Client.Tests
{
    [TestClass]
    public class Test
    {
        [TestMethod]
        public void Test2()
        {
            Assert.That(12).Does.Equal(12);
        }
        [TestMethod]
        public void Test1(Deferred defer)
        {
            Global.SetTimeout(() =>
            {
                defer.Resolve();
            }, 1000);

            DeferredAssert.That(defer, 12).Does.Equal(12);
        }

        [TestMethod]
        public void Test3()
        {
            Assert.That(12).Does.Equal(12);
        }

        [TestMethod]
        public void Test4()
        {
            Assert.That(12).Does.Equal(12);
            Assert.That(12).Does.Equal(12);
        }


    }

    [TestClass]
    public class Test22
    {
        [TestMethod]
        public void Test2()
        {
            Assert.That(12).Does.Equal(12);
        }
        [TestMethod]
        public void Test1(Deferred defer)
        {
            Global.SetTimeout(() =>
            {
                defer.Resolve();
            },4000);

            DeferredAssert.That(defer, 12).Does.Equal(12);
        }

        [TestMethod]
        public void Test3()
        {
            Assert.That(12).Does.Equal(12);
        }

        [TestMethod]
        public void Test4()
        {
            Assert.That(12).Does.Equal(12);
            Assert.That(12).Does.Equal(12);
        }


    }


}