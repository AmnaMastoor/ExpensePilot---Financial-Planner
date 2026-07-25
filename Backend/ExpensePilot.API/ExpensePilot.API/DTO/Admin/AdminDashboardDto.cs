namespace ExpensePilot.API.DTO
{
    public class AdminDashboardDto
    {
        public int TotalUsers { get; set; }
        public int TotalTransactions { get; set; }
        public int TotalCategories { get; set; }
        public int TotalGoals { get; set; }
        public int TotalBudgets { get; set; }
        public int ActiveUsers { get; set; }
        public int LockedUsers { get; set; }
        public int ActiveCategories { get; set; }
        public int InactiveCategories { get; set; }
    }
}