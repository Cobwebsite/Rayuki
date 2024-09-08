
using AventusSharp.Data.Manager.DB;
using AventusSharp.Tools;
using Core.App;
using Core.Data;
using Core.Data.DataTypes;
using Core.Tools;
using Newtonsoft.Json;
using SkiaSharp;

namespace Core.Logic
{
    public class CompanyDM : DatabaseDM<CompanyDM, Company>
    {
        protected async override Task<VoidWithError> Initialize()
        {
            VoidWithError result = await base.Initialize();
            ResultWithError<bool> existQuery = Company.ExistWithError(p => true);
            if (!existQuery.Success)
            {
                result.Errors = existQuery.Errors;
                return result;
            }

            if (!existQuery.Result)
            {
                result.Run(() => new Company()
                {
                    Name = "Rayuki",
                    Logo = new ImageFile() { Uri = "/img/logo.svg" }
                }.CreateWithError());
            }

            return result;
        }

        protected override List<GenericError> BeforeUpdateWithError<X>(List<X> values)
        {
            List<GenericError> result = base.BeforeUpdateWithError(values);
            if (result.Count > 0) return result;

            foreach (X value in values)
            {
                if (value.Logo.Upload != null)
                {
                    ResultWithImageFileError<bool> isSvgResult = Image.IsSvg(value.Logo.Upload.FilePath);
                    if (!isSvgResult.Success)
                    {
                        return isSvgResult.ToGeneric().Errors;
                    }

                    string pwaPath = Path.Combine(HttpServer.wwwroot, "pwa", "icons");
                    int[] sizes = [512, 192, 144, 128, 96, 72, 48];
                    string srcPath;
                    VoidWithError resultTemp = new VoidWithError();
                    if (isSvgResult.Result)
                    {
                        foreach (int size in sizes)
                        {
                            resultTemp
                                .Run(() => Image.SvgTo(value.Logo.Upload.FilePath, SKEncodedImageFormat.Png, size, size, Path.Combine(pwaPath, "logo-" + size + ".png")).ToGeneric());
                        }

                        if (!resultTemp.Success)
                        {
                            return resultTemp.Errors;
                        }
                    }
                    else
                    {
                        srcPath = value.Logo.Upload.FilePath;
                        foreach (int size in sizes)
                        {
                            resultTemp
                                .Run(() => Image.Resize(srcPath, size, size, Path.Combine(pwaPath, "logo-" + size + ".png")).ToGeneric());
                        }

                        if (!resultTemp.Success)
                        {
                            return resultTemp.Errors;
                        }
                    }


                    ResultWithError<bool> saveTemp = value.Logo.SaveToFolderOnUpload(Path.Combine(HttpServer.wwwroot, "company"));
                    if (!saveTemp.Success)
                    {
                        return saveTemp.Errors;
                    }

                    value.Logo.Uri = value.Logo.Upload.FilePath.Replace(HttpServer.wwwroot, "").Replace("\\", "/");
                    value.Logo.Upload = null;
                }
            }

            return result;
        }

        public Company GetMain()
        {
            List<Company> companies = Company.GetAll();
            if (companies.Count > 0)
            {
                return companies[0];
            }
            return new Company()
            {
                Name = "Rayuki debug",
                Logo = new ImageFile() { Uri = "/img/logo.svg" }
            };
        }

        public Manifest? ReadManifest()
        {
            string manifestJson = File.ReadAllText(Path.Combine(HttpServer.wwwroot, "pwa", "manifest.json"));
            return JsonConvert.DeserializeObject<Manifest>(manifestJson);
        }
        public void SaveManifest(Manifest manifest)
        {
            string manifestJson = JsonConvert.SerializeObject(manifest, new JsonSerializerSettings()
            {
                NullValueHandling = NullValueHandling.Ignore,
                Formatting = Formatting.Indented
            });
            File.WriteAllText(Path.Combine(HttpServer.wwwroot, "pwa", "manifest.json"), manifestJson);
        }
    }
}