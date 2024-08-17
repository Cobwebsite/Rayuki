
using System.Data.Common;
using AventusSharp.Data;
using AventusSharp.Data.Storage.Mysql;
using AventusSharp.Tools;
using Core.App;
using Core.Tools;

namespace Core.Migrations
{

    public class MigrationLogic
    {
        public MySQLStorage Storage { get => AppManager.Storage; }
        private string tableName = "migrations";
        private string tableNameGlobal = "migrations_global";

        public Dictionary<string, int> appMigrations { get; private set; } = new Dictionary<string, int>();
        public List<string> globalMigrations { get; private set; } = new List<string>();
        private VoidWithError CheckTableApp()
        {
            VoidWithError result = new();
            ResultWithError<bool> tableExist = Storage.TableExist(tableName);
            if (tableExist.Success && !tableExist.Result)
            {
                string create = "CREATE TABLE `" + tableName + "` (`Id` int NOT NULL AUTO_INCREMENT, `Name` varchar(255) NOT NULL, `Version` int NOT NULL, CONSTRAINT `PK_" + tableName + "` PRIMARY KEY (`Id`))";
                return Storage.Execute(create);
            }
            result.Errors.AddRange(tableExist.Errors);
            return result;
        }
        private VoidWithError CheckTableGlobal()
        {
            VoidWithError result = new();
            ResultWithError<bool> tableExist = Storage.TableExist(tableNameGlobal);
            if (tableExist.Success && !tableExist.Result)
            {
                string create = "CREATE TABLE `" + tableNameGlobal + "` (`Id` int NOT NULL AUTO_INCREMENT, `Name` TEXT NOT NULL, CONSTRAINT `PK_" + tableNameGlobal + "` PRIMARY KEY (`Id`))";
                return Storage.Execute(create);
            }
            result.Errors.AddRange(tableExist.Errors);
            return result;
        }


        public VoidWithError Init()
        {
            return new VoidWithError()
               .Run(CheckTableApp)
               .Run(CheckTableGlobal)
               .Run(LoadApp)
               .Run(LoadGlobal);
        }

        public VoidWithError RunGlobal(string filePath, string name)
        {
            VoidWithError result = new VoidWithError();
            
            if(!filePath.EndsWith(".sql")) return result;

            if (!globalMigrations.Contains(name))
            {
                try
                {
                    string content = File.ReadAllText(filePath);
                    VoidWithError execResult = Storage.Execute(content);
                    if (execResult.Success)
                    {
                        ResultWithDataError<DbCommand> cmdQuery = Storage.CreateCmd("INSERT INTO " + tableNameGlobal + " (Name) VALUES (@Name)");
                        if (cmdQuery.Success && cmdQuery.Result != null)
                        {
                            result = Storage.Execute(cmdQuery.Result, parameters: new() { { "@Name", name } });
                        }
                        else
                        {
                            result.Errors = cmdQuery.ToGeneric().Errors;
                        }
                    }
                }
                catch (Exception e)
                {
                    result.Errors.Add(new CoreError(CoreErrorCode.MigrationError, e));
                }
            }
            return result;
        }

        public List<GenericError> LoadApp()
        {
            string query = "SELECT * FROM " + tableName;
            ResultWithError<List<Dictionary<string, string?>>> queryResult = Storage.Query(query);
            if (!queryResult.Success || queryResult.Result == null)
            {
                return queryResult.Errors;
            }

            Dictionary<string, int> list = new Dictionary<string, int>();
            foreach (Dictionary<string, string?> line in queryResult.Result)
            {
                string? appName = "";
                int appVersion = 0;
                foreach (KeyValuePair<string, string?> column in line)
                {
                    if (column.Key == "Name")
                    {
                        appName = column.Value;
                    }
                    else if (column.Key == "Version")
                    {
                        int.TryParse(column.Value, out appVersion);
                    }
                }

                if (!string.IsNullOrEmpty(appName))
                {
                    list.Add(appName, appVersion);
                }
            }
            appMigrations = list;

            return new List<GenericError>();
        }

        public List<GenericError> LoadGlobal()
        {
            string query = "SELECT * FROM " + tableNameGlobal;
            ResultWithError<List<Dictionary<string, string?>>> queryResult = Storage.Query(query);
            if (!queryResult.Success || queryResult.Result == null)
            {
                return queryResult.Errors;
            }

            List<string> list = new List<string>();
            foreach (Dictionary<string, string?> line in queryResult.Result)
            {
                string? fileName = "";
                foreach (KeyValuePair<string, string?> column in line)
                {
                    if (column.Key == "Name")
                    {
                        fileName = column.Value;
                    }
                }

                if (!string.IsNullOrEmpty(fileName))
                {
                    list.Add(fileName);
                }
            }
            globalMigrations = list;
            return new List<GenericError>();
        }

    }
}