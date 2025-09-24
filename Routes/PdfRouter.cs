using AventusSharp.Routes;
using AventusSharp.Routes.Attributes;
using AventusSharp.Routes.Response;
using AventusSharp.Tools;
using Core.Data.DataTypes;

namespace Core.Routes
{
    [Prefix("Core")]
    public class PdfRouter : Router
    {
        [Post]
        public async Task<VoidWithError> Generate(Pdf pdf)
        {
            return await pdf.Generate("");
        }

        [Post]
        public async Task<ByteResponse> Build(Pdf pdf)
        {
            ResultWithError<byte[]> build = await pdf.Build();
            if (!build.Success)
            {
                build.Print();
            }
            return new ByteResponse(build.Result ?? [], "application/pdf");
        }
    }
}
