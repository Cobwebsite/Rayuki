﻿using AventusSharp.Data;
using AventusSharp.Data.Attributes;
using Core.Data.DataTypes;
using Core.Data.Validators;
using Core.Logic;

namespace Core.Data
{
    public class User : Storable<User>
    {
        public string Firstname { get; set; } = "";
        public string Lastname { get; set; } = "";

        [Unique("Ce nom d'utilisateur est déjà pris")]
        public string Username { get; set; } = "";

        [Size(1, SizeEnum.Text), ValidatePassword]
        public string Password { get; set; } = "";
        public string Token { get; set; } = "";
        public ImageFile Picture { get; set; } = new ImageFile();
        public bool IsSuperAdmin { get; set; } = false;

        public bool Can(Enum value, string additionalInfo)
        {
            return PermissionDM.GetInstance().Can(Id, value, additionalInfo, IsSuperAdmin);
        }

        public Settings? GetSettings(Enum @enum) {
            return SettingsDM.GetInstance().GetSettingsForUser(@enum, Id).Result;
        }
    }
}
