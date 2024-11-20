using Microsoft.AspNetCore.Http.HttpResults;

namespace PortalMartins.API.Dtos
{
    public class UserDto
    {
        public record UGetAllResponse(
            string Name,
            string CameFrom,
            string WhatIsIt,
            DateTime CreatedAt,
            DateTime UpdatedAt
            );
        public record UCreateRequest(
            string Name, 
            string Email,
            string Password,
            string? CameFrom, 
            string? WhatIsIt
            );

        public record ULoginRequest(
            string Email,
            string Password
            );

        public record ULoginResponse(
            string Name, 
            string Email, 
            string Token, 
            DateTime CreatedAt
            );

        public record UUpdateRequest(
            string? Name,
            string? Email,
            string? Password
            );

        public record UDeleteRequest(
            string Password
            );
    }
}
