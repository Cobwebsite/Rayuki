using AventusSharp.Data;
using AventusSharp.Data.Attributes;

namespace Core.Data;

public class Recent : Storable<Recent>
{
    public string Name { get; set; }
    public string TagName { get; set; }

    [Size(SizeEnum.Text)]
    public string State { get; set; }

    [ForeignKey<User>, DeleteOnCascade]
    public int UserId { get; set; }

    public Datetime Datetime { get; set; }
}