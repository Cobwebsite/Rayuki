using AventusSharp.Tools.Attributes;

namespace Core.Logic.FileSystem
{
    [Typescript]
    public class FileDetails
    {
        public static FileDetails Create(string uri)
        {
            FileInfo info = new System.IO.FileInfo(uri);
            FileDetails result;
            if (Directory.Exists(uri))
            {
                result = new FileDetails()
                {
                    Name = info.Name,
                    Size = 0,
                    LastEdit = info.LastWriteTime,
                    Extension = "",
                    IsDirectory = true
                };
            }
            else
            {
                result = new FileDetails()
                {
                    Name = info.Name,
                    Size = info.Length,
                    LastEdit = info.LastWriteTime,
                    Extension = info.Extension,
                    IsDirectory = false
                };
            }

            return result;
        }

        public string Name { get; set; }
        public long Size { get; set; }
        public DateTime LastEdit { get; set; }
        public string Extension { get; set; }
        public bool IsDirectory { get; set; }
    }

}