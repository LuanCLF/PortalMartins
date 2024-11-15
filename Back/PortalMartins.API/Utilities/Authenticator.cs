using Microsoft.IdentityModel.Tokens;
using PortalMartins.CORE.Entities;
using PortalMartins.CORE.Interfaces;
using PortalMartins.CORE.Interfaces.IUtilities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace PortalMartins.API.Utilities
{
    public sealed class Authenticator(IConfiguration configuration, IHttpContextAccessor httpContextAccessor, IUserRepository userRepository ) : IAuthenticator
    {
        private readonly string _key = configuration["Key"]!;
        private readonly double _hours = int.Parse(configuration["Hours"]!);
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
        private readonly IUserRepository _userRepository = userRepository;

        public Task<string> GenerateToken(Guid id)
        {
            byte[] cc = Encoding.ASCII.GetBytes(_key);

            SecurityTokenDescriptor config = new()
            {
                Subject = new ClaimsIdentity(
                [
                    new("Id", id.ToString())
                ]),
                Expires = DateTime.UtcNow.AddHours(_hours),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(cc), SecurityAlgorithms.HmacSha256Signature)
            };

            JwtSecurityTokenHandler jwtHandler = new();
            SecurityToken CreatedToken = jwtHandler.CreateToken(config);
            string tokenString = jwtHandler.WriteToken(CreatedToken);

            return Task.FromResult(tokenString);
        }
        public Task<Guid> GetId()
        {
            string token = _httpContextAccessor.HttpContext!.Request.Headers.Authorization!.Single()!.Split(" ").Last();

            JwtSecurityTokenHandler jwtHandler = new();
            JwtSecurityToken jwtToken = jwtHandler.ReadJwtToken(token);
            Claim idClaim = jwtToken.Claims.First(claim => claim.Type == "Id");

            return Task.FromResult(Guid.Parse(idClaim.Value));
        }
        public async Task<User> GetUser()
        {
            Guid id = await GetId();

            User user = await _userRepository.Get(id) ?? throw new ArgumentException("User not found");

            return user;
        }        
        public async Task<User> GetUserAndPosts()
        {
            Guid id = await GetId();

            User user = await _userRepository.GetPosts(id) ?? throw new ArgumentException("User not found");

            return user;
        }
    }
}