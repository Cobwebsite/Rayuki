using AventusSharp.Data;
using AventusSharp.Data.Attributes;

namespace Core.Data;

public class PushRecord : Storable<PushRecord>
{
    [ForeignKey<User>]
    public int UserId { get; set; }

    [Unique]
    public string EndPoint { get; set; }

    public string P256dh { get; set; }

    public string Auth { get; set; }
}