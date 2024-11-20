using PortalMartins.CORE.Entities;

namespace PortalMartins.CORE.Interfaces.IUtilities
{
    public interface IAuthenticator
    {
        Task<string> GenerateToken(Guid id);
        Task<Guid> GetId();
        Task<User?> GetUser();
        Task<User?> GetUserAndPosts();
    }
}
