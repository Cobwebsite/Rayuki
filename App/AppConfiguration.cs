using AventusSharp.Tools.Attributes;

namespace Core.App
{
    [Typescript(_internal:true)]
    public class AppConfiguration
    {
        public List<string> appsInstalled;

        public Dictionary<string, List<string>> allApps = new Dictionary<string, List<string>>();

        public AppConfiguration()
        {
            appsInstalled = AppManager.GetAppsDlls().Select(a => a.GetName().Name ?? "").ToList();

            string[] dirs = Directory.GetDirectories("D:\\Rayuki\\Apps");
            allApps = new Dictionary<string, List<string>>();
            foreach (string dir in dirs)
            {
                string company = dir.Split(Path.DirectorySeparatorChar).Last();
                if(company.StartsWith("."))
                {
                    continue;
                }
                if(company == "DefaultApp")
                {
                    continue;
                }
                allApps[company] = new List<string>();

                string[] dirsApp = Directory.GetDirectories(dir);
                foreach (string dirApp in dirsApp)
                {
                    string app = dirApp.Split(Path.DirectorySeparatorChar).Last();
                    if (app.StartsWith("."))
                    {
                        continue;
                    }
                    allApps[company].Add(app);
                }
            }
        }
    }
}
