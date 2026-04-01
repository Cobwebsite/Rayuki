using AventusSharp.Data;
using AventusSharp.Data.Manager.DB;
using AventusSharp.Tools;
using AventusSharp.Tools.Attributes;
using AventusSharp.WebSocket;
using Core.App;
using Core.Data;
using Core.Logic.FileSystem;
using Core.Permissions;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using static System.Net.Mime.MediaTypeNames;

namespace Core.Logic
{


    public class DesktopDM : DatabaseDM<DesktopDM, Desktop>
    {
        private Dictionary<int, List<ApplicationOpen>> openApplications = new Dictionary<int, List<ApplicationOpen>>();

        protected async override Task<VoidWithError> Initialize()
        {
            VoidWithError result = await base.Initialize();
            await CreateDefaultDesktop();
            return result;
        }

        private async Task CreateDefaultDesktop()
        {
            List<Desktop> desktops = await Desktop.Where(p => p.UserId == null);
            if (desktops.Count == 0)
            {
                await new Desktop()
                {
                    Name = "Bureau par défault",
                    UserId = null,
                }.Create();
            }
        }

        protected string GetPictureDirPath(Desktop desktop)
        {
            return Path.Combine(FileStorage.rootFolder, "Core", "desktops", desktop.Token);
        }

        private async Task<ResultWithError<Desktop>> CreateDesktopForUser(int userId)
        {
            ResultWithError<Desktop> result = new();
            List<Desktop> desktops = await Desktop.Where(p => p.UserId == null);
            if (desktops.Count > 0)
            {
                ResultWithError<User> userQuery = await User.GetByIdWithError(userId);
                if(!userQuery.Success || userQuery.Result == null) {
                    result.Errors = userQuery.Errors;
                    return result;
                }
                User u = userQuery.Result;
                Desktop d = new Desktop()
                {
                    UserId = u.Id,
                    Name = "Bureau " + u.Firstname + " " + u.Lastname,
                    Configuration = new DekstopConfiguration()
                };
                List<GenericError> errors = await d.CreateWithError();
                if (errors.Count > 0)
                {
                    result.Errors = errors;
                    return result;
                }

                result.Result = d;
            }
            else
            {
                result.Errors.Add(new DesktopError(DesktopErrorCode.NoDefaultDesktop, "No default desktop found"));
            }
            return result;
        }

        public List<ApplicationOpen> GetOpenApps(int id)
        {
            List<ApplicationOpen> result = new List<ApplicationOpen>();
            if (openApplications.ContainsKey(id))
            {
                result = openApplications[id];
            }
            return result;
        }

        public async Task<List<DesktopAppIcon>> GetDesktopIcons(int id)
        {
            List<DesktopAppIcon> result = (await DesktopAppIcon.Where(p => p.DesktopId == id)).OrderBy(p => p.Position).ToList();
            return result;

        }

        public void RegisterOpenApp(int id, ApplicationOpen app)
        {
            if (!openApplications.ContainsKey(id))
            {
                openApplications[id] = new List<ApplicationOpen>();
            }
            bool mustAdd = true;
            for (int i = 0; i < openApplications[id].Count; i++)
            {
                ApplicationOpen current = openApplications[id][i];
                if (current.id == app.id)
                {
                    openApplications[id][i] = app;
                    mustAdd = false;
                    break;
                }
            }
            if (mustAdd)
            {
                openApplications[id].Add(app);
            }
        }

        public void RemoveApp(int id, ApplicationOpen app)
        {
            if (!openApplications.ContainsKey(id))
            {
                return;
            }
            for (int i = 0; i < openApplications[id].Count; i++)
            {
                ApplicationOpen current = openApplications[id][i];
                if (current.id == app.id)
                {
                    openApplications[id].RemoveAt(i);
                    if (openApplications[id].Count == 0)
                    {
                        openApplications.Remove(id);
                    }
                    return;
                }
            }

        }
        public async Task<ResultWithError<List<Desktop>>> GetAllByUser(int? id)
        {
            ResultWithError<List<Desktop>> result = new();
            if (id == null)
            {
                return result;
            }
            ResultWithError<List<Desktop>> resultWithData = await Desktop.WhereWithError(p => p.UserId == id);
            if (!resultWithData.Success || resultWithData.Result?.Count > 0)
            {
                result.Errors = resultWithData.Errors.Select(p => (GenericError)p).ToList();
                result.Result = resultWithData.Result;
                return result;
            }

            ResultWithError<Desktop> resultNewDesktop = await CreateDesktopForUser((int)id);
            result.Errors = resultNewDesktop.Errors;
            if (resultNewDesktop.Result != null)
            {
                result.Result = new List<Desktop>() { resultNewDesktop.Result };
            }
            return result;
        }


        protected override async Task<List<GenericError>> BeforeCreateWithError<X>(List<X> values)
        {
            List<GenericError> result = await base.BeforeCreateWithError(values);
            foreach (X value in values)
            {
                value.Token = Guid.NewGuid().ToString().Replace("-", "");
            }
            return result;
        }


        protected override async Task<List<GenericError>> BeforeUpdateWithError<X>(List<X> values)
        {
            List<GenericError> result = await base.BeforeUpdateWithError(values);
            foreach (X value in values)
            {
                if (!value.Configuration.SyncDesktop && openApplications.ContainsKey(value.Id))
                {
                    openApplications.Remove(value.Id);
                }
            }
            return result;

        }
    }

    [Export("Errors")]
    public enum DesktopErrorCode
    {
        NoDefaultDesktop
    }

    [Export("Errors")]
    public class DesktopError : GenericError<DesktopErrorCode>
    {
        public DesktopError(DesktopErrorCode code, string message, [CallerFilePath] string callerPath = "", [CallerLineNumber] int callerNo = 0) : base(code, message, callerPath, callerNo)
        {
        }
    }
}
