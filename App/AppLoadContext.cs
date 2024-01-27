using System.Reflection;
using System.Runtime.Loader;

namespace Core.App
{
    public class AppLoadContext : AssemblyLoadContext
    {
        private AssemblyDependencyResolver _resolver;

        public AppLoadContext() : base(isCollectible: true)
        {
            _resolver = new AssemblyDependencyResolver(AppDomain.CurrentDomain.BaseDirectory);
        }

        protected override Assembly? Load(AssemblyName assemblyName)
        {
            string? assemblyPath = _resolver.ResolveAssemblyToPath(assemblyName);
            if (assemblyPath != null)
            {
                return LoadFromAssemblyPath(assemblyPath);
            }

            return null;
        }

        protected override IntPtr LoadUnmanagedDll(string unmanagedDllName)
        {
            string? libraryPath = _resolver.ResolveUnmanagedDllToPath(unmanagedDllName);
            if (libraryPath != null)
            {
                return LoadUnmanagedDllFromPath(libraryPath);
            }

            return IntPtr.Zero;
        }
    }
}
