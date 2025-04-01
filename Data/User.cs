using AventusSharp.Data;
using AventusSharp.Data.Attributes;
using AventusSharp.Tools.Attributes;
using Core.Data.DataTypes;
using Core.Data.Validators;
using Core.Logic;
using Core.Logic.FileSystem;

namespace Core.Data
{
    public class User : Storable<User>
    {
        public string Firstname { get; set; } = "";
        public string Lastname { get; set; } = "";

        [Unique("Ce nom d'utilisateur est déjà pris")]
        public string Username { get; set; } = "";

        [Size(1, SizeEnum.Text), ValidatePassword]
        public string? Password { get; set; }
        
        [Unique]
        public string Token { get; set; } = "";
        public UserPicture Picture { get; set; } = new UserPicture();

        [AtLeast(1, true)]
        public bool IsSuperAdmin { get; set; } = false;

        [ForeignKey<SsoProvider>]
        public int? SsoProviderId { get; set; }

        [Unique]
        public string? QuickToken { get; set; }

        public bool Can(Enum value, string additionalInfo)
        {
            return PermissionDM.GetInstance().Can(Id, value, additionalInfo, IsSuperAdmin);
        }

        public Settings? GetSettings(Enum @enum)
        {
            return SettingsDM.GetInstance().GetSettingsForUser(@enum, Id).Result;
        }
    }

    [Export]
    public class UserPicture : ImageFile<User>
    {
        protected override string DefineDirectory(User user)
        {
            return Path.Combine(FileStorage.rootFolder, "Core", "users", user.Token);
        }

        protected override ImageSize? DefineMaxSize()
        {
            return ImageSize.Size(1200);
        }

        protected override FileStorage? DefineStorage(User user)
        {
            return FileStorage.GetCore();
        }
    }
}
