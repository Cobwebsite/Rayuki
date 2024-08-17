
using AventusSharp.Data.Storage.Mysql;
using AventusSharp.Tools;
using Core.App;

namespace Core.Migrations
{

    public abstract class Migration
    {
        protected bool IsDev
        {
            get
            {
                return HttpServer.IsDev;
            }
        }

        protected MySQLStorage Storage { get => AppManager.Storage; }

        public abstract VoidWithError Run();
       
    }
}