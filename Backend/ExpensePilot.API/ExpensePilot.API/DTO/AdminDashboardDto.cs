namespace ExpensePilot.API.DTO
{
    public class AdminDashboardDto
    {
        public int TotalUsers { get; set; }
        public int TotalTransactions { get; set; }
        public int TotalCategories { get; set; }
        public int TotalGoals { get; set; }
        public int TotalBudgets { get; set; }
    }
}