using ExpensePilot.API.Data;
using ExpensePilot.API.DTOs.AiDocument;
using ExpensePilot.API.Models;
using ExpensePilot.API.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using System.Text.Json;
using System.IO;

namespace ExpensePilot.API.Services
{
    public class AiDocumentService : IAiDocumentService
    {
        private readonly ApplicationDbContext _context;
        private readonly HttpClient _httpClient;

        public AiDocumentService(
            ApplicationDbContext context,
            HttpClient httpClient)
        {
            _context = context;
            _httpClient = httpClient;
        }

        public async Task<UploadAiDocumentResponseDto> UploadAsync(
    IFormFile file,
    string userId)
        {
            using var content = new MultipartFormDataContent();

            var stream = file.OpenReadStream();

            var fileContent = new StreamContent(stream);

            fileContent.Headers.ContentType =
                new MediaTypeHeaderValue(file.ContentType);

            content.Add(
                fileContent,
                "file",
                file.FileName
            );

            // IMPORTANT:
            // FastAPI /user/documents/upload requires user_id
            content.Add(
                new StringContent(userId),
                "user_id"
            );

            var response = await _httpClient.PostAsync(
                "/user/documents/upload",
                content
            );

            var responseBody =
                await response.Content.ReadAsStringAsync();

            Console.WriteLine("========== FASTAPI UPLOAD ==========");
            Console.WriteLine($"Status: {(int)response.StatusCode}");
            Console.WriteLine(responseBody);
            Console.WriteLine("====================================");

            response.EnsureSuccessStatusCode();

            var fastApiResponse =
                JsonSerializer.Deserialize<FastApiUploadResponseDto>(
                    responseBody,
                    new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

            if (fastApiResponse == null)
                throw new Exception("FastAPI response was null.");

            var document = new AiDocument
            {
                FileName = file.FileName,
                StoredFileName = fastApiResponse.StoredName,
                ContentType = file.ContentType,
                FileSize = file.Length,
                TotalChunks = fastApiResponse.Chunks,
                IsProcessed = true,
                UploadedAt = DateTime.UtcNow,
                UserId = userId
            };

            _context.Documents.Add(document);

            await _context.SaveChangesAsync();

            return new UploadAiDocumentResponseDto
            {
                Id = document.Id,
                FileName = document.FileName,
                TotalChunks = document.TotalChunks,
                IsProcessed = document.IsProcessed,
                Message = fastApiResponse.Message
            };
        }
        public async Task<List<AiDocumentDto>> GetAllAsync()
        {
            return await _context.Documents
                .OrderByDescending(x => x.UploadedAt)
                .Select(x => new AiDocumentDto
                {
                    Id = x.Id,
                    FileName = x.FileName,
                    FileSize = x.FileSize,
                    TotalChunks = x.TotalChunks,
                    IsProcessed = x.IsProcessed,
                    UploadedAt = x.UploadedAt
                })
                .ToListAsync();
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var document = await _context.Documents
                .FirstOrDefaultAsync(x => x.Id == id);

            if (document == null)
                return false;

            var documentId = Path.GetFileNameWithoutExtension(document.StoredFileName);

            var url = $"documents/{documentId}/{document.StoredFileName}";

            Console.WriteLine("=================================");
            Console.WriteLine($"StoredFileName : {document.StoredFileName}");
            Console.WriteLine($"DocumentId     : {documentId}");
            Console.WriteLine($"DELETE URL     : {url}");
            Console.WriteLine($"BaseAddress    : {_httpClient.BaseAddress}");
            Console.WriteLine("=================================");

            var response = await _httpClient.DeleteAsync(url);

            var responseBody = await response.Content.ReadAsStringAsync();

            Console.WriteLine($"Status Code : {(int)response.StatusCode}");
            Console.WriteLine(responseBody);

            response.EnsureSuccessStatusCode();

            _context.Documents.Remove(document);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}