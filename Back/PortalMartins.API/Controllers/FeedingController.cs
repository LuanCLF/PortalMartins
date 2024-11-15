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
        public async Task<ActionResult> All()
        {
            try
            {
                List<Feeding> feeding = await _postRepository.GetAllF();

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

                return StatusCode(200, feedingDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpPost("/create/user/feeding")]
        [EndpointSummary("Registers a feeding post")]
        public async Task<ActionResult> Create([FromBody] FeedingDto.FCreateRequest cr)
        {
            try
            {
                User user = await _authenticator.GetUser();

                user.AddPost(new Feeding(
                    user.Id, cr.Title,
                    cr.Location, cr.Phone,
                    cr.Instagram, cr.Description,
                    'F',
                    cr.Type, cr.Wifi,
                    cr.Delivery, cr.Parking
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
        [HttpGet("/get/user/feedings")]
        [EndpointSummary("Get all feedings from user")]
        public async Task<ActionResult> AllFromUser()
        {
            try
            {
                User user = await _authenticator.GetUser();

                List<Feeding> feedings = await _postRepository.GetAllF(user.Id);

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

                return StatusCode(200, feedingsDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpPatch("/update/user/feeding")]
        [EndpointSummary("Updates a feeding post")]
        public async Task<ActionResult> Update([FromBody] FeedingDto.FUpdateRequest ur)
        {
            try
            {
                User user = await _authenticator.GetUser();

                Feeding feeding = await _postRepository.GetF(ur.Id, user.Id) ?? throw new ArgumentException("Post not found");

                feeding.Update(
                    ur.Title, ur.Location,
                    ur.Phone, ur.Instagram,
                    ur.Description, ur.Type,
                    ur.Wifi, ur.Delivery,
                    ur.Parking
                    );

                await _postRepository.Update(feeding);

                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("/delete/user/feeding/{id}")]
        [EndpointSummary("Deletes a feeding post")]

        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            try
            {
                Guid uId = await _authenticator.GetId();

                Feeding feeding = await _postRepository.GetF(id, uId) ?? throw new ArgumentException("Post not found");

                feeding.Delete();

                await _postRepository.Update(feeding);

                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
