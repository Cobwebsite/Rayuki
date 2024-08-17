using AventusSharp.Data.Storage.Default;
using AventusSharp.Tools;
using Core.App;
using Core.Data;
using Core.Tools;

namespace Core.Migrations
{
    public abstract class Seeder
    {
        protected bool IsDev
        {
            get
            {
                return HttpServer.IsDev;
            }
        }
        protected abstract int DefineVersion();

        internal void Run()
        {
            string? name = GetType().Assembly.GetName().Name;
            if (name == null) return;
            int versionLocal = DefineVersion();
            int versionDb;
            List<SeederMemory> seeders = SeederMemory.Where(p => p.Name == name);

            SeederMemory seeder = seeders.Count == 0 ? new SeederMemory() { Name = name } : seeders[0];
            versionDb = seeders.Count == 0 ? 0 : seeders[0].Version;
            versionDb++;

            for (; versionDb <= versionLocal; versionDb++)
            {
                VoidWithError resultTemp = _LoadVersion(versionDb, seeder);
                if (!resultTemp.Success)
                {
                    resultTemp.Print();
                    return;
                }
            }
        }

        private VoidWithError _LoadVersion(int version, SeederMemory seeder)
        {
            return AppManager.Storage.RunInsideTransaction(() =>
            {
                VoidWithError voidWithError = new VoidWithError();
                if (!LoadVersion(version))
                {
                    voidWithError.Errors.Add(new CoreError(CoreErrorCode.SeederError, "The seeder for the app " + GetType().Assembly.GetName().Name +" failed for version "+version));
                    return voidWithError;
                }

                seeder.Version = version;

                if (seeder.Id != 0)
                {
                    voidWithError.Errors = seeder.UpdateWithError();
                }
                else
                {
                    voidWithError.Errors = seeder.CreateWithError();
                }

                return voidWithError;
            });
        }

        protected abstract bool LoadVersion(int version);
    }
}