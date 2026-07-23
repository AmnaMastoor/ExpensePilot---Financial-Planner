namespace ExpensePilot.API.DTO
{
    public class CreateGoalDto
    {
        public string Title { get; set; }

        public string? Description { get; set; }

        public decimal TargetAmount { get; set; }

        public DateTime TargetDate { get; set; }
    }
}