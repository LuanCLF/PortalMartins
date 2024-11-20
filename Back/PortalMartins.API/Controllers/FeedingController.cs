using Microsoft.AspNetCore.Mvc;
using PortalMartins.CORE.Interfaces.IUtilities;
using PortalMartins.CORE.Interfaces;
using PortalMartins.API.Dtos;
using PortalMartins.CORE.Entities;
using Microsoft.AspNetCore.Authorization;

namespace PortalMartins.API.Controllers
{
    [Route("/")]
    [ApiController]
    [ApiExplorerSettings(GroupName = "FEEDING")]
    public class FeedingController(IAuthenticator authenticator, IUserRepository userRepository, IPostRepository postRepository) : ControllerBase
    {
        private readonly IAuthenticator _authenticator = authenticator;
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IPostRepository _postRepository = postRepository;

        [HttpGet("/get/feedings")]
        [EndpointSummary("Get all feedings")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<FeedingDto.FGetAllResponse>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> All([FromQuery] int? page)
        {
            try
            {
                List<Feeding> feeding = await _postRepository.GetAllF(page);

                List<FeedingDto.FGetAllResponse> feedingDto =
                    feeding.Select(f => new FeedingDto.FGetAllResponse(
                    Id: f.Id,
                    Title: f.Title,
                    Location: f.Location,
                    Phone: f.Phone,
                    Instagram: f.Instagram,
                    Classification: f.Classification,
                    Description: f.Description,
                    Images: f.Images,
                    Type: f.Type,
                    Wifi: f.Wifi,
                    Delivery: f.Delivery,
                    Parking: f.Parking,
                    CreatedAt: f.CreatedAt,
                    UpdatedAt: f.UpdatedAt
                    )).ToList();

                return Ok(feedingDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpPost("/create/user/feeding")]
        [EndpointSummary("Registers a feeding post")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Create([FromBody] FeedingDto.FCreateRequest cr)
        {
            try
            {
                User? user = await _authenticator.GetUser();
                if (user == null) return NotFound("User not found");

                 try {
                    user.AddPost(new Feeding(
                    user.Id, cr.Title,
                    cr.Location, cr.Phone,
                    cr.Instagram, cr.Description,
                    'F',
                    cr.Type, cr.Wifi,
                    cr.Delivery, cr.Parking
                    ));
                }
                catch (Exception er)
                {
                    return BadRequest(er.Message);
                }

                await _userRepository.Update(user);

               return Created();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpGet("/get/user/feedings")]
        [EndpointSummary("Get all feedings from user")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<FeedingDto.FGetAllResponse>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> AllFromUser([FromQuery] int? page)
        {
            try
            {
                User? user = await _authenticator.GetUser();
                if (user == null) return NotFound("User not found");

                List<Feeding> feedings = await _postRepository.GetAllF(user.Id, page);

                List<FeedingDto.FGetAllResponse> feedingsDto =
                    feedings.Select(f => new FeedingDto.FGetAllResponse(
                    Id: f.Id,
                    Title: f.Title,
                    Location: f.Location,
                    Phone: f.Phone,
                    Instagram: f.Instagram,
                    Classification: f.Classification,
                    Description: f.Description,
                    Images: f.Images,
                    Type: f.Type,
                    Wifi: f.Wifi,
                    Delivery: f.Delivery,
                    Parking: f.Parking,
                    CreatedAt: f.CreatedAt,
                    UpdatedAt: f.UpdatedAt
                    )).ToList();

                return Ok(feedingsDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpPatch("/update/user/feeding")]
        [EndpointSummary("Updates a feeding post")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Update([FromBody] FeedingDto.FUpdateRequest ur)
        {
            try
            {
                User? user = await _authenticator.GetUser();
                if (user == null) return NotFound("User not found");

                Feeding? feeding = await _postRepository.GetF(ur.Id, user.Id);
                if (feeding == null) return NotFound("Post not found");

                 (bool er, string msg) = feeding.Update(
                    ur.Title, ur.Location,
                    ur.Phone, ur.Instagram,
                    ur.Description, ur.Type,
                    ur.Wifi, ur.Delivery,
                    ur.Parking
                    );
                if (er) return BadRequest(msg);

                await _postRepository.Update(feeding);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("/delete/user/feeding/{id}")]
        [EndpointSummary("Deletes a feeding post")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            try
            {
                Guid uId = await _authenticator.GetId();

                Feeding? feeding = await _postRepository.GetF(id, uId);
                if (feeding == null) return NotFound("Post not found");

                feeding.Delete();

                await _postRepository.Update(feeding);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
