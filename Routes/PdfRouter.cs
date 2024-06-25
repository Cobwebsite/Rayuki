using AventusSharp.Routes.Attributes;
using AventusSharp.Routes.Response;
using AventusSharp.Tools;
using Core.Data.DataTypes;
using Route = AventusSharp.Routes.Route;

namespace Core.Routes
{
    public class PdfRouter : Route
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
            return new ByteResponse(build.Result ?? [], "application/pdf");
        }
    }
}
