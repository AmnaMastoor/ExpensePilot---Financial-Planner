using System.ComponentModel.DataAnnotations;

namespace ExpensePilot.API.Models
{
    public class AiDocument
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string FileName { get; set; } = string.Empty;

        [Required]
        public string StoredFileName { get; set; } = string.Empty;

        public string? ContentType { get; set; }

        public long FileSize { get; set; }

        public int TotalChunks { get; set; }

        public bool IsProcessed { get; set; } = false;

        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

        public string? UserId { get; set; }

        public ApplicationUser? User { get; set; }

        public DocumentType Type { get; set; }
    }

    public enum DocumentType
    {
        AdminKnowledge = 1,
        UserDocument = 2
    }
}