namespace ExpensePilot.API.DTO.FinancialGoal
{
    public class FinancialGoalDto
    {
        public int FinancialGoalId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public decimal TargetAmount { get; set; }

        public decimal CurrentAmount { get; set; }

        public DateTime TargetDate { get; set; }
    }
}