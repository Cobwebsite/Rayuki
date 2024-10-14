using AventusSharp.Tools.Attributes;

namespace Core.Logic.FileSystem
{
    [Typescript]
    public class FileDetails
    {
        public static FileDetails Create(string uri)
        {
            System.IO.FileInfo info = new System.IO.FileInfo(uri);
            FileDetails result;
            if (Directory.Exists(uri))
            {
                result = new FileDetails()
                {
                    Name = info.Name,
                    Size = 0,
                    LastEdit = info.LastWriteTime,
                    IsDirectory = Directory.Exists(uri)
                };
            }
            else
            {
                result = new FileDetails()
                {
                    Name = info.Name,
                    Size = info.Length,
                    LastEdit = info.LastWriteTime,
                    IsDirectory = Directory.Exists(uri)
                };
            }

            return result;
        }

        public string Name { get; set; }
        public long Size { get; set; }
        public DateTime LastEdit { get; set; }

        public bool IsDirectory { get; set; }
    }

}