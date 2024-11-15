namespace PortalMartins.API.Dtos
{
    public class HostingDto
    {
        public record HCreateRequest(
            string Title,
            string Location,
            string? Phone,
            string? Instagram,
            string? Description,
            int Bedrooms,
            int Bathroom,
            int Vacancy,
            bool ServiceArea,
            bool Kitchen,
            bool Garden
        );
        public record HUpdateRequest
        (
           int Id,
           string? Title,
           string? Location,
           string? Phone,
           string? Instagram,
           string? Description,
           int? Bedrooms,
           int? Bathroom,
           int? Vacancy,
           bool? ServiceArea,
           bool? Kitchen,
           bool? Garden
       );

        public record HGetAllResponse
        (
            int Id,
            string Title,
            string Location,
            string Phone,
            string Instagram,
            float Classification,
            string Description,
            string[] Images,
            int Bedrooms,
            int Bathroom,
            int Vacancy,
            bool ServiceArea,
            bool Kitchen,
            bool Garden,
            DateTime CreatedAt,
            DateTime UpdatedAt
        );
    }
}