using AventusSharp.Data;
using AventusSharp.Tools;
using AventusSharp.Tools.Attributes;
using Core.Tools;
using PuppeteerSharp;
using PuppeteerSharp.Media;

namespace Core.Data.DataTypes
{
    [Typescript]
    public class Pdf : AventusFile
    {
        public string Name { get; set; } = "";
        public string Html { get; set; } = "";

        public bool Debug { get; set; } = false;

        public async Task<VoidWithError> Generate(string folderPath)
        {
            if (string.IsNullOrWhiteSpace(Html)) return new VoidWithError();

            VoidWithError result = new VoidWithError();
            try
            {
                if (string.IsNullOrWhiteSpace(Name))
                {
                    result.Errors.Add(new PdfError(PdfErrorCode.NoNameProvided, "You must provide a name to generate the file"));
                    return result;
                }
                if (Name.EndsWith(".pdf"))
                {
                    Name += ".pdf";
                }
                result = await PdfTools.Init();
                if (!result.Success)
                {
                    return result;
                }
                string filePath = Path.Combine(folderPath, Name);
                var pdfOptions = new PdfOptions();
                pdfOptions.Format = PaperFormat.A4;
                pdfOptions.PreferCSSPageSize = true;
                pdfOptions.PrintBackground = true;
                pdfOptions.MarginOptions.Bottom = "0px";
                pdfOptions.MarginOptions.Left = "0px";
                pdfOptions.MarginOptions.Right = "0px";
                pdfOptions.MarginOptions.Top = "0px";

                using (var browser = await Puppeteer.LaunchAsync(new LaunchOptions
                {
                    Headless = true
                }))
                {
                    using (var page = await browser.NewPageAsync())
                    {
                        await page.SetContentAsync(Html);
                        // await page.PdfDataAsync();
                        await page.PdfAsync(Name + ".pdf", pdfOptions);
                    }
                }
            }
            catch (Exception e)
            {
                result.Errors.Add(new DataError(DataErrorCode.UnknowError, e));
            }
            return result;
        }

        public async Task<ResultWithError<byte[]>> Build()
        {
            if (string.IsNullOrWhiteSpace(Html)) return new ResultWithError<byte[]>();

            ResultWithError<byte[]> result = new ResultWithError<byte[]>();
            try
            {
                if (string.IsNullOrWhiteSpace(Name))
                {
                    result.Errors.Add(new PdfError(PdfErrorCode.NoNameProvided, "You must provide a name to generate the file"));
                    return result;
                }
                if (Name.EndsWith(".pdf"))
                {
                    Name += ".pdf";
                }
                VoidWithError resultTemp = await PdfTools.Init();
                if (!result.Success)
                {
                    result.Errors = resultTemp.Errors;
                    return result;
                }

                var pdfOptions = new PdfOptions();
                pdfOptions.Format = PaperFormat.A4;
                pdfOptions.PreferCSSPageSize = true;
                pdfOptions.PrintBackground = true;
                pdfOptions.MarginOptions.Bottom = "0px";
                pdfOptions.MarginOptions.Left = "0px";
                pdfOptions.MarginOptions.Right = "0px";
                pdfOptions.MarginOptions.Top = "0px";

                using (var browser = await Puppeteer.LaunchAsync(new LaunchOptions
                {
                    Headless = true
                }))
                {
                    using (var page = await browser.NewPageAsync())
                    {
                        await page.SetContentAsync(Html);
                        result.Result = await page.PdfDataAsync();
                    }
                }
            }
            catch (Exception e)
            {
                result.Errors.Add(new DataError(DataErrorCode.UnknowError, e));
            }
            return result;
        }

    }
}
