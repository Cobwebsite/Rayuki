using AventusSharp.Data.Manager;
using AventusSharp.Data.Manager.DB;
using AventusSharp.Tools;
using Core.Data;

namespace Core.Logic;


public class FavoriteDM : DatabaseDM<FavoriteDM, Favorite>
{

    protected QueryBuilderPrepared<Favorite>? getAllForUserQuery;
    public ResultWithError<List<Favorite>> GetAllForUser(int? userId)
    {
        if (userId == null)
        {
            return new();
        }

        int id = (int)userId;
        if (getAllForUserQuery == null)
        {
            getAllForUserQuery = CreateQuery<Favorite>().WhereWithParameters(p => p.UserId == id);
        }
        return getAllForUserQuery.New().Prepare(id).RunWithError();
    }
}