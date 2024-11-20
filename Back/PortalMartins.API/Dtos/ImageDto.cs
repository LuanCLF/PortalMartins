namespace PortalMartins.API.Dtos
{
    public class ImageDto
    {
        public record Upload(IFormFile File,  int Id);
        public record Delete(int Id, string Path);
    }
}
