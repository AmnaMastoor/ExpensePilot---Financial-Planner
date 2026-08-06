namespace ExpensePilot.API.DTOs.AiDocument
{
    public class AiDocumentDto
    {
        public Guid Id { get; set; }

        public string FileName { get; set; } = string.Empty;

        public long FileSize { get; set; }

        public int TotalChunks { get; set; }

        public bool IsProcessed { get; set; }

        public DateTime UploadedAt { get; set; }
    }
}