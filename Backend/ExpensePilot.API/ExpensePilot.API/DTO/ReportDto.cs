using ExpensePilot.API.DTO;

namespace ExpensePilot.API.DTOs
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