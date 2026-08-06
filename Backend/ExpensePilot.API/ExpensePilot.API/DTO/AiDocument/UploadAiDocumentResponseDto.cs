namespace ExpensePilot.API.DTOs.AiDocument
{
    public class UploadAiDocumentResponseDto
    {
        public Guid Id { get; set; }

        public string FileName { get; set; } = string.Empty;

        public int TotalChunks { get; set; }

        public bool IsProcessed { get; set; }

        public string Message { get; set; } = string.Empty;
    }
}