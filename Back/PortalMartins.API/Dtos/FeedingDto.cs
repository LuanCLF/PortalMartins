namespace PortalMartins.API.Dtos
{
    public class FeedingDto
    {
        public record FCreateRequest(
            string Title,
            string Location,
            string? Phone,
            string? Instagram,
            string? Description,
            string Type,
            bool Wifi,
            bool Delivery,
            bool Parking
            );
        public record FUpdateRequest
        (
            int Id,
            string? Title,
            string? Location,
            string? Phone,
            string? Instagram,
            string? Description,
            string? Type,
            bool? Wifi,
            bool? Delivery,
            bool? Parking
        );
        public record class FGetAllResponse
        (
            int Id,
            string Title,
            string Location,
            string Phone,
            string Instagram,
            float Classification,
            string Description,
            string[] Images,
            string Type,
            bool Wifi,
            bool Delivery,
            bool Parking,
            DateTime CreatedAt,
            DateTime UpdatedAt
        );
    }
}