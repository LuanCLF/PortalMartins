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
        public async Task<ActionResult> All()
        {
            try
            {
                List<Events> events = await _postRepository.GetAllE();

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

                return StatusCode(200, eventsDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpPost("/create/user/event")]
        [EndpointSummary("Registers an event post")]
        public async Task<ActionResult> Create([FromBody] EventsDto.ECreateRequest cr)
        {
            try
            {
                User user = await _authenticator.GetUser();

                user.AddPost(new Events(
                    user.Id, cr.Title,
                    cr.Location, cr.Phone,
                    cr.Instagram, cr.Description,
                    'E',
                    cr.EventDate, cr.EventLocation
                    ));

                await _userRepository.Update(user);

                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpGet("/get/user/events")]
        [EndpointSummary("Get all events from user")]
        public async Task<ActionResult> AllFromUser()
        {
            try
            {
                User user = await _authenticator.GetUser();

                List<Events> events = await _postRepository.GetAllE(user.Id);

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

                return StatusCode(200, eventsDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpPatch("/update/user/event")]
        [EndpointSummary("Updates a event post")]
        public async Task<ActionResult> Update([FromBody] EventsDto.EUpdateRequest up)
        {
            try
            {
                User user = await _authenticator.GetUser();

                Events events = await _postRepository.GetE(up.Id, user.Id) ?? throw new ArgumentException("Post not found");

                events.Update(
                    up.Title,
                    up.Location, up.Phone,
                    up.Instagram, up.Description,
                    up.EventDate, up.EventLocation
                    );

                await _postRepository.Update(events);

                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("/delete/user/event/{id}")]
        [EndpointSummary("Delete event from user")]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            try
            {
                User user = await _authenticator.GetUser();

                Events events = await _postRepository.GetE(id, user.Id) ?? throw new ArgumentException("Post not found");

                events.Delete();

                await _postRepository.Update(events);

                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}