using AventusSharp.Data;
using AventusSharp.Routes;
using AventusSharp.Tools;
using Core.App;
using Core.Data;
using Core.Logic;
using Core.Tools;
using Newtonsoft.Json;
using System;

namespace Core.Routes
{
    public class UserRouter : StorableRoute<User>
    {
        // public override ResultWithError<List<User>> GetAll(HttpContext context)
        // {
        //     return UserDM.GetInstance().WhereWithError(p => p.IsSuperAdmin == false);
        // }
        protected override ResultWithError<User> DM_Update(HttpContext context, User item)
        {
            return UserDM.GetInstance().UpdateBasicInfo(item);
        }


        protected override User OnSend(HttpContext context, User item)
        {
            item = JsonConvert.DeserializeObject<User>(JsonConvert.SerializeObject(item)) ?? item;
            item.Password = "";
            return base.OnSend(context, item);
        }


        public ResultWithError<User> GetConnected(HttpContext context)
        {
            return UserDM.GetInstance().GetConnected(context.GetUserId());
        }
    }
}
