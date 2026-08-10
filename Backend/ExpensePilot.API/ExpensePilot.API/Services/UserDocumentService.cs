
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

        // =====================================================
        // UPLOAD
        // =====================================================

        public async Task<UploadAiDocumentResponseDto> UploadAsync(
            IFormFile file,
            string userId)
        {
            // Generate the ONE ID that will be used everywhere
            var documentId = Guid.NewGuid();

            using var content =
                new MultipartFormDataContent();

            using var stream =
                file.OpenReadStream();

            using var fileContent =
                new StreamContent(stream);

            fileContent.Headers.ContentType =
                new MediaTypeHeaderValue(
                    file.ContentType
                );

            // File
            content.Add(
                fileContent,
                "file",
                file.FileName
            );

            // User ID
            content.Add(
                new StringContent(userId),
                "user_id"
            );

            // DOCUMENT ID
            content.Add(
                new StringContent(
                    documentId.ToString()
                ),
                "document_id"
            );

            // Send to FastAPI
            var response =
                await _httpClient.PostAsync(
                    "user/documents/upload",
                    content
                );

            var json =
                await response.Content
                    .ReadAsStringAsync();

            Console.WriteLine(
                "================================="
            );

            Console.WriteLine(
                $"FastAPI Upload Status: {(int)response.StatusCode}"
            );

            Console.WriteLine(
                $"FastAPI Upload Response: {json}"
            );

            Console.WriteLine(
                "================================="
            );

            response.EnsureSuccessStatusCode();

            var fastApiResponse =
                JsonSerializer.Deserialize<
                    FastApiUploadResponseDto
                >(
                    json,
                    new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    }
                );

            if (fastApiResponse == null)
            {
                throw new Exception(
                    "FastAPI response was null."
                );
            }

            // =================================================
            // Save document in PostgreSQL
            // =================================================

            var document = new AiDocument
            {
                // IMPORTANT:
                // Same ID sent to FastAPI
                Id = documentId,

                FileName = file.FileName,

                StoredFileName =
                    fastApiResponse.StoredName,

                ContentType = file.ContentType,

                FileSize = file.Length,

                TotalChunks =
                    fastApiResponse.Chunks,

                IsProcessed = true,

                UploadedAt =
                    DateTime.UtcNow,

                UserId = userId
            };

            _context.Documents.Add(document);

            await _context.SaveChangesAsync();

            return new UploadAiDocumentResponseDto
            {
                Id = document.Id,

                FileName =
                    document.FileName,

                TotalChunks =
                    document.TotalChunks,

                IsProcessed =
                    document.IsProcessed,

                Message =
                    fastApiResponse.Message
            };
        }

        // =====================================================
        // GET USER DOCUMENTS
        // =====================================================

        public async Task<List<AiDocumentDto>>
            GetMyDocumentsAsync(
                string userId)
        {
            return await _context.Documents

                .Where(x =>
                    x.UserId == userId
                )

                .OrderByDescending(
                    x => x.UploadedAt
                )

                .Select(x =>
                    new AiDocumentDto
                    {
                        Id = x.Id,

                        FileName =
                            x.FileName,

                        FileSize =
                            x.FileSize,

                        TotalChunks =
                            x.TotalChunks,

                        IsProcessed =
                            x.IsProcessed,

                        UploadedAt =
                            x.UploadedAt
                    }
                )

                .ToListAsync();
        }

        // =====================================================
        // DELETE BY ID ONLY
        // =====================================================

        public async Task<bool> DeleteAsync(
            Guid id,
            string userId)
        {
            // Find only this user's document
            var document =
                await _context.Documents
                    .FirstOrDefaultAsync(
                        x =>
                            x.Id == id &&
                            x.UserId == userId
                    );

            if (document == null)
                return false;

            // =================================================
            // Delete from FastAPI
            // =================================================

            var url =
                $"user/documents/{id}" +
                $"?user_id={Uri.EscapeDataString(userId)}";

            Console.WriteLine(
                "================================="
            );

            Console.WriteLine(
                "USER DOCUMENT DELETE"
            );

            Console.WriteLine(
                $"Document ID: {id}"
            );

            Console.WriteLine(
                $"User ID: {userId}"
            );

            Console.WriteLine(
                $"FastAPI URL: {url}"
            );

            Console.WriteLine(
                $"Base Address: {_httpClient.BaseAddress}"
            );

            Console.WriteLine(
                "================================="
            );

            var response =
                await _httpClient.DeleteAsync(url);

            var responseBody =
                await response.Content
                    .ReadAsStringAsync();

            Console.WriteLine(
                $"FastAPI Status: {(int)response.StatusCode}"
            );

            Console.WriteLine(
                $"FastAPI Response: {responseBody}"
            );

            // If RAG deletion fails,
            // don't delete DB record
            response.EnsureSuccessStatusCode();

            // =================================================
            // Delete PostgreSQL record
            // =================================================

            _context.Documents.Remove(document);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}

