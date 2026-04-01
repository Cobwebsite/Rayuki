using AventusSharp.Data;
using AventusSharp.Data.Manager;
using AventusSharp.Data.Manager.DB;
using AventusSharp.Tools;
using Core.App;
using Core.Data;
using Core.Tools;
using Microsoft.VisualStudio.Shell.Interop;
using Scriban.Parsing;

namespace Core.Logic
{
    public class SettingsDM
    {
        private static SettingsDM? instance;

        public static SettingsDM GetInstance()
        {
            if (instance == null)
            {
                instance = new SettingsDM();
            }
            return instance;
        }

        private _SettingsDM _instance;
        private SettingsDM()
        {
            _instance = _SettingsDM.GetInstance();
        }

        private QueryBuilderPrepared<Settings>? _GetSettingsForUser;

        #region Get for user

        #region Get Default
        public async Task<ResultWithError<Settings>> GetSettingsForUser(Enum _enum, HttpContext context)
        {
            int? userId = context.GetUserId();
            if (userId != null)
            {
                return await GetSettingsForUser(_enum, (int)userId);
            }
            ResultWithError<Settings> result = new();
            result.Errors.Add(new CoreError(CoreErrorCode.NotLogin, "No user found"));
            return result;
        }
        public async Task<ResultWithError<Settings>> GetSettingsForUser(Enum _enum, User user)
        {
            return await GetSettingsForUser(_enum, user.Id);
        }
        public async Task<ResultWithError<Settings>> GetSettingsForUser(Enum _enum, int idUser)
        {
            string Key = _enum.GetFullName();
            if (_GetSettingsForUser == null)
            {
                _GetSettingsForUser = _instance.CreateQuery<Settings>().WhereWithParameters(p => p.Key == Key && p.UserId == idUser);
            }
            return await _GetSettingsForUser.New().Prepare(Key, idUser).SingleWithError();
        }
        #endregion

        #region Get String
        protected ResultWithError<string> ParseToString(ResultWithError<Settings> result)
        {
            ResultWithError<string> converted = new ResultWithError<string>
            {
                Errors = result.Errors
            };
            if (!converted.Success || result.Result == null) return converted;
            converted.Result = result.Result.Value;
            return converted;
        }
        public async Task<ResultWithError<string>> GetSettingsStringForUser(Enum _enum, HttpContext context)
        {
            return ParseToString(await GetSettingsForUser(_enum, context));
        }
        public async Task<ResultWithError<string>> GetSettingsStringForUser(Enum _enum, User user)
        {
            return ParseToString(await GetSettingsForUser(_enum, user));
        }
        public async Task<ResultWithError<string>> GetSettingsStringForUser(Enum _enum, int idUser)
        {
            return ParseToString(await GetSettingsForUser(_enum, idUser));
        }

        #endregion


        #region Get int
        protected ResultWithError<int> ParseToInt(ResultWithError<Settings> result, int? defaultValue = null)
        {
            ResultWithError<int> converted = new ResultWithError<int>
            {
                Errors = result.Errors
            };
            if (!converted.Success || result.Result == null) return converted;

            int nb;
            if (int.TryParse(result.Result.Value, out nb))
            {
                converted.Result = nb;
            }
            else if (defaultValue == null)
            {
                CoreError error = new CoreError(CoreErrorCode.ConversionFailed, "Can't parse to int");
                converted.Errors.Add(error);
            }
            else
            {
                converted.Result = (int)defaultValue;
            }
            return converted;
        }
        public async Task<ResultWithError<int>> GetSettingsIntForUser(Enum _enum, HttpContext context, int? defaultValue = null)
        {
            return ParseToInt(await GetSettingsForUser(_enum, context), defaultValue);
        }
        public async Task<ResultWithError<int>> GetSettingsIntForUser(Enum _enum, User user, int? defaultValue = null)
        {
            return ParseToInt(await GetSettingsForUser(_enum, user), defaultValue);
        }
        public async Task<ResultWithError<int>> GetSettingsIntForUser(Enum _enum, int idUser, int? defaultValue = null)
        {
            return ParseToInt(await GetSettingsForUser(_enum, idUser), defaultValue);
        }

