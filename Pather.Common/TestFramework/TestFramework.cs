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
            var testObject = type.Assembly.CreateInstance(type.FullName);

            Global.Console.Log("Running tests for:", type.FullName);

            var testMethods = new List<MethodInfo>();

            foreach (var methodInfo in methods)
            {
                var customAttributes = methodInfo.GetCustomAttributes(typeof (TestMethodAttribute));
                if (customAttributes.Length > 0 && !((TestMethodAttribute) customAttributes[0]).Disable)
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


            var promises = new List<Promise>();

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
                if (firstParam == typeof (Deferred))
                {
                    d.Promise.Then(() =>
                    {
                        progress.PassedCount++;
                        Global.Console.Log("", "Running test:", testMethod.Name, "Passed");
                    }).Error(() =>
                    {
                        progress.FailedCount++;
                    });

                    try
                    {
                        Global.Console.Log("Deferring test:", testMethod.Name);
                        testMethod.Invoke(testObject, d);
                    }
                    catch (AssertException ex)
                    {
                        Global.Console.Log("", "Assert Failed", testMethod.Name, "Failed:", ex.FailedAssertion);
                        d.Reject();
                    }
                    catch (Exception ex)
                    {
                        Global.Console.Log("", "Exception", "Test:", testMethod.Name, "Failed:", ex.Message);
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
                    Global.Console.Log("Running test:", testMethod.Name, "Passed");
                    testMethod.Invoke(testObject);
                    Global.Console.Log("", "Test:", testMethod.Name, "Passed");
                }
                catch (AssertException ex)
                {
                    Global.Console.Log("", "Assert Failed", testMethod.Name, "Failed:", ex.FailedAssertion);
                    d.Reject();
                }
                catch (Exception ex)
                {
                    Global.Console.Log("", "Exception", "Test:", testMethod.Name, "Failed:", ex.Message);
                    progress.FailedCount++;
                }

                progress.PassedCount++;
                d.Resolve();
            }

            return d.Promise;
        }


        public static void RunTests(string testClass)
        {
            var allAssemblies = GetAllAssemblies();
            var testClassesPromises = new List<Promise>();

            foreach (var assembly in allAssemblies)
            {
                foreach (var type in assembly.GetTypes())
                {
                    var customAttributes = type.GetCustomAttributes(typeof (TestClassAttribute), true);
                    if (customAttributes.Length > 0 && !((TestClassAttribute) customAttributes[0]).Disable)
                    {
                        if (string.IsNullOrEmpty(testClass) || type.Name == testClass)
                        {
                            testClassesPromises.Add(RunTests(type));
                        }
                    }
                }
            }


            Q.All(testClassesPromises.ToArray()).Then(() =>
            {
                Global.Console.Log("Done running tests.");
                if (Global.Process != null)
                {
                    Global.Process.Exit();
                }
            });
        }

        [InlineCode("{$System.Script}.getAssemblies()")]
        public static Assembly[] GetAllAssemblies()
        {
            return (Assembly[]) null;
        }
    }
}