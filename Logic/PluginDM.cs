using AventusSharp.Data.Manager;
using AventusSharp.Data.Manager.DB;
using AventusSharp.Tools;
using Core.App;
using Core.Data;
using Core.Permissions;
using Core.Tools;
using System.Text.RegularExpressions;
using Group = Core.Data.Group;

namespace Core.Logic
{
    public class PluginDM : DatabaseDM<PluginDM, Plugin>
    {
        private QueryBuilderPrepared<Plugin>? CreateIfNotExistQuery = null;

        public async Task<VoidWithError> RegisterPlugin(RayukiPlugin rayukiPlugin)
        {
            VoidWithError result = new VoidWithError();
            string? name = rayukiPlugin.GetType().Assembly.GetName().Name;
            Plugin plugin = new Plugin();
            plugin.Version = rayukiPlugin.Version();

            if (string.IsNullOrWhiteSpace(name))
            {
                result.Errors.Add(new AppError(AppErrorCode.NoName, "The name " + name + " isn't a valid name."));
            }
            else
            {
                plugin.Name = name;
            }


            if (!result.Success)
            {
                return result;
            }

            result = await CreateIfNotExist(plugin);


            return result;
        }
        public async Task<VoidWithError> CreateIfNotExist(Plugin plugin)
        {
            VoidWithError result = new();
            if (CreateIfNotExistQuery == null)
            {
                CreateIfNotExistQuery = CreateQuery<Plugin>().WhereWithParameters(a => a.Name == plugin.Name);
            }
            ResultWithError<Plugin> queryResult = await CreateIfNotExistQuery.New().Prepare(plugin).SingleWithError();
            if (!queryResult.Success && queryResult.Errors.Count > 0)
            {
                result.Errors.AddRange(queryResult.Errors);
                return result;
            }
            if (queryResult.Result != null)
            {
                if (queryResult.Result.Version != plugin.Version)
                {
                    queryResult.Result.Version = plugin.Version;
                    await result.RunAsync(() => UpdateWithError(queryResult.Result));
                }
            }
            else
            {
                await result.RunAsync(() => CreateWithError(plugin));
            }
            return result;
        }
    }
}
