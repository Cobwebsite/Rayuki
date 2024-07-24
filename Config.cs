namespace Core
{
    public class DatabaseConfig
    {
        public static DatabaseConfig? LoadFromEnv()
        {
            DatabaseConfig config = new DatabaseConfig();

            string? dbHost = Environment.GetEnvironmentVariable("MYSQL_HOST");
            if (!string.IsNullOrEmpty(dbHost))
            {
                config.Host = dbHost;
            }
            else
            {
                config.Host = "localhost";
            }

            string? dbName = Environment.GetEnvironmentVariable("MYSQL_DATABASE");
            if (!string.IsNullOrEmpty(dbName))
            {
                config.Name = dbName;
            }
            else
            {
                return null;
            }

            string? dbUser = Environment.GetEnvironmentVariable("MYSQL_USER");
            if (!string.IsNullOrEmpty(dbUser))
            {
                config.Username = dbUser;
            }
            else
            {
                return null;
            }

            string? dbPass = Environment.GetEnvironmentVariable("MYSQL_PASSWORD");
            if (!string.IsNullOrEmpty(dbPass))
            {
                config.Password = dbPass;
            }
            else
            {
                return null;
            }

            return config;
        }
        public string Host { get; set; }
        public int? Port { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }


        public override string ToString()
        {
            return $"{Host}:{Port} {Name} {Username} {Password}";
        }
    }

    public class DefaultUserConfig
    {
        public static DefaultUserConfig LoadFromEnv()
        {
            DefaultUserConfig config = new DefaultUserConfig();

            string? firstname = Environment.GetEnvironmentVariable("RAYUKI_FIRSTNAME");
            string? lastname = Environment.GetEnvironmentVariable("RAYUKI_LASTNAME");
            string? username = Environment.GetEnvironmentVariable("RAYUKI_USERNAME");
            string? password = Environment.GetEnvironmentVariable("RAYUKI_PASSWORD");
            config.Username = !string.IsNullOrEmpty(username) ? username : "root";
            config.Password = !string.IsNullOrEmpty(password) ? password : "root";
            config.Lastname = !string.IsNullOrEmpty(lastname) ? lastname : "root";
            config.Firstname = !string.IsNullOrEmpty(firstname) ? firstname : "root";

            return config;
        }
        public string Username { get; set; }
        public string Password { get; set; }

        public string Lastname { get; set; }
        public string Firstname { get; set; }
    }
}