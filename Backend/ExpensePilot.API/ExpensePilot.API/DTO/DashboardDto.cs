using ExpensePilot.API.DTO.Category;
using ExpensePilot.API.DTO.Transaction;

namespace ExpensePilot.API.DTOs
{
    public class DashboardDto
    {
        public decimal TotalIncome { get; set; }
        public decimal TotalExpenses { get; set; }
        public decimal TotalSavings { get; set; }

        public List<RecentTransactionDto> RecentTransactions { get; set; } = new();

        public List<CategoryExpenseDto> ExpenseChart { get; set; } = new();
    }
}