        #endregion

        #region Get bool
        protected ResultWithError<bool> ParseToBool(ResultWithError<Settings> result)
        {
            ResultWithError<bool> converted = new ResultWithError<bool>
            {
                Errors = result.Errors
            };
            if (!converted.Success || result.Result == null) return converted;

            bool nb;
            if (bool.TryParse(result.Result.Value, out nb))
            {
                converted.Result = nb;
            }
            else
            {
                CoreError error = new CoreError(CoreErrorCode.ConversionFailed, "Can't parse to bool");
                converted.Errors.Add(error);
            }
            return converted;
        }
        public async Task<ResultWithError<bool>> GetSettingsBoolForUser(Enum _enum, HttpContext context)
        {
            return ParseToBool(await GetSettingsForUser(_enum, context));
        }
        public async Task<ResultWithError<bool>> GetSettingsBoolForUser(Enum _enum, User user)
        {
            return ParseToBool(await GetSettingsForUser(_enum, user));
        }
        public async Task<ResultWithError<bool>> GetSettingsBoolForUser(Enum _enum, int idUser)
        {
            return ParseToBool(await GetSettingsForUser(_enum, idUser));
        }

        #endregion

        #region Get Date
        protected ResultWithError<DateTime> ParseToDate(ResultWithError<Settings> result)
        {
            ResultWithError<DateTime> converted = new ResultWithError<DateTime>
            {
                Errors = result.Errors
            };
            if (!converted.Success || result.Result == null) return converted;

            DateTime nb;
            if (DateTime.TryParse(result.Result.Value, out nb))
            {
                converted.Result = nb;
            }
            else
            {
                CoreError error = new CoreError(CoreErrorCode.ConversionFailed, "Can't parse to DateTime");
                converted.Errors.Add(error);
            }
            return converted;
        }
        public async Task<ResultWithError<DateTime>> GetSettingsDateForUser(Enum _enum, HttpContext context)
        {
            return ParseToDate(await GetSettingsForUser(_enum, context));
        }
        public async Task<ResultWithError<DateTime>> GetSettingsDateForUser(Enum _enum, User user)
        {
            return ParseToDate(await GetSettingsForUser(_enum, user));
        }
        public async Task<ResultWithError<DateTime>> GetSettingsDateForUser(Enum _enum, int idUser)
        {
            return ParseToDate(await GetSettingsForUser(_enum, idUser));
        }

        #endregion

        #region Get float
        protected ResultWithError<float> ParseToFloat(ResultWithError<Settings> result)
        {
            ResultWithError<float> converted = new ResultWithError<float>
            {
                Errors = result.Errors
            };
            if (!converted.Success || result.Result == null) return converted;

            float nb;
            if (float.TryParse(result.Result.Value, out nb))
            {
                converted.Result = nb;
            }
            else
            {
                CoreError error = new CoreError(CoreErrorCode.ConversionFailed, "Can't parse to DateTime");
                converted.Errors.Add(error);
            }
            return converted;
        }
        public async Task<ResultWithError<float>> GetSettingsFloatForUser(Enum _enum, HttpContext context)
        {
            return ParseToFloat(await GetSettingsForUser(_enum, context));
        }
        public async Task<ResultWithError<float>> GetSettingsFloatForUser(Enum _enum, User user)
        {
            return ParseToFloat(await GetSettingsForUser(_enum, user));
        }
        public async Task<ResultWithError<float>> GetSettingsFloatForUser(Enum _enum, int idUser)
        {
            return ParseToFloat(await GetSettingsForUser(_enum, idUser));
        }
        #endregion

