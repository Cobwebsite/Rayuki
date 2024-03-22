using AventusSharp.Data.Storage.Default;
using AventusSharp.Tools;
using Core.App;
using Core.Data;

namespace Core.Logic
{
    public abstract class Seeder
    {
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
                if (!_LoadVersion(versionDb, seeder))
                {
                    Console.WriteLine("Seeder failed for " + name + " version " + versionDb);
                    return;
                }
            }
        }

        private bool _LoadVersion(int version, SeederMemory seeder)
        {
            ResultWithError<BeginTransactionResult> transactionQuery = AppManager.Storage.BeginTransaction();
            if (!transactionQuery.Success || transactionQuery.Result == null) return false;

            if (!LoadVersion(version))
            {
                transactionQuery.Result.Rollback();
                return false;
            }

            seeder.Version = version;

            if (seeder.Id != 0)
            {
                seeder.Update();
            }
            else
            {
                seeder.Create();
            }
            transactionQuery.Result.Commit();
            return true;
        }

        protected abstract bool LoadVersion(int version);
    }
}