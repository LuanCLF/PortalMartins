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
        Task<List<Hosting>> GetAllH(int? page);
        Task<List<Feeding>> GetAllF(int? page);
        Task<List<Events>> GetAllE(int? page);
        Task<List<Hosting>> GetAllH(Guid? id, int? page);
        Task<List<Feeding>> GetAllF(Guid? id, int? page);
        Task<List<Events>> GetAllE(Guid? id, int? page);
        Task Add(Post entity);
        Task Update(Post entity);
        Task Delete(Post entity);
    }
}
