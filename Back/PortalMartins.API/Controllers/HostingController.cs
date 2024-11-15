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
    [ApiExplorerSettings(GroupName = "HOSTING")]
    public class HostingController(IAuthenticator authenticator, IUserRepository userRepository, IPostRepository postRepository) : ControllerBase
    {
        private readonly IAuthenticator _authenticator = authenticator;
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IPostRepository _postRepository = postRepository;

        [HttpGet("/get/hostings")]
        [EndpointSummary("Get all hostings")]

        public async Task<ActionResult> All()
        {
            try
            {
                List<Hosting> hostings = await _postRepository.GetAllH();

                List<HostingDto.HGetAllResponse> hostingsDto = 
                    hostings.Select(h => new HostingDto.HGetAllResponse(
                    Id: h.Id,
                    Title: h.Title,
                    Location: h.Location,
                    Phone: h.Phone,
                    Instagram: h.Instagram,
                    Classification: h.Classification,
                    Description: h.Description,
                    Images: h.Images,
                    Bedrooms: h.Bedrooms,
                    Bathroom: h.Bathroom,
                    Vacancy: h.Vacancy,
                    ServiceArea: h.ServiceArea,
                    Kitchen: h.Kitchen,
                    Garden: h.Garden,
                    CreatedAt: h.CreatedAt,
                    UpdatedAt: h.UpdatedAt
                    )).ToList();

                return StatusCode(200, hostingsDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpPost("/create/user/hosting")]
        [EndpointSummary("Registers a hosting post")]
        public async Task<ActionResult> Create([FromBody] HostingDto.HCreateRequest cr)
        {
            try
            {
                User user = await _authenticator.GetUser();

                user.AddPost(new Hosting(
                    user.Id, cr.Title,
                    cr.Location, cr.Phone,
                    cr.Instagram, cr.Description,
                    'H',
                    cr.Bedrooms, cr.Bathroom,
                    cr.Vacancy, cr.ServiceArea,
                    cr.Kitchen, cr.Garden
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
        [HttpGet("/get/user/hostings")]
        [EndpointSummary("Get all hostings from user")]
        public async Task<ActionResult> AllFromUser()
        {
            try
            {
                User user = await _authenticator.GetUser();

                List<Hosting> hostings = await _postRepository.GetAllH(user.Id);

                List<HostingDto.HGetAllResponse> hostingsDto = hostings.Select(h => new HostingDto.HGetAllResponse(
                    Id: h.Id,
                    Title: h.Title,
                    Location: h.Location,
                    Phone: h.Phone,
                    Instagram: h.Instagram,
                    Classification: h.Classification,
                    Description: h.Description,
                    Images: h.Images,
                    Bedrooms: h.Bedrooms,
                    Bathroom: h.Bathroom,
                    Vacancy: h.Vacancy,
                    ServiceArea: h.ServiceArea,
                    Kitchen: h.Kitchen,
                    Garden: h.Garden,
                    CreatedAt: h.CreatedAt,
                    UpdatedAt: h.UpdatedAt
                    )).ToList();

                return StatusCode(200, hostingsDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpPatch("/update/user/hosting")]
        [EndpointSummary("Updates a hosting post")]
        public async Task<ActionResult> Update([FromBody] HostingDto.HUpdateRequest up)
        {
            try
            {
                User user = await _authenticator.GetUser();

                Hosting hosting = await _postRepository.GetH(up.Id, user.Id) ?? throw new ArgumentException("Post not found");

                hosting.Update(
                    up.Title,
                    up.Location, up.Phone,
                    up.Instagram, up.Description,
                    up.Bedrooms, up.Bathroom,
                    up.Vacancy, up.ServiceArea,
                    up.Kitchen, up.Garden
                    );

                await _postRepository.Update(hosting);

                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("/delete/user/hosting/{id}")]
        [EndpointSummary("Delete hosting from user")]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            try
            {
                User user = await _authenticator.GetUser();

                Hosting hosting = await _postRepository.GetH(id, user.Id) ?? throw new ArgumentException("Post not found");

                hosting.Delete();

                await _postRepository.Update(hosting);

                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
