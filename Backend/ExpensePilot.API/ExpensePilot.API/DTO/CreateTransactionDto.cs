using ExpensePilot.API.Models;
using System.ComponentModel.DataAnnotations;

namespace ExpensePilot.API.DTO
{
    public class CreateTransactionDto
    {
        
        public int? CategoryId { get; set; }

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
