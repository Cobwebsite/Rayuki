namespace Core.Tools
{
    public static class EnumExtension
    {
        public static string GetFullName(this Enum @enum)
        {
            return @enum.GetType().FullName + "." + @enum.ToString() + ", " + @enum.GetType().Assembly.GetName().Name;
        }
    }
}
