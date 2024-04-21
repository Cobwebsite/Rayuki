using AventusSharp.Routes.Attributes;
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
    }
}
