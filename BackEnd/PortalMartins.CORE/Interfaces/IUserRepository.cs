using PortalMartins.CORE.Entities;

namespace PortalMartins.CORE.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> Get(Guid id);
        Task<User?> GetPosts(Guid id);
        Task<List<User>> GetAll();
        Task Add(User entity);
        Task Update(User entity);
        Task Delete(User entity);
        Task<User?> GetUser(string email);
        Task<bool> CheckIfExist(string email);
    }
}
