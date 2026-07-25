using ExpensePilot.API.DTO.Category;
using ExpensePilot.API.DTO.Transaction;

namespace ExpensePilot.API.DTO.Report
{
    public class ReportDto
    {
        public decimal TotalIncome { get; set; }
        public decimal TotalExpenses { get; set; }
        public decimal TotalSavings { get; set; }

        public List<RecentTransactionDto> Transactions { get; set; } = new();

        public List<CategoryExpenseDto> CategoryWise { get; set; } = new();
    }
}