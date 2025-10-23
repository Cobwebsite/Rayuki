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
    public ResultWithError<List<Recent>> GetAllForUser(int? userId)
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
        return getAllForUserQuery.New().Prepare(id).RunWithError();
    }


    protected override List<GenericError> AfterCreateWithError<X>(List<X> values, ResultWithError<List<X>> result)
    {
        List<GenericError> errors = base.AfterCreateWithError(values, result);
        List<int> ids = values.GroupBy(x => x.UserId).Select(p => p.Key).ToList();
        foreach (int id in ids)
        {
            errors.AddRange(LimitTo(id).Errors);
        }
        return errors;
    }

    private int NbRecents { get; set; } = 20;
    public void Load()
    {
        var settings = SettingsDM.GetInstance().GetGlobalSettingsInt(RecentParameters.Number, 20);
        if (settings.Success)
        {
            NbRecents = settings.Result;
        }
    }

    public VoidWithError ChangeRecentParametersNumber(int nb)
    {
        VoidWithError result = new();
        result.Run(() => SettingsDM.GetInstance().SaveGlobalSettingsInt(RecentParameters.Number, nb));
        if (result.Success)
        {
            NbRecents = nb;
        }
        return result;
    }

    protected VoidWithError LimitTo(int userId)
    {
        VoidWithError result = new();
        ResultWithError<List<Recent>> query = Recent
                                                    .StartQuery()
                                                    .Field(p => p.Id)
                                                    .Where(p => p.UserId == userId)
                                                    .Sort(p => p.Datetime, Sort.DESC)
                                                    .Offset(NbRecents)
                                                    .RunWithError();

        if (query.Success && query.Result != null)
        {
            result.Run(() => Recent.DeleteWithError(query.Result));
        }
        else
        {
            result.Errors = query.Errors;
        }
        return result;
    }

    public ResultWithError<Recent> SaveWithError(Recent recent)
    {
        ResultWithError<Recent> result = new();
        ResultWithError<Recent> query = Recent
                            .StartQuery()
                            .Where(p => p.UserId == recent.UserId && p.Name == recent.Name && p.TagName == recent.TagName)
                            .SingleWithError();
        if (!query.Success)
        {
            return query;
        }
        if (query.Result == null)
        {
            List<GenericError> errors = recent.CreateWithError();
            result.Errors = errors;
            if (result.Success) result.Result = recent;
        }
        else
        {
            query.Result.Datetime = recent.Datetime;
            List<GenericError> errors = query.Result.UpdateWithError();
            if (result.Success) result.Result = query.Result;
        }
        return result;
    }
}