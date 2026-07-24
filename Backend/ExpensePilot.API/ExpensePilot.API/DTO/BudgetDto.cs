using System.ComponentModel.DataAnnotations;

namespace ExpensePilot.API.DTO
{
    public class BudgetDto
    {
        [Required]
        public int CategoryId { get; set; }

        [Required]
        public decimal BudgetAmount { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }
    }
}
