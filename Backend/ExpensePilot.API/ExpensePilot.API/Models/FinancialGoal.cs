namespace ExpensePilot.API.Models
{
    public class FinancialGoal
    {
        public int FinancialGoalId { get; set; }

        public string Title { get; set; }

        public string? Description { get; set; }

        public decimal TargetAmount { get; set; }

        public decimal CurrentAmount { get; set; }

        public DateTime TargetDate { get; set; }


        public string UserId { get; set; }

        public ApplicationUser User { get; set; }
    }
}