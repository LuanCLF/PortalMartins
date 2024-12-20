﻿
namespace PortalMartins.CORE.Interfaces.IUtilities
{
    public interface IImage
    {
        Task<(int, string)> Upload (string originalName, byte[] buffer, char category, int postId, Guid userId);
        Task Delete (string path);
    }
}
