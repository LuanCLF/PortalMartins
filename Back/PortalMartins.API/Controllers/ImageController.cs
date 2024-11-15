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
    [ApiExplorerSettings(GroupName = "IMAGE")]
    public class ImageController(IAuthenticator authenticator, IImage image, IPostRepository postRepository) : ControllerBase
    {
        private readonly IAuthenticator _authenticator = authenticator;
        private readonly IImage _image = image;
        private readonly IPostRepository _postRepository = postRepository;

        [Authorize]
        [HttpPost("/upload/user/image")]
        [EndpointSummary("Upload an image to a post")]
        public async Task<ActionResult> Upload([FromForm] ImageDto.Upload im)
        {
            try
            {
                User user = await _authenticator.GetUser();

                if (im.File == null || im.File.Length == 0) return BadRequest("Need to submit an image");

                IFormFile file = im.File;

                const long maxFileSize = 5 * 1024 * 1024;
                if (file.Length > maxFileSize) return BadRequest("Maximum allowed size of 5 MB");

                if (!file.ContentType.StartsWith("image/")) return BadRequest("The uploaded file is not a valid image");

                string[] validExtensions = [".jpg", ".jpeg", ".png", ".gif"];
                string fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
                if (!validExtensions.Contains(fileExtension)) return BadRequest("Use only png or jpg");

                MemoryStream memoryStream = new();
                await file.CopyToAsync(memoryStream);
                byte[] buffer = memoryStream.ToArray();

                Post post = await _postRepository.Get(im.Id) ?? throw new ArgumentException("Post not found");
                string path = await _image.Upload(file.FileName, buffer, post.Category, im.Id, user.Id);
                post.AddImage(path);

                await _postRepository.Update(post);
                
                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("/delete/user/image")]
        [EndpointSummary("Delete an image from a post")]
        public async Task<ActionResult> Delete([FromBody] ImageDto.Delete dl)
        {
            try
            {
                Post post = await _postRepository.Get(dl.Id) ?? throw new ArgumentException("Post not found");

                await _image.Delete(dl.Path);

                post.DeleteImage(dl.Path);

                await _postRepository.Update(post);

                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
