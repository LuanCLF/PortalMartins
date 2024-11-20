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

        [HttpGet("/users")]
        [EndpointSummary("Get users")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<UserDto.UGetAllResponse>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> GetAllUsers()
        {
            try
            {
                List<User> users = await _userRepository.GetAll();

                List<UserDto.UGetAllResponse> usersDto = users.Select(u => new UserDto.UGetAllResponse(u.Name, u.CameFrom, u.WhatIsIt, u.CreatedAt, u.UpdatedAt)).ToList();

                return Ok(usersDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("/create")]
        [EndpointSummary("Registers a user")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Create([FromBody] UserDto.UCreateRequest cr )
        {
            try
            {
                if (string.IsNullOrWhiteSpace(cr.Email)) return BadRequest("Email cannot be null");
                if (await _userRepository.CheckIfExist(cr.Email) != false) return Conflict("User already exists");

                User user = new();
                try
                {
                     user = new(cr.Name, cr.Email, cr.Password, cr.CameFrom, cr.WhatIsIt, _encryptor);
                }
                catch (Exception er)
                {
                    return BadRequest(er.Message);
                }

                await _userRepository.Add(user);
                
                return Created();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("/login")]
        [EndpointSummary("Logs in a user")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDto.ULoginResponse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Login([FromBody] UserDto.ULoginRequest lg)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(lg.Email) || string.IsNullOrWhiteSpace(lg.Password)) return BadRequest("Email and password cannot be null");

                User? user = await _userRepository.GetUser(lg.Email);
                if (user == null) return NotFound("User not found");

                if (!_encryptor.Compare(lg.Password, user.Password)) return Unauthorized("Invalid password");

                string token = await _authenticator.GenerateToken(user.Id);

                return Ok(new UserDto.ULoginResponse(user.Name, user.Email, token, user.CreatedAt));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpPatch("/update/user")]
        [EndpointSummary("Update user")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Update([FromBody] UserDto.UUpdateRequest up)
        {
            try
            {
                User? user = await _authenticator.GetUser();
                if (user == null) return NotFound("User not found");

                if (up.Email is not null && await _userRepository.CheckIfExist(up.Email) != false) return Conflict("User already exists");

                (bool er, string msg) = user.Update(up.Name, up.Email, up.Password, _encryptor);
                if(er) return BadRequest(msg);

                await _userRepository.Update(user);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("/delete/user")]
        [EndpointSummary("Delete user")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Delete([FromBody] UserDto.UDeleteRequest del)
        {
            try
            {
                User? user = await _authenticator.GetUserAndPosts();
                if(user == null) return NotFound("User not found");

                (bool er, string msg) = user.Delete(del.Password, _encryptor);
                if(er) return Unauthorized(msg);

                await _userRepository.Update(user);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