        #region Get double
        protected ResultWithError<double> ParseToDouble(ResultWithError<Settings> result)
        {
            ResultWithError<double> converted = new ResultWithError<double>
            {
                Errors = result.Errors
            };
            if (!converted.Success || result.Result == null) return converted;

            double nb;
            if (double.TryParse(result.Result.Value, out nb))
            {
                converted.Result = nb;
            }
            else
            {
                CoreError error = new CoreError(CoreErrorCode.ConversionFailed, "Can't parse to DateTime");
                converted.Errors.Add(error);
            }
            return converted;
        }
        public async Task<ResultWithError<double>> GetSettingsDoubleForUser(Enum _enum, HttpContext context)
        {
            return ParseToDouble(await GetSettingsForUser(_enum, context));
        }
        public async Task<ResultWithError<double>> GetSettingsDoubleForUser(Enum _enum, User user)
        {
            return ParseToDouble(await GetSettingsForUser(_enum, user));
        }
        public async Task<ResultWithError<double>> GetSettingsDoubleForUser(Enum _enum, int idUser)
        {
            return ParseToDouble(await GetSettingsForUser(_enum, idUser));
        }
        #endregion

        #endregion

        #region Save for user

        #region save Default
        public async Task<ResultWithError<Settings>> SaveSettingsForUser(Enum _enum, HttpContext context, string value)
        {
            int? userId = context.GetUserId();
            if (userId != null)
            {
                return await SaveSettingsForUser(_enum, (int)userId, value);
            }
            ResultWithError<Settings> result = new();
            result.Errors.Add(new CoreError(CoreErrorCode.NotLogin, "No user found"));
            return result;
        }
        public async Task<ResultWithError<Settings>> SaveSettingsForUser(Enum _enum, User user, string value)
        {
            return await SaveSettingsForUser(_enum, user.Id, value);
        }
        public async Task<ResultWithError<Settings>> SaveSettingsForUser(Enum _enum, int idUser, string value)
        {
            ResultWithError<Settings> resultTemp = await GetSettingsForUser(_enum, idUser);
            if (!resultTemp.Success)
            {
                return resultTemp;
            }

            if (resultTemp.Result != null)
            {
                resultTemp.Result.Value = value;
                return await _instance.UpdateWithError(resultTemp.Result);
            }

            string Key = _enum.GetFullName();
            Settings s = new Settings()
            {
                Key = Key,
                UserId = idUser,
                Value = value
            };
            return await _instance.CreateWithError(s);
        }
        #endregion

        #region save string
        public async Task<ResultWithError<string>> SaveSettingsStringForUser(Enum _enum, HttpContext context, string value)
        {
            return ParseToString(await SaveSettingsForUser(_enum, context, value.ToString()));
        }
        public async Task<ResultWithError<string>> SaveSettingsStringForUser(Enum _enum, User user, string value)
        {
            return ParseToString(await SaveSettingsForUser(_enum, user, value));
        }
        public async Task<ResultWithError<string>> SaveSettingsStringForUser(Enum _enum, int idUser, string value)
        {
            return ParseToString(await SaveSettingsForUser(_enum, idUser, value.ToString()));
        }
        #endregion


        #region save int
        public async Task<ResultWithError<int>> SaveSettingsIntForUser(Enum _enum, HttpContext context, int value)
        {
            return ParseToInt(await SaveSettingsForUser(_enum, context, value.ToString()));
        }
        public async Task<ResultWithError<int>> SaveSettingsIntForUser(Enum _enum, User user, int value)
        {
            return ParseToInt(await SaveSettingsForUser(_enum, user, value.ToString()));
        }
        public async Task<ResultWithError<int>> SaveSettingsIntForUser(Enum _enum, int idUser, int value)
        {
            return ParseToInt(await SaveSettingsForUser(_enum, idUser, value.ToString()));
        }
        #endregion

        #region save bool
        public async Task<ResultWithError<bool>> SaveSettingsBoolForUser(Enum _enum, HttpContext context, bool value)
        {
            return ParseToBool(await SaveSettingsForUser(_enum, context, value.ToString()));
        }
        public async Task<ResultWithError<bool>> SaveSettingsBoolForUser(Enum _enum, User user, bool value)
        {
            return ParseToBool(await SaveSettingsForUser(_enum, user, value.ToString()));
        }
        public async Task<ResultWithError<bool>> SaveSettingsBoolForUser(Enum _enum, int idUser, bool value)
        {
            return ParseToBool(await SaveSettingsForUser(_enum, idUser, value.ToString()));
        }
        #endregion

