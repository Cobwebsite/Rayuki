using AventusSharp.Tools.Attributes;

namespace Core.Routes.Responses;

[Export]
public class LoginResult
{
    public bool Success { get; set; }
    public string? QuickAccess { get; set; }
}