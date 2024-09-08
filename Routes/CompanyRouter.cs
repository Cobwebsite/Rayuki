using AventusSharp.Routes.Attributes;
using AventusSharp.Tools;
using Core.Data;
using Core.Logic;
using Route = AventusSharp.Routes.Route;

namespace Core.Routes
{
    public class CompanyRouter : Route
    {
        public Company GetMain()
        {
            return CompanyDM.GetInstance().GetMain();
        }

        [Put]
        public virtual ResultWithError<Company> Update(Company item)
        {
            ResultWithError<Company> result = Company.UpdateWithError(item);
            return result;
        }

        public Manifest? ReadManifest()
        {
            return CompanyDM.GetInstance().ReadManifest();
        }

        [Post]
        public void SaveManifest(Manifest manifest)
        {
            CompanyDM.GetInstance().SaveManifest(manifest);
        }
    }
}
