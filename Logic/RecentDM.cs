using AventusSharp.Data.Manager;
using AventusSharp.Data.Manager.DB;
using AventusSharp.Tools;
using Core.App;
using Core.Data;

namespace Core.Logic;

public enum RecentParameters
{
    Number,
}

public class RecentDM : DatabaseDM<RecentDM, Recent>
{

    protected QueryBuilderPrepared<Recent>? getAllForUserQuery;
    public async Task<ResultWithError<List<Recent>>> GetAllForUser(int? userId)
    {
        if (userId == null)
        {
            return new();
        }

        int id = (int)userId;
        if (getAllForUserQuery == null)
        {
            getAllForUserQuery = CreateQuery<Recent>().WhereWithParameters(p => p.UserId == id);
        }
        return await getAllForUserQuery.New().Prepare(id).RunWithError();
    }


    protected override async Task<List<GenericError>> AfterCreateWithError<X>(List<X> values, ResultWithError<List<X>> result)
    {
        List<GenericError> errors = await base.AfterCreateWithError(values, result);
        List<int> ids = values.GroupBy(x => x.UserId).Select(p => p.Key).ToList();
        foreach (int id in ids)
        {
            errors.AddRange((await LimitTo(id)).Errors);
        }
        return errors;
    }

    private int NbRecents { get; set; } = 20;
    public async Task Load()
    {
        var settings = await SettingsDM.GetInstance().GetGlobalSettingsInt(RecentParameters.Number, 20);
        if (settings.Success)
        {
            NbRecents = settings.Result;
        }
    }

    public async Task<VoidWithError> ChangeRecentParametersNumber(int nb)
    {
        VoidWithError result = new();
        await result.RunAsync(() => SettingsDM.GetInstance().SaveGlobalSettingsInt(RecentParameters.Number, nb));
        if (result.Success)
        {
            NbRecents = nb;
        }
        return result;
    }

    protected async Task<VoidWithError> LimitTo(int userId)
    {
        VoidWithError result = new();
        ResultWithError<List<Recent>> query = await Recent
                                                    .StartQuery()
                                                    .Field(p => p.Id)
                                                    .Where(p => p.UserId == userId)
                                                    .Sort(p => p.Datetime, Sort.DESC)
                                                    .Offset(NbRecents)
                                                    .RunWithError();

        if (query.Success && query.Result != null)
        {
            await result.RunAsync(() => Recent.DeleteWithError(query.Result));
        }
        else
        {
            result.Errors = query.Errors;
        }
        return result;
    }

    public async Task<ResultWithError<Recent>> SaveWithError(Recent recent)
    {
        ResultWithError<Recent> result = new();
        ResultWithError<Recent> query = await Recent
                            .StartQuery()
                            .Where(p => p.UserId == recent.UserId && p.Name == recent.Name && p.TagName == recent.TagName)
                            .SingleWithError();
        if (!query.Success)
        {
            return query;
        }
        if (query.Result == null)
        {
            List<GenericError> errors = await recent.CreateWithError();
            result.Errors = errors;
            if (result.Success) result.Result = recent;
        }
        else
        {
            query.Result.Datetime = recent.Datetime;
            List<GenericError> errors = await query.Result.UpdateWithError();
            if (result.Success) result.Result = query.Result;
        }
        return result;
    }
}