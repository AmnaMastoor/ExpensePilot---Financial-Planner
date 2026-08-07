using ExpensePilot.API.DTOs.AiDocument;
using Microsoft.AspNetCore.Http;

namespace ExpensePilot.API.Services.Interfaces
{
    public interface IUserDocumentService
    {
        Task<UploadAiDocumentResponseDto> UploadAsync(
            IFormFile file,
            string userId
        );

        Task<List<AiDocumentDto>> GetMyDocumentsAsync(
            string userId
        );

        Task<bool> DeleteAsync(
            Guid id,
            string userId
        );
    }
}