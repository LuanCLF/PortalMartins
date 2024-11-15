using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortalMartins.API.Dtos;
using PortalMartins.CORE.Entities;
using PortalMartins.CORE.Interfaces;
using PortalMartins.CORE.Interfaces.IUtilities;

namespace PortalMartins.API.Controllers
{
    [Route("/")]
    [ApiController]
    [ApiExplorerSettings(GroupName = "USER")]
    public class UserController(IAuthenticator authenticator, IEncryptor encryptor, IUserRepository userRepository) : ControllerBase
    {
        private readonly IAuthenticator _authenticator = authenticator;
        private readonly IEncryptor _encryptor = encryptor;
        private readonly IUserRepository _userRepository = userRepository;

        [HttpPost("/create")]
        [EndpointSummary("Registers a user")]
        public async Task<ActionResult> Create([FromBody] UserDto.UCreateRequest cr )
        {
            try
            {
                if (string.IsNullOrWhiteSpace(cr.Email)) throw new ArgumentException("Email cannot be null");
                if (await _userRepository.CheckIfExist(cr.Email) != false) throw new ArgumentException("User already exists");

                User user = new(cr.Name, cr.Email, cr.Password, cr.CameFrom, cr.WhatIsIt, _encryptor);

                await _userRepository.Add(user);

                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("/login")]
        [EndpointSummary("Logs in a user")]
        public async Task<ActionResult> Login([FromBody] UserDto.ULoginRequest lg)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(lg.Email) || string.IsNullOrWhiteSpace(lg.Password)) throw new ArgumentException("Email and password cannot be null");

                User user = await _userRepository.GetUser(lg.Email) ?? throw new ArgumentException("User not found");

                if (!_encryptor.Compare(lg.Password, user.Password)) throw new ArgumentException("Invalid password");

                string token = await _authenticator.GenerateToken(user.Id);

                return StatusCode(200, new UserDto.ULoginResponse(user.Name, user.Email, token, user.CreatedAt));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
            
        [HttpGet("/users")]
        [EndpointSummary("Get users")]
        public async Task<ActionResult> GetAllUsers()
        {
            try
            {
                List<User> users = await _userRepository.GetAll();

                List<UserDto.UGetAllResponse> usersDto = users.Select(u => new UserDto.UGetAllResponse(u.Name, u.CreatedAt)).ToList();

                return StatusCode(200, usersDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpPatch("/update")]
        [EndpointSummary("Update user")]
        public async Task<ActionResult> Update([FromBody] UserDto.UUpdateRequest up)
        {
            try
            {
                User user = await _authenticator.GetUser();

                if (up.Email is not null && await _userRepository.CheckIfExist(up.Email) != false) throw new ArgumentException("User already exists");

                user.Update(up.Name, up.Email, up.Password, _encryptor);

                await _userRepository.Update(user);

                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("/Delete")]
        [EndpointSummary("Delete user")]
        public async Task<ActionResult> Delete([FromBody] UserDto.UDeleteRequest del)
        {
            try
            {
                User user = await _authenticator.GetUserAndPosts();

                user.Delete(del.Password, _encryptor);

                await _userRepository.Update(user);

                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
