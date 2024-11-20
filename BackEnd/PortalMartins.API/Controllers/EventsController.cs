using Microsoft.AspNetCore.Mvc;
using PortalMartins.CORE.Interfaces.IUtilities;
using PortalMartins.CORE.Interfaces;
using PortalMartins.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using PortalMartins.CORE.Entities;

namespace PortalMartins.API.Controllers
{
    [Route("/")]
    [ApiController]
    [ApiExplorerSettings(GroupName = "EVENTS")]
    public class EventsController(IAuthenticator authenticator, IUserRepository userRepository, IPostRepository postRepository) : ControllerBase
    {
        private readonly IAuthenticator _authenticator = authenticator;
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IPostRepository _postRepository = postRepository;

        [HttpGet("/get/events")]
        [EndpointSummary("Get all events")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<EventsDto.EGetAllResponse>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> All([FromQuery] int? page)
        {
            try
            {
                List<Events> events = await _postRepository.GetAllE(page);

                List<EventsDto.EGetAllResponse> eventsDto =
                    events.Select(e => new EventsDto.EGetAllResponse(
                    Id: e.Id,
                    Title: e.Title,
                    Location: e.Location,
                    Phone: e.Phone,
                    Instagram: e.Instagram,
                    Classification: e.Classification,
                    Description: e.Description,
                    Images: e.Images,
                    EventDate: e.EventDate,
                    EventLocation: e.EventLocation,
                    CreatedAt: e.CreatedAt,
                    UpdatedAt: e.UpdatedAt
                    )).ToList();

                return Ok(eventsDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpPost("/create/user/event")]
        [EndpointSummary("Registers an event post")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Create([FromBody] EventsDto.ECreateRequest cr)
        {
            try
            {
                User? user = await _authenticator.GetUser();
                if (user == null) return NotFound("User not found");

                try
                {
                    user.AddPost(new Events(
                     user.Id, cr.Title,
                     cr.Location, cr.Phone,
                     cr.Instagram, cr.Description,
                     'E',
                     cr.EventDate, cr.EventLocation
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
        [HttpGet("/get/user/events")]
        [EndpointSummary("Get all events from user")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<EventsDto.EGetAllResponse>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> AllFromUser([FromQuery] int? page)
        {
            try
            {
                User? user = await _authenticator.GetUser();
                if (user == null) return NotFound("User not found");

                List<Events> events = await _postRepository.GetAllE(user.Id, page);

                List<EventsDto.EGetAllResponse> eventsDto =
                    events.Select(e => new EventsDto.EGetAllResponse(
                    Id: e.Id,
                    Title: e.Title,
                    Location: e.Location,
                    Phone: e.Phone,
                    Instagram: e.Instagram,
                    Classification: e.Classification,
                    Description: e.Description,
                    Images: e.Images,
                    EventDate: e.EventDate,
                    EventLocation: e.EventLocation,
                    CreatedAt: e.CreatedAt,
                    UpdatedAt: e.UpdatedAt
                    )).ToList();

                return Ok(eventsDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpPatch("/update/user/event")]
        [EndpointSummary("Updates a event post")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Update([FromBody] EventsDto.EUpdateRequest up)
        {
            try
            {
                User? user = await _authenticator.GetUser();
                if (user == null) return NotFound("User not found");

                Events? events = await _postRepository.GetE(up.Id, user.Id);
                if (events == null) return NotFound("Event not found");

                (bool er, string msg) = events.Update(
                    up.Title,
                    up.Location, up.Phone,
                    up.Instagram, up.Description,
                    up.EventDate, up.EventLocation
                    );
                if (er) return BadRequest(msg); 

                await _postRepository.Update(events);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("/delete/user/event/{id}")]
        [EndpointSummary("Delete event from user")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            try
            {
                User? user = await _authenticator.GetUser();
                if (user == null) return NotFound("User not found");

                Events? events = await _postRepository.GetE(id, user.Id);
                if (events == null) return NotFound("Event not found");

                events.Delete();

                await _postRepository.Update(events);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}