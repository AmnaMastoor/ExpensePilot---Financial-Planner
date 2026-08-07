using ExpensePilot.API.Data;
using ExpensePilot.API.DTOs.AiDocument;
using ExpensePilot.API.Models;
using ExpensePilot.API.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using System.Text.Json;

namespace ExpensePilot.API.Services
{
    public class UserDocumentService : IUserDocumentService
    {
        private readonly ApplicationDbContext _context;
        private readonly HttpClient _httpClient;


        public UserDocumentService(
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
            var content = new MultipartFormDataContent();

            var stream = file.OpenReadStream();

            var fileContent = new StreamContent(stream);

            fileContent.Headers.ContentType =
                new MediaTypeHeaderValue(file.ContentType);


            content.Add(
                fileContent,
                "file",
                file.FileName
            );


            var response = await _httpClient.PostAsync(
                "/documents/upload",
                content
            );


            response.EnsureSuccessStatusCode();


            var json = await response.Content.ReadAsStringAsync();


            var fastApiResponse =
                JsonSerializer.Deserialize<FastApiUploadResponseDto>(
                    json,
                    new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });


            if (fastApiResponse == null)
                throw new Exception("FastAPI response null");



            var document = new AiDocument
            {
                FileName = file.FileName,
                StoredFileName = fastApiResponse.StoredName,
                ContentType = file.ContentType,
                FileSize = file.Length,
                TotalChunks = fastApiResponse.Chunks,
                IsProcessed = true,
                UploadedAt = DateTime.UtcNow,

                // user document
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




        public async Task<List<AiDocumentDto>> GetMyDocumentsAsync(
            string userId)
        {
            return await _context.Documents
                .Where(x => x.UserId == userId)
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




        public async Task<bool> DeleteAsync(
            Guid id,
            string userId)
        {
            var document = await _context.Documents
                .FirstOrDefaultAsync(
                    x => x.Id == id &&
                         x.UserId == userId
                );


            if (document == null)
                return false;



            _context.Documents.Remove(document);

            await _context.SaveChangesAsync();


            return true;
        }
    }
}