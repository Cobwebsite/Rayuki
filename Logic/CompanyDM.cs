
using AventusSharp.Data.Manager.DB;
using AventusSharp.Tools;
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

            string iconPath = Path.Combine(HttpServer.wwwroot, "pwa", "custom", "icons");
            if (!Directory.Exists(iconPath))
            {
                Directory.CreateDirectory(iconPath);
                string srcPath = Path.Combine(HttpServer.wwwroot, "img", "logo.svg");
                int[] sizes = [512, 192, 144, 128, 96, 72, 48];
                foreach (int size in sizes)
                {
                    result
                        .Run(() => Image.SvgTo(srcPath, SKEncodedImageFormat.Png, size, size, Path.Combine(iconPath, "logo-" + size + ".png")).ToGeneric());
                }
            }

            string manifestPath = Path.Combine(HttpServer.wwwroot, "pwa", "custom", "manifest.json");
            if (!File.Exists(manifestPath))
            {
                File.WriteAllText(manifestPath, GetDefaultManifest());
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

                    string pwaPath = Path.Combine(HttpServer.wwwroot, "pwa", "custom", "icons");
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


                    ResultWithError<bool> saveTemp = value.Logo.SaveToFolderOnUpload(Path.Combine(FileStorage.rootFolder, "Core", "company"));
                    if (!saveTemp.Success)
                    {
                        return saveTemp.Errors;
                    }

                    value.Logo.Uri = value.Logo.Upload.FilePath.Replace(FileStorage.rootFolder, "/storage").Replace("\\", "/");
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
            string manifestJson = File.ReadAllText(Path.Combine(HttpServer.wwwroot, "pwa", "custom", "manifest.json"));
            return JsonConvert.DeserializeObject<Manifest>(manifestJson);
        }
        public void SaveManifest(Manifest manifest)
        {
            string manifestJson = JsonConvert.SerializeObject(manifest, new JsonSerializerSettings()
            {
                NullValueHandling = NullValueHandling.Ignore,
                Formatting = Formatting.Indented
            });
            File.WriteAllText(Path.Combine(HttpServer.wwwroot, "pwa", "custom", "manifest.json"), manifestJson);
        }



        private string GetDefaultManifest() {
            return @"{
    ""name"": ""Rayuki"",
    ""short_name"": ""Rayuki"",
    ""icons"": [
        {
            ""src"": ""/pwa/custom/icons/logo-48.png"",
            ""type"": ""image/png"",
            ""sizes"": ""48x48""
        },
        {
            ""src"": ""/pwa/custom/icons/logo-72.png"",
            ""type"": ""image/png"",
            ""sizes"": ""72x72""
        },
        {
            ""src"": ""/pwa/custom/icons/logo-96.png"",
            ""type"": ""image/png"",
            ""sizes"": ""96x96""
        },
        {
            ""src"": ""/pwa/custom/icons/logo-128.png"",
            ""type"": ""image/png"",
            ""sizes"": ""128x128""
        },
        {
            ""src"": ""/pwa/custom/icons/logo-144.png"",
            ""type"": ""image/png"",
            ""sizes"": ""144x144""
        },
        {
            ""src"": ""/pwa/custom/icons/logo-192.png"",
            ""type"": ""image/png"",
            ""sizes"": ""192x192""
        },
        {
            ""src"": ""/pwa/custom/icons/logo-512.png"",
            ""type"": ""image/png"",
            ""sizes"": ""512x512""
        },
        {
            ""src"": ""/pwa/custom/icons/logo-512.png"",
            ""type"": ""image/png"",
            ""sizes"": ""512x512"",
            ""purpose"": ""any maskable""
        }
    ],
    ""theme_color"": ""#dcdcdc"",
    ""background_color"": ""#ffffff"",
    ""display"": ""standalone"",
    ""orientation"": ""portrait"",
    ""scope"": ""/"",
    ""start_url"": ""/pwa/loading.html""
}";
        }
    }
}