        #region save date
        public async Task<ResultWithError<DateTime>> SaveSettingsDateForUser(Enum _enum, HttpContext context, DateTime value)
        {
            return ParseToDate(await SaveSettingsForUser(_enum, context, value.ToString()));
        }
        public async Task<ResultWithError<DateTime>> SaveSettingsDateForUser(Enum _enum, User user, DateTime value)
        {
            return ParseToDate(await SaveSettingsForUser(_enum, user, value.ToString()));
        }
        public async Task<ResultWithError<DateTime>> SaveSettingsDateForUser(Enum _enum, int idUser, DateTime value)
        {
            return ParseToDate(await SaveSettingsForUser(_enum, idUser, value.ToString()));
        }
        #endregion

        #region save float
        public async Task<ResultWithError<float>> SaveSettingsFloatForUser(Enum _enum, HttpContext context, float value)
        {
            return ParseToFloat(await SaveSettingsForUser(_enum, context, value.ToString()));
        }
        public async Task<ResultWithError<float>> SaveSettingsFloatForUser(Enum _enum, User user, float value)
        {
            return ParseToFloat(await SaveSettingsForUser(_enum, user, value.ToString()));
        }
        public async Task<ResultWithError<float>> SaveSettingsFloatForUser(Enum _enum, int idUser, float value)
        {
            return ParseToFloat(await SaveSettingsForUser(_enum, idUser, value.ToString()));
        }
        #endregion

        #region save double
        public async Task<ResultWithError<double>> SaveSettingsDoubleForUser(Enum _enum, HttpContext context, double value)
        {
            return ParseToDouble(await SaveSettingsForUser(_enum, context, value.ToString()));
        }
        public async Task<ResultWithError<double>> SaveSettingsDoubleForUser(Enum _enum, User user, double value)
        {
            return ParseToDouble(await SaveSettingsForUser(_enum, user, value.ToString()));
        }
        public async Task<ResultWithError<double>> SaveSettingsDoubleForUser(Enum _enum, int idUser, double value)
        {
            return ParseToDouble(await SaveSettingsForUser(_enum, idUser, value.ToString()));
        }
        #endregion

        #endregion

        #region Get global
        private QueryBuilderPrepared<Settings>? _GetGlobalSettings;
        public async Task<ResultWithError<Settings>> GetGlobalSettings(Enum _enum)
        {
            string Key = _enum.GetFullName();
            if (_GetGlobalSettings == null)
            {
                _GetGlobalSettings = _instance.CreateQuery<Settings>().WhereWithParameters(p => p.Key == Key && p.UserId == null);
            }
            return await _GetGlobalSettings.New().Prepare(Key).SingleWithError();
        }

        public async Task<ResultWithError<int>> GetGlobalSettingsInt(Enum _enum, int? defaultValue = null)
        {
            return ParseToInt(await GetGlobalSettings(_enum), defaultValue);
        }
        public async Task<ResultWithError<double>> GetGlobalSettingsDouble(Enum _enum)
        {
            return ParseToDouble(await GetGlobalSettings(_enum));
        }
        public async Task<ResultWithError<float>> GetGlobalSettingsFloat(Enum _enum)
        {
            return ParseToFloat(await GetGlobalSettings(_enum));
        }
        public async Task<ResultWithError<bool>> GetGlobalSettingsBool(Enum _enum)
        {
            return ParseToBool(await GetGlobalSettings(_enum));
        }
        public async Task<ResultWithError<DateTime>> GetGlobalSettingsDate(Enum _enum)
        {
            return ParseToDate(await GetGlobalSettings(_enum));
        }
        #endregion

