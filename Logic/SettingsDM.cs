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

        private IQueryBuilder<Settings>? _GetSettingsForUser;

        #region Get for user

        #region Get Default
        public ResultWithError<Settings> GetSettingsForUser(Enum _enum, HttpContext context)
        {
            int? userId = context.GetUserId();
            if (userId != null)
            {
                return GetSettingsForUser(_enum, (int)userId);
            }
            ResultWithError<Settings> result = new();
            result.Errors.Add(new CoreError(CoreErrorCode.NotLogin, "No user found"));
            return result;
        }
        public ResultWithError<Settings> GetSettingsForUser(Enum _enum, User user)
        {
            return GetSettingsForUser(_enum, user.Id);
        }
        public ResultWithError<Settings> GetSettingsForUser(Enum _enum, int idUser)
        {
            string Key = _enum.GetFullName();
            if (_GetSettingsForUser == null)
            {
                _GetSettingsForUser = _instance.CreateQuery<Settings>().WhereWithParameters(p => p.Key == Key && p.UserId == idUser);
            }
            _GetSettingsForUser.Prepare(Key, idUser);
            return _GetSettingsForUser.SingleWithError();
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
        public ResultWithError<string> GetSettingsStringForUser(Enum _enum, HttpContext context)
        {
            return ParseToString(GetSettingsForUser(_enum, context));
        }
        public ResultWithError<string> GetSettingsStringForUser(Enum _enum, User user)
        {
            return ParseToString(GetSettingsForUser(_enum, user));
        }
        public ResultWithError<string> GetSettingsStringForUser(Enum _enum, int idUser)
        {
            return ParseToString(GetSettingsForUser(_enum, idUser));
        }

        #endregion


        #region Get int
        protected ResultWithError<int> ParseToInt(ResultWithError<Settings> result)
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
            else
            {
                CoreError error = new CoreError(CoreErrorCode.ConversionFailed, "Can't parse to int");
                converted.Errors.Add(error);
            }
            return converted;
        }
        public ResultWithError<int> GetSettingsIntForUser(Enum _enum, HttpContext context)
        {
            return ParseToInt(GetSettingsForUser(_enum, context));
        }
        public ResultWithError<int> GetSettingsIntForUser(Enum _enum, User user)
        {
            return ParseToInt(GetSettingsForUser(_enum, user));
        }
        public ResultWithError<int> GetSettingsIntForUser(Enum _enum, int idUser)
        {
            return ParseToInt(GetSettingsForUser(_enum, idUser));
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
        public ResultWithError<bool> GetSettingsBoolForUser(Enum _enum, HttpContext context)
        {
            return ParseToBool(GetSettingsForUser(_enum, context));
        }
        public ResultWithError<bool> GetSettingsBoolForUser(Enum _enum, User user)
        {
            return ParseToBool(GetSettingsForUser(_enum, user));
        }
        public ResultWithError<bool> GetSettingsBoolForUser(Enum _enum, int idUser)
        {
            return ParseToBool(GetSettingsForUser(_enum, idUser));
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
        public ResultWithError<DateTime> GetSettingsDateForUser(Enum _enum, HttpContext context)
        {
            return ParseToDate(GetSettingsForUser(_enum, context));
        }
        public ResultWithError<DateTime> GetSettingsDateForUser(Enum _enum, User user)
        {
            return ParseToDate(GetSettingsForUser(_enum, user));
        }
        public ResultWithError<DateTime> GetSettingsDateForUser(Enum _enum, int idUser)
        {
            return ParseToDate(GetSettingsForUser(_enum, idUser));
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
        public ResultWithError<float> GetSettingsFloatForUser(Enum _enum, HttpContext context)
        {
            return ParseToFloat(GetSettingsForUser(_enum, context));
        }
        public ResultWithError<float> GetSettingsFloatForUser(Enum _enum, User user)
        {
            return ParseToFloat(GetSettingsForUser(_enum, user));
        }
        public ResultWithError<float> GetSettingsFloatForUser(Enum _enum, int idUser)
        {
            return ParseToFloat(GetSettingsForUser(_enum, idUser));
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
        public ResultWithError<double> GetSettingsDoubleForUser(Enum _enum, HttpContext context)
        {
            return ParseToDouble(GetSettingsForUser(_enum, context));
        }
        public ResultWithError<double> GetSettingsDoubleForUser(Enum _enum, User user)
        {
            return ParseToDouble(GetSettingsForUser(_enum, user));
        }
        public ResultWithError<double> GetSettingsDoubleForUser(Enum _enum, int idUser)
        {
            return ParseToDouble(GetSettingsForUser(_enum, idUser));
        }
        #endregion

        #endregion

        #region Save for user

        #region save Default
        public ResultWithError<Settings> SaveSettingsForUser(Enum _enum, HttpContext context, string value)
        {
            int? userId = context.GetUserId();
            if (userId != null)
            {
                return SaveSettingsForUser(_enum, (int)userId, value);
            }
            ResultWithError<Settings> result = new();
            result.Errors.Add(new CoreError(CoreErrorCode.NotLogin, "No user found"));
            return result;
        }
        public ResultWithError<Settings> SaveSettingsForUser(Enum _enum, User user, string value)
        {
            return SaveSettingsForUser(_enum, user.Id, value);
        }
        public ResultWithError<Settings> SaveSettingsForUser(Enum _enum, int idUser, string value)
        {
            ResultWithError<Settings> resultTemp = GetSettingsForUser(_enum, idUser);
            if (!resultTemp.Success)
            {
                return resultTemp;
            }

            if (resultTemp.Result != null)
            {
                resultTemp.Result.Value = value;
                return _instance.UpdateWithError(resultTemp.Result);
            }

            string Key = _enum.GetFullName();
            Settings s = new Settings()
            {
                Key = Key,
                UserId = idUser,
                Value = value
            };
            return _instance.CreateWithError(s);
        }
        #endregion

        #region save string
        public ResultWithError<string> SaveSettingsStringForUser(Enum _enum, HttpContext context, string value)
        {
            return ParseToString(SaveSettingsForUser(_enum, context, value.ToString()));
        }
        public ResultWithError<string> SaveSettingsStringForUser(Enum _enum, User user, string value)
        {
            return ParseToString(SaveSettingsForUser(_enum, user, value));
        }
        public ResultWithError<string> SaveSettingsStringForUser(Enum _enum, int idUser, string value)
        {
            return ParseToString(SaveSettingsForUser(_enum, idUser, value.ToString()));
        }
        #endregion


        #region save int
        public ResultWithError<int> SaveSettingsIntForUser(Enum _enum, HttpContext context, int value)
        {
            return ParseToInt(SaveSettingsForUser(_enum, context, value.ToString()));
        }
        public ResultWithError<int> SaveSettingsIntForUser(Enum _enum, User user, int value)
        {
            return ParseToInt(SaveSettingsForUser(_enum, user, value.ToString()));
        }
        public ResultWithError<int> SaveSettingsIntForUser(Enum _enum, int idUser, int value)
        {
            return ParseToInt(SaveSettingsForUser(_enum, idUser, value.ToString()));
        }
        #endregion

        #region save bool
        public ResultWithError<bool> SaveSettingsBoolForUser(Enum _enum, HttpContext context, bool value)
        {
            return ParseToBool(SaveSettingsForUser(_enum, context, value.ToString()));
        }
        public ResultWithError<bool> SaveSettingsBoolForUser(Enum _enum, User user, bool value)
        {
            return ParseToBool(SaveSettingsForUser(_enum, user, value.ToString()));
        }
        public ResultWithError<bool> SaveSettingsBoolForUser(Enum _enum, int idUser, bool value)
        {
            return ParseToBool(SaveSettingsForUser(_enum, idUser, value.ToString()));
        }
        #endregion

        #region save date
        public ResultWithError<DateTime> SaveSettingsDateForUser(Enum _enum, HttpContext context, DateTime value)
        {
            return ParseToDate(SaveSettingsForUser(_enum, context, value.ToString()));
        }
        public ResultWithError<DateTime> SaveSettingsDateForUser(Enum _enum, User user, DateTime value)
        {
            return ParseToDate(SaveSettingsForUser(_enum, user, value.ToString()));
        }
        public ResultWithError<DateTime> SaveSettingsDateForUser(Enum _enum, int idUser, DateTime value)
        {
            return ParseToDate(SaveSettingsForUser(_enum, idUser, value.ToString()));
        }
        #endregion

        #region save float
        public ResultWithError<float> SaveSettingsFloatForUser(Enum _enum, HttpContext context, float value)
        {
            return ParseToFloat(SaveSettingsForUser(_enum, context, value.ToString()));
        }
        public ResultWithError<float> SaveSettingsFloatForUser(Enum _enum, User user, float value)
        {
            return ParseToFloat(SaveSettingsForUser(_enum, user, value.ToString()));
        }
        public ResultWithError<float> SaveSettingsFloatForUser(Enum _enum, int idUser, float value)
        {
            return ParseToFloat(SaveSettingsForUser(_enum, idUser, value.ToString()));
        }
        #endregion

        #region save double
        public ResultWithError<double> SaveSettingsDoubleForUser(Enum _enum, HttpContext context, double value)
        {
            return ParseToDouble(SaveSettingsForUser(_enum, context, value.ToString()));
        }
        public ResultWithError<double> SaveSettingsDoubleForUser(Enum _enum, User user, double value)
        {
            return ParseToDouble(SaveSettingsForUser(_enum, user, value.ToString()));
        }
        public ResultWithError<double> SaveSettingsDoubleForUser(Enum _enum, int idUser, double value)
        {
            return ParseToDouble(SaveSettingsForUser(_enum, idUser, value.ToString()));
        }
        #endregion

        #endregion

        #region Get global
        private IQueryBuilder<Settings>? _GetGlobalSettings;
        public ResultWithError<Settings> GetGlobalSettings(Enum _enum)
        {
            string Key = _enum.GetFullName();
            if (_GetGlobalSettings == null)
            {
                _GetGlobalSettings = _instance.CreateQuery<Settings>().WhereWithParameters(p => p.Key == Key && p.UserId == null);
            }
            _GetGlobalSettings.Prepare(Key);
            return _GetGlobalSettings.SingleWithError();
        }

        public ResultWithError<int> GetGlobalSettingsInt(Enum _enum)
        {
            return ParseToInt(GetGlobalSettings(_enum));
        }
        public ResultWithError<double> GetGlobalSettingsDouble(Enum _enum)
        {
            return ParseToDouble(GetGlobalSettings(_enum));
        }
        public ResultWithError<float> GetGlobalSettingsFloat(Enum _enum)
        {
            return ParseToFloat(GetGlobalSettings(_enum));
        }
        public ResultWithError<bool> GetGlobalSettingsBool(Enum _enum)
        {
            return ParseToBool(GetGlobalSettings(_enum));
        }
        public ResultWithError<DateTime> GetGlobalSettingsDate(Enum _enum)
        {
            return ParseToDate(GetGlobalSettings(_enum));
        }
        #endregion

        #region save globale
        public ResultWithError<Settings> SaveGlobalSettings(Enum _enum, string value)
        {
            ResultWithError<Settings> resultTemp = GetGlobalSettings(_enum);
            if (!resultTemp.Success)
            {
                return resultTemp;
            }

            if (resultTemp.Result != null)
            {
                resultTemp.Result.Value = value;
                return _instance.UpdateWithError(resultTemp.Result);
            }

            string Key = _enum.GetFullName();
            Settings s = new Settings()
            {
                Key = Key,
                UserId = null,
                Value = value
            };
            return _instance.CreateWithError(s);
        }
        public ResultWithError<bool> SaveGlobalSettingsBool(Enum _enum, bool value)
        {
            return ParseToBool(SaveGlobalSettings(_enum, value.ToString()));
        }
        public ResultWithError<int> SaveGlobalSettingsInt(Enum _enum, int value)
        {
            return ParseToInt(SaveGlobalSettings(_enum, value.ToString()));
        }
        public ResultWithError<DateTime> SaveGlobalSettingsDate(Enum _enum, DateTime value)
        {
            return ParseToDate(SaveGlobalSettings(_enum, value.ToString()));
        }
        public ResultWithError<float> SaveGlobalSettingsFloat(Enum _enum, float value)
        {
            return ParseToFloat(SaveGlobalSettings(_enum, value.ToString()));
        }
        public ResultWithError<double> SaveGlobalSettingsDouble(Enum _enum, double value)
        {
            return ParseToDouble(SaveGlobalSettings(_enum, value.ToString()));
        }
        #endregion

        #region Delete for user
        private IDeleteBuilder<Settings>? _DeleteAllSettingsForUser;
        private IDeleteBuilder<Settings>? _DeleteSettingsForUser;
        public ResultWithError<List<Settings>> DeleteSettingsForUser(Enum _enum, HttpContext context)
        {
            int? userId = context.GetUserId();
            if (userId != null)
            {
                return DeleteSettingsForUser(_enum, (int)userId);
            }
            ResultWithError<List<Settings>> result = new();
            result.Errors.Add(new CoreError(CoreErrorCode.NotLogin, "No user found"));
            return result;
        }
        public ResultWithError<List<Settings>> DeleteSettingsForUser(Enum _enum, User user)
        {
            return DeleteSettingsForUser(_enum, user.Id);
        }
        public ResultWithError<List<Settings>> DeleteSettingsForUser(Enum _enum, int idUser)
        {
            string Key = _enum.GetFullName();
            if (_DeleteSettingsForUser == null)
            {
                _DeleteSettingsForUser = _instance.CreateDelete<Settings>().WhereWithParameters(p => p.Key == Key && p.UserId == idUser);
            }
            _DeleteSettingsForUser.Prepare(Key, idUser);
            return _DeleteSettingsForUser.RunWithError();
        }

        public ResultWithError<List<Settings>> DeleteAllSettingsForUser(HttpContext context)
        {
            int? userId = context.GetUserId();
            if (userId != null)
            {
                return DeleteAllSettingsForUser((int)userId);
            }
            ResultWithError<List<Settings>> result = new();
            result.Errors.Add(new CoreError(CoreErrorCode.NotLogin, "No user found"));
            return result;
        }
        public ResultWithError<List<Settings>> DeleteAllSettingsForUser(User user)
        {
            return DeleteAllSettingsForUser(user.Id);
        }
        public ResultWithError<List<Settings>> DeleteAllSettingsForUser(int idUser)
        {
            if (_DeleteAllSettingsForUser == null)
            {
                _DeleteAllSettingsForUser = _instance.CreateDelete<Settings>().WhereWithParameters(p => p.UserId == idUser);
            }
            _DeleteAllSettingsForUser.Prepare(idUser);
            return _DeleteAllSettingsForUser.RunWithError();
        }

        #endregion
    }


    internal class _SettingsDM : DatabaseDM<_SettingsDM, Settings> { }
}
