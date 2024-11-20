using PortalMartins.CORE.Interfaces.IUtilities;

namespace PortalMartins.API.Utilities
{
    public sealed class Encryptor(IConfiguration configuration) : IEncryptor
    {
        private readonly int saltFactor = int.Parse(configuration["Salt"]!);
        public string Encrypt(string value)
        {
            string salt = BCrypt.Net.BCrypt.GenerateSalt(saltFactor);
            string hash = BCrypt.Net.BCrypt.HashPassword(value, salt);

            return hash;
        }

        public bool Compare(string value, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(value, hash);
        }
    }
}