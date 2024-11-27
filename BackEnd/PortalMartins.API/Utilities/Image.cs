using PortalMartins.CORE.Interfaces.IUtilities;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;

namespace PortalMartins.API.Utilities
{
    public sealed class Image( IConfiguration configuration) : IImage
    {
        private readonly string _token = configuration["Github:token"]!;
        private readonly string _repo = configuration["Github:repo"]!;

         public async Task<(int, string)> Upload(string originalName, byte[] buffer, char category, int postId, Guid userId)
        {
            string base64Content = Convert.ToBase64String(buffer);

            string path = $"{userId}/{category}/{postId}/{originalName}";

            string apiUrl = $"{_repo}/{path}";

            var payload = new
            {
                message = "Adding image via API",
                content = base64Content
            };

            string jsonPayload = JsonSerializer.Serialize(payload);

            HttpClient client = new();

            client.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("PortalMartins", "1.0"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("token", _token);

            HttpResponseMessage checkIfExist = await client.GetAsync(apiUrl);

            if (checkIfExist.IsSuccessStatusCode) return (409, "File already exists");

            HttpResponseMessage response = await client.PutAsync(apiUrl, new StringContent(jsonPayload, Encoding.UTF8, "application/json"));

            if (!response.IsSuccessStatusCode)
            {
                string error = await response.Content.ReadAsStringAsync();
                return (500, $"Error sending the file: {response.StatusCode}, {error}");
            }

            string responseContent = await response.Content.ReadAsStringAsync();
            JsonElement jsonResponse = JsonSerializer.Deserialize<JsonElement>(responseContent);
            string fileUrl = jsonResponse.GetProperty("content").GetProperty("download_url").GetString()!;

            return (200, fileUrl);
        }
        public async Task Delete(string path)
        {
            string apiUrl = $"{_repo}/{path}";

            HttpClient client = new();
            client.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("PortalMartins", "1.0"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("token", _token);

            HttpResponseMessage response = await client.GetAsync(apiUrl);

            if (!response.IsSuccessStatusCode)
            {
                string error = await response.Content.ReadAsStringAsync();
                throw new ArgumentException($"Error fetching the file to delete: {response.StatusCode}, {error}");
            }

            string responseContent = await response.Content.ReadAsStringAsync();
            JsonElement jsonResponse = JsonSerializer.Deserialize<JsonElement>(responseContent);
            string sha = jsonResponse.GetProperty("sha").GetString()!;

            var payload = new
            {
                message = "Deleting Image via API",
                sha
            };

            string jsonPayload = JsonSerializer.Serialize(payload);

            HttpRequestMessage request = new(HttpMethod.Delete, apiUrl)
            {
                Content = new StringContent(jsonPayload, Encoding.UTF8, "application/json")
            };
            response = await client.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                string error = await response.Content.ReadAsStringAsync();
                   throw new ArgumentException($"Error fetching the file to delete: {response.StatusCode}, {error}");
            }
        }
    }
}
