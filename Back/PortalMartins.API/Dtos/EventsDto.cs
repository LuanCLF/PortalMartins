namespace PortalMartins.API.Dtos
{
    public class EventsDto
    {
        public record ECreateRequest(
            string Title,
            string Location,
            string? Phone,
            string? Instagram,
            string? Description,
            string? EventDate,
            string? EventLocation
            );
        public record EUpdateRequest
        (
            int Id,
            string? Title,
            string? Location,
            string? Phone,
            string? Instagram,
            string? Description,
            string? EventDate,
            string? EventLocation
        );
        public record EGetAllResponse
        (
            int Id,
            string Title,
            string Location,
            string Phone,
            string Instagram,
            float  Classification,
            string Description,
            string[] Images,
            string EventDate,
            string EventLocation,
            DateTime CreatedAt,
            DateTime UpdatedAt
        );
    }
}