        #region save globale
        public async Task<ResultWithError<Settings>> SaveGlobalSettings(Enum _enum, string value)
        {
            ResultWithError<Settings> resultTemp = await GetGlobalSettings(_enum);
            if (!resultTemp.Success)
            {
                return resultTemp;
            }

            if (resultTemp.Result != null)
            {
                resultTemp.Result.Value = value;
                return await _instance.UpdateWithError(resultTemp.Result);
            }

            string Key = _enum.GetFullName();
            Settings s = new Settings()
            {
                Key = Key,
                UserId = null,
                Value = value
            };
            return await _instance.CreateWithError(s);
        }
        public async Task<ResultWithError<bool>> SaveGlobalSettingsBool(Enum _enum, bool value)
        {
            return ParseToBool(await SaveGlobalSettings(_enum, value.ToString()));
        }
        public async Task<ResultWithError<int>> SaveGlobalSettingsInt(Enum _enum, int value)
        {
            return ParseToInt(await SaveGlobalSettings(_enum, value.ToString()));
        }
        public async Task<ResultWithError<DateTime>> SaveGlobalSettingsDate(Enum _enum, DateTime value)
        {
            return ParseToDate(await SaveGlobalSettings(_enum, value.ToString()));
        }
        public async Task<ResultWithError<float>> SaveGlobalSettingsFloat(Enum _enum, float value)
        {
            return ParseToFloat(await SaveGlobalSettings(_enum, value.ToString()));
        }
        public async Task<ResultWithError<double>> SaveGlobalSettingsDouble(Enum _enum, double value)
        {
            return ParseToDouble(await SaveGlobalSettings(_enum, value.ToString()));
        }
        #endregion

        #region Delete for user
        private DeleteBuilderPrepared<Settings>? _DeleteAllSettingsForUser;
        private DeleteBuilderPrepared<Settings>? _DeleteSettingsForUser;
        public async Task<ResultWithError<List<Settings>>> DeleteSettingsForUser(Enum _enum, HttpContext context)
        {
            int? userId = context.GetUserId();
            if (userId != null)
            {
                return await DeleteSettingsForUser(_enum, (int)userId);
            }
            ResultWithError<List<Settings>> result = new();
            result.Errors.Add(new CoreError(CoreErrorCode.NotLogin, "No user found"));
            return result;
        }
        public async Task<ResultWithError<List<Settings>>> DeleteSettingsForUser(Enum _enum, User user)
        {
            return await DeleteSettingsForUser(_enum, user.Id);
        }
        public async Task<ResultWithError<List<Settings>>> DeleteSettingsForUser(Enum _enum, int idUser)
        {
            string Key = _enum.GetFullName();
            if (_DeleteSettingsForUser == null)
            {
                _DeleteSettingsForUser = _instance.CreateDelete<Settings>().WhereWithParameters(p => p.Key == Key && p.UserId == idUser);
            }
            return await _DeleteSettingsForUser.New().Prepare(Key, idUser).RunWithError();
        }

        public async Task<ResultWithError<List<Settings>>> DeleteAllSettingsForUser(HttpContext context)
        {
            int? userId = context.GetUserId();
            if (userId != null)
            {
                return await DeleteAllSettingsForUser((int)userId);
            }
            ResultWithError<List<Settings>> result = new();
            result.Errors.Add(new CoreError(CoreErrorCode.NotLogin, "No user found"));
            return result;
        }
        public async Task<ResultWithError<List<Settings>>> DeleteAllSettingsForUser(User user)
        {
            return await DeleteAllSettingsForUser(user.Id);
        }
        public async Task<ResultWithError<List<Settings>>> DeleteAllSettingsForUser(int idUser)
        {
            if (_DeleteAllSettingsForUser == null)
            {
                _DeleteAllSettingsForUser = _instance.CreateDelete<Settings>().WhereWithParameters(p => p.UserId == idUser);
            }
            return await _DeleteAllSettingsForUser.New().Prepare(idUser).RunWithError();
        }

        #endregion
    }


    internal class _SettingsDM : DatabaseDM<_SettingsDM, Settings> { }
}
