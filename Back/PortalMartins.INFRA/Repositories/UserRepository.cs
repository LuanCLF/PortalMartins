using Microsoft.EntityFrameworkCore;
using PortalMartins.CORE.Entities;
using PortalMartins.CORE.Interfaces;
using PortalMartins.INFRA.Context;

namespace PortalMartins.INFRA.Repositories
{
    public sealed class UserRepository(AppDBContext context, CancellationToken cancellationToken = default) : IUserRepository
    {
        private readonly AppDBContext _context = context;
        private readonly CancellationToken _cancellationToken = cancellationToken;

        public async Task<User?> GetUser(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.Active == true);
        }
        public async Task<bool> CheckIfExist(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }
        public async Task<User?> Get(Guid id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id && u.Active == true);
        }
        public async Task<User?> GetPosts(Guid id)
        {
            return await _context.Users.Where(u => u.Active == true && u.Id == id).Include(u => u.Posts).FirstOrDefaultAsync();
        }
        public async Task<List<User>> GetAll()
        {
            return await _context.Users.Where(u => u.Active == true).ToListAsync();
        }
        public async Task Add(User entity)
        {
            await _context.Users.AddAsync(entity);
            await _context.SaveChangesAsync(_cancellationToken);
        }

        public async Task Update(User entity)
        {
            _context.Users.Update(entity);
            await _context.SaveChangesAsync(_cancellationToken);
        }

        public async Task Delete(User entity)
        {
             _context.Users.Remove(entity);
            await _context.SaveChangesAsync(_cancellationToken);
        }
    }
}
