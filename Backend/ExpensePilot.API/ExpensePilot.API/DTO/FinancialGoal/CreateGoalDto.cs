namespace ExpensePilot.API.DTO.FinancialGoal
{
    public class CreateGoalDto
    {
        public string Title { get; set; }

        public string? Description { get; set; }

        public decimal TargetAmount { get; set; }
        public decimal CurrentAmount { get; set; }


        public DateTime TargetDate { get; set; }
    }
}