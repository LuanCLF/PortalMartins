using PortalMartins.CORE.Entities;

namespace PortalMartins.CORE.Interfaces
{
    public interface IPostRepository 
    {
        Task<Post?> Get(int id);
        Task<List<Post>> All();
        Task<List<Post>> All(Guid id);
        Task<Hosting?> GetH(int id, Guid uId);
        Task<Feeding?> GetF(int id, Guid uId);
        Task<Events?> GetE(int id, Guid uId);
        Task<List<Hosting>> GetAllH();
        Task<List<Feeding>> GetAllF();
        Task<List<Events>> GetAllE();
        Task<List<Hosting>> GetAllH(Guid? id);
        Task<List<Feeding>> GetAllF(Guid? id);
        Task<List<Events>> GetAllE(Guid? id);
        Task Add(Post entity);
        Task Update(Post entity);
        Task Delete(Post entity);
    }
}
