using System;
using System.Collections.Generic;
using System.Reflection;
using System.Runtime.CompilerServices;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Utils.Promises;

namespace Pather.Common.TestFramework
{
    public static class TestFramework
    {
        private class TestProgressCounter
        {
            public int PassedCount;
            public int FailedCount;
        }
        public static Promise RunTests(Type type)
        {
            var deferred = Q.Defer();

            var methods = type.GetMethods();
            object testObject = type.Assembly.CreateInstance(type.FullName);

            Global.Console.Log("Running tests for:", type.FullName);

            var testMethods = new List<MethodInfo>();

            foreach (var methodInfo in methods)
            {
                if (methodInfo.GetCustomAttributes(typeof(TestMethodAttribute)).Length > 0)
                {
                    testMethods.Add(methodInfo);
                }
            }


            ProcessTestMethods(testObject, testMethods).Then((testProgressCounter) =>
            {
                if (testProgressCounter.FailedCount > 0)
                {
                    Global.Console.Log("Passed", testProgressCounter.PassedCount, "Failed", testProgressCounter.FailedCount);
                }
                else
                {
                    Global.Console.Log("Passed", testProgressCounter.PassedCount);
                }

                deferred.Resolve();
            });


            return deferred.Promise;

        }

        private static Promise<TestProgressCounter, object> ProcessTestMethods(object testObject, List<MethodInfo> testMethods)
        {
            var progress = new TestProgressCounter();

            var deferred = Q.Defer<TestProgressCounter, object>();


            List<Promise> promises = new List<Promise>();

            foreach (var testMethod in testMethods)
            {
                promises.Add(ProcessTestMethod(testObject, progress, testMethod));
            }
            Q.All(promises.ToArray()).Then(() =>
            {
                deferred.Resolve(progress);
            });
          


            return deferred.Promise;
        }

        private static Promise ProcessTestMethod(object testObject, TestProgressCounter progress, MethodInfo testMethod)
        {


            var d = Q.Defer();


            if (testMethod.ParameterTypes.Length > 0)
            {
                var firstParam = testMethod.ParameterTypes[0];
                if (firstParam == typeof(Deferred))
                {

                    d.Promise.Then(() =>
                    {
                        progress.PassedCount++;
                        Global.Console.Log("Running test:", testMethod.Name, "Passed");
                    }).Error(() =>
                    {
                        progress.FailedCount++;
                    });

                    try
                    {
                        testMethod.Invoke(testObject, d);
                        Global.Console.Log("Deferring test:", testMethod.Name);
                    }
                    catch (Exception ex)
                    {
                        Global.Console.Log("Running test:", testMethod.Name, "Failed:", ex.Message);
                        d.Reject();
                    }


                }
                else
                {
                    throw new Exception("First test param either needs to be empty or Deferred.");
                }
            }
            else
            {
                try
                {
                    testMethod.Invoke(testObject);
                    Global.Console.Log("Running test:", testMethod.Name, "Passed");
                }
                catch (Exception ex)
                {
                    Global.Console.Log("Running test:", testMethod.Name, "Failed:", ex.Message);
                    progress.FailedCount++;
                }

                progress.PassedCount++;
                d.Resolve();
            }

            return d.Promise;

        }


        public static void RunTests()
        {
            Assembly[] allAssemblies = GetAllAssemblies();
            List<Promise> testClassesPromises = new List<Promise>();

            foreach (var assembly in allAssemblies)
            {
                foreach (var type in assembly.GetTypes())
                {
                    if (type.GetCustomAttributes(typeof(TestClassAttribute), true).Length > 0)
                    {
                        testClassesPromises.Add(RunTests(type));
                    }
                }
            }




            Q.All(testClassesPromises.ToArray()).Then(() =>
            {
                Global.Console.Log("Done running tests.");
            });


        }
        [InlineCode("{$System.Script}.getAssemblies()")]
        public static Assembly[] GetAllAssemblies()
        {
            return (Assembly[])null;
        }

    }
}