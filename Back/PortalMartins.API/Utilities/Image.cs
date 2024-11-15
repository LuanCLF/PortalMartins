using PortalMartins.CORE.Interfaces.IUtilities;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;

namespace PortalMartins.API.Utilities
{
    public sealed class Image(IHttpContextAccessor httpContext, IConfiguration configuration) : IImage
    {
        private readonly IHttpContextAccessor _httpContext = httpContext;
        private readonly string _token = configuration["Github:token"]!;
        private readonly string _repo = configuration["Github:repo"]!;

        public async Task<string> Upload(string originalName, byte[] buffer, char category, int postId, Guid userId)
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

            if (checkIfExist.IsSuccessStatusCode) throw new ArgumentException("Uploaded");

            HttpResponseMessage response = await client.PutAsync(apiUrl, new StringContent(jsonPayload, Encoding.UTF8, "application/json"));

            if (!response.IsSuccessStatusCode)
            {
                string error = await response.Content.ReadAsStringAsync();
                throw new Exception($"Error sending the file: {response.StatusCode}, {error}");
            }

            string responseContent = await response.Content.ReadAsStringAsync();
            JsonElement jsonResponse = JsonSerializer.Deserialize<JsonElement>(responseContent);
            string fileUrl = jsonResponse.GetProperty("content").GetProperty("html_url").GetString()!;

            return path;
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
                throw new Exception($"Error fetching the file to delete: {response.StatusCode}, {error}");
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
                throw new Exception($"Error deleting the file: {response.StatusCode}, {error}");
            }
        }
    }
}
//import { Request, Response } from "express";
//import { ImageHostingService } from "../service/utils";
//import { error } from "../../domain/error";
//import { getEvent, updateEvent } from "../../infra/event";
//import { getFood, updateFood } from "../../infra/food";
//import { getHosp, updateHosp } from "../../infra/hosp";

//const updateEventImages = async(id: string, imageUrl: string) => {
//  const post = await getEvent(id);
//if (!post) throw new error("Post not found", 404);

//const exist = post.images.some((image: string) => image == imageUrl);

//if (!exist)
//{
//    post.images.push(imageUrl);
//    await updateEvent(id, post);
//}
//}

//const updadteHospImages = async(id: string, imageUrl: string) => {
//  const post = await getHosp(id);
//if (!post) throw new error("Post not found", 404);

//const exist = post.images.some((image: string) => image == imageUrl);

//if (!exist)
//{
//    post.images.push(imageUrl);
//    await updateHosp(id, post);
//}
//}

//const updateFoodImages = async(id: string, imageUrl: string) => {
//  const post = await getFood(id);
//if (!post) throw new error("Post not found", 404);

//const exist = post.images.some((image: string) => image == imageUrl);

//if (!exist)
//{
//    post.images.push(imageUrl);
//    await updateFood(id, post);
//}
//}

