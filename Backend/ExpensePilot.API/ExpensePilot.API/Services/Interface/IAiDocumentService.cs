using ExpensePilot.API.DTOs.AiDocument;
using Microsoft.AspNetCore.Http;

namespace ExpensePilot.API.Services.Interfaces
{
    public interface IAiDocumentService
    {
        Task<UploadAiDocumentResponseDto> UploadAsync(
            IFormFile file,
            string userId
        );

        Task<List<AiDocumentDto>> GetAllAsync();

        Task<bool> DeleteAsync(Guid id);
    }
}