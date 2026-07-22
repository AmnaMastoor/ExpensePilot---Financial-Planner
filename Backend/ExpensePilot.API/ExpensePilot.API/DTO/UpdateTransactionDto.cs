using ExpensePilot.API.Models;
using System.ComponentModel.DataAnnotations;

namespace ExpensePilot.API.DTOs
{
    public class UpdateTransactionDto
    {
        [Required]
        public int CategoryId { get; set; }

        [Required]
        public TransactionType Type { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public DateTime TransactionDate { get; set; }

        [Required]
        public string Title { get; set; }

        public string? Description { get; set; }
    }
}