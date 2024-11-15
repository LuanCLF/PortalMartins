namespace PortalMartins.CORE.Interfaces.IUtilities
{
    public interface IEncryptor
    {
        string Encrypt(string value);

        bool Compare(string value, string hash);
    }
}