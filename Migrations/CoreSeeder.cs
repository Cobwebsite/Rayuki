using AventusSharp.Tools;
using Core.Data;

namespace Core.Migrations;

public class CoreSeeder : Seeder
{
    private bool loadDev;
    private int loadingVersion = 0;

    public CoreSeeder()
    {
        loadDev = IsDev;
    }

    public bool DevOrVersion(int version)
    {
        if (IsDev) return loadDev;
        return version == loadingVersion;
    }

    protected override int DefineVersion()
    {
        return 1;
    }

    protected VoidWithError CreateGroupe(int version)
    {
        VoidWithError result = new VoidWithError();
        if (loadDev)
        {
            List<Group> items = new List<Group>() {
                    new Group() { Name = "Utilisateur", AssignationAuto = true },
                };
            result.Errors = Group.CreateWithError(items).Errors;
        }
        return result;
    }

    protected VoidWithError CreateDefaultAdmin()
    {
        VoidWithError result = new VoidWithError();
        if (!User.Exist(u => u.IsSuperAdmin))
        {
            DefaultUserConfig defaultUser = HttpServer.DefaultUser;
            new User()
            {
                Firstname = defaultUser.Firstname,
                Lastname = defaultUser.Lastname,
                Password = defaultUser.Password,
                Username = defaultUser.Username,
                IsSuperAdmin = true,
            }.Create();
        }
        return result;

    }

    protected override VoidWithError LoadVersion(int version)
    {
        loadingVersion = version;
        VoidWithError result = new VoidWithError()
            .Run(() => CreateGroupe(version))
            .Run(CreateDefaultAdmin);

        // load dev only once
        if (loadDev) loadDev = false;
        return result;
    }
}