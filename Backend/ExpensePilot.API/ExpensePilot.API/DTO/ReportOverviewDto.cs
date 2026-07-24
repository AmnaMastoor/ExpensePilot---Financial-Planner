using ExpensePilot.API.DTOs;

namespace ExpensePilot.API.DTO
{
    public class ReportsOverviewDto
    {
        public ReportDto Monthly { get; set; }
        public ReportDto Yearly { get; set; }
        public List<CategoryExpenseDto> CategoryWise { get; set; }
        public DashboardDto IncomeVsExpense { get; set; }
    }
}