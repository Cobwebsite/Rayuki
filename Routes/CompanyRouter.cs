using AventusSharp.Routes.Attributes;
using AventusSharp.Tools;
using Core.Data;
using Core.Logic;
using AventusSharp.Routes;

namespace Core.Routes
{
    [Prefix("Core")]
    public class CompanyRouter : Router
    {
        public async Task<Company> GetMain()
        {
            return await CompanyDM.GetInstance().GetMain();
        }

        [Put]
        public virtual async Task<ResultWithError<Company>> Update(Company item)
        {
            ResultWithError<Company> result = await Company.UpdateWithError(item);
            return result;
        }

        public Manifest? ReadManifest()
        {
            return CompanyDM.GetInstance().ReadManifest();
        }

        [Post]
        public async Task SaveManifest(Manifest manifest)
        {
            await CompanyDM.GetInstance().SaveManifest(manifest);
        }
    }
}
