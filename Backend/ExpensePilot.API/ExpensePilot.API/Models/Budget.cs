namespace ExpensePilot.API.Models
{
    public class Budget
    {
        public int BudgetId { get; set; }

        public string UserId { get; set; }

        public int CategoryId { get; set; }

        public decimal BudgetAmount { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        // Navigation Properties
        public ApplicationUser? User { get; set; }

        public Category? Category { get; set; }
    }
}
