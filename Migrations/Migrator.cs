
using AventusSharp.Data.Storage.Mysql;
using AventusSharp.Tools;
using Core.App;

namespace Core.Migrations
{

    public abstract class Migrator
    {
        protected bool IsDev
        {
            get
            {
                return HttpServer.IsDev;
            }
        }

        protected MySQLStorage Storage { get => AppManager.Storage; }

        public async Task<VoidWithError> Run(int? oldVersion, int currentVersion) {
            return await AppManager.Storage.RunInsideTransaction(async () =>
            {
                return await RunMigration(oldVersion, currentVersion);
            });
        }
        /// <summary>
        /// Run custom migration. If app not installed yet, the oldVersion will be null
        /// This function is already running inside a Transaction
        /// </summary>
        /// <param name="oldVersion"></param>
        /// <returns></returns>
        protected abstract Task<VoidWithError> RunMigration(int? oldVersion, int currentVersion);
    }
}