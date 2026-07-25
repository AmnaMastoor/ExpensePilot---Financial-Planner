namespace ExpensePilot.API.DTO.Budget
{
    public class BudgetDto
    {
        public int CategoryId { get; set; }

        public decimal BudgetAmount { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}