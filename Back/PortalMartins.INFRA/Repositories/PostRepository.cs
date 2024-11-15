using Microsoft.EntityFrameworkCore;
using PortalMartins.CORE.Entities;
using PortalMartins.CORE.Interfaces;
using PortalMartins.INFRA.Context;

namespace PortalMartins.INFRA.Repositories
{
    public sealed class PostRepository(AppDBContext context, CancellationToken cancellationToken = default) : IPostRepository
    {
        private readonly AppDBContext _context = context;
        private readonly CancellationToken _cancellationToken = cancellationToken;

        public async Task<Post?> Get(int id)
        {
            return await _context.Posts.FirstOrDefaultAsync(p => p.Active == true && p.Id == id);
        }
        public async Task<List<Post>> All()
        {
            return await _context.Posts.Where(p => p.Active == true).ToListAsync();
        }
        public async Task<List<Post>> All(Guid id)
        {
            return await _context.Posts.Where(p => p.Active == true && p.UserId == id).ToListAsync();
        }
        public async Task<Hosting?> GetH(int id, Guid uId)
        {
            return await _context.Hostings.FirstOrDefaultAsync(h => h.Active == true && h.Id == id && h.UserId == uId);
        }
        public async Task<Feeding?> GetF(int id, Guid uId)
        {
            return await _context.Feedings.FirstOrDefaultAsync(f => f.Active == true && f.Id == id && f.UserId == uId);
        }
        public async Task<Events?> GetE(int id, Guid uId)
        {
            return await _context.Events.FirstOrDefaultAsync(e => e.Active == true && e.Id == id && e.UserId == uId);
        }
        public async Task<List<Hosting>> GetAllH()
        {
            return await _context.Hostings.ToListAsync();
        }
        public async Task<List<Hosting>> GetAllH(Guid? id)
        {
            return await _context.Hostings.Where(h => h.Active && h.UserId == id).ToListAsync();
        }
        public async Task<List<Feeding>> GetAllF()
        {
            return await _context.Feedings.Where(f => f.Active == true).ToListAsync();
        }
        public async Task<List<Feeding>> GetAllF(Guid? id)
        {
            return await _context.Feedings.Where(f => f.Active && f.UserId == id).ToListAsync();
        }
        public async Task<List<Events>> GetAllE()
        {
            return await _context.Events.Where(e => e.Active == true).ToListAsync();
        }
        public async Task<List<Events>> GetAllE(Guid? id)
        {
            return await _context.Events.Where(e => e.Active && e.UserId == id).ToListAsync();
        }
        public async Task Add(Post entity)
        {
            await _context.Posts.AddAsync(entity);
            await _context.SaveChangesAsync(_cancellationToken);
        }
        public async Task Update(Post entity)
        {
            _context.Posts.Update(entity);
            await _context.SaveChangesAsync(_cancellationToken);
        }
        public async Task Delete(Post entity)
        {
            _context.Posts.Remove(entity);
            await _context.SaveChangesAsync(_cancellationToken);
        }
    }
}
