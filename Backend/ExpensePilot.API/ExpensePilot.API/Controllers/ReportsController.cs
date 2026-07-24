using ExpensePilot.API.Data;
using ExpensePilot.API.DTO;
using ExpensePilot.API.DTOs;
using ExpensePilot.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System.Security.Claims;

namespace ExpensePilot.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly ApplicationDbContext db;

        public ReportsController(ApplicationDbContext context)
        {
            db = context;
        }
        private string GetUserId()
        {
            return User.FindFirstValue(ClaimTypes.NameIdentifier);
        }

        
        private async Task<ReportDto> GetMonthlyReport(int month, int year)
        {
            var userId = GetUserId();

            var transactions = await db.Transactions
                .Include(t => t.Category)
                .Where(t => t.UserId == userId &&
                            t.TransactionDate.Month == month &&
                            t.TransactionDate.Year == year)
                .ToListAsync();

            var totalIncome = transactions
                .Where(t => t.Type == TransactionType.Income)
                .Sum(t => t.Amount);

            var totalExpenses = transactions
                .Where(t => t.Type == TransactionType.Expense)
                .Sum(t => t.Amount);

            var response = new ReportDto
            {
                TotalIncome = totalIncome,
                TotalExpenses = totalExpenses,
                TotalSavings = totalIncome - totalExpenses,

                Transactions = transactions.Select(t => new RecentTransactionDto
                {
                    Title = t.Title,
                    Category = t.Category.Name,
                    Amount = t.Amount,
                    Type = t.Type.ToString(),
                    TransactionDate = t.TransactionDate
                }).ToList()
            };

            return response;
        }
      
        private async Task<ReportDto> GetYearlyReport(int year)
        {
            var userId = GetUserId();

            var transactions = await db.Transactions
                .Include(t => t.Category)
                .Where(t => t.UserId == userId &&
                            t.TransactionDate.Year == year)
                .ToListAsync();

            var totalIncome = transactions
                .Where(t => t.Type == TransactionType.Income)
                .Sum(t => t.Amount);

            var totalExpenses = transactions
                .Where(t => t.Type == TransactionType.Expense)
                .Sum(t => t.Amount);

            var response = new ReportDto
            {
                TotalIncome = totalIncome,
                TotalExpenses = totalExpenses,
                TotalSavings = totalIncome - totalExpenses
            };

            return response;
        }
       
        private async Task<List<CategoryExpenseDto>> GetCategoryWiseReport()
        {
            var userId = GetUserId();

            var response = await db.Transactions
                .Include(t => t.Category)
                .Where(t => t.UserId == userId &&
                            t.Type == TransactionType.Expense)
                .GroupBy(t => t.Category.Name)
                .Select(g => new CategoryExpenseDto
                {
                    Category = g.Key,
                    Amount = g.Sum(t => t.Amount)
                })
                .ToListAsync();

            return response;
        }
       
        private async Task<DashboardDto> GetIncomeVsExpense()
        {
            var userId = GetUserId();

            var totalIncome = await db.Transactions
                .Where(t => t.UserId == userId &&
                            t.Type == TransactionType.Income)
                .SumAsync(t => t.Amount);

            var totalExpenses = await db.Transactions
                .Where(t => t.UserId == userId &&
                            t.Type == TransactionType.Expense)
                .SumAsync(t => t.Amount);

            var response = new DashboardDto
            {
                TotalIncome = totalIncome,
                TotalExpenses = totalExpenses,
                TotalSavings = totalIncome - totalExpenses
            };

            return response;
        }
        [HttpGet("overview")]
        public async Task<IActionResult> Overview()
        {
            var month = DateTime.Now.Month;
            var year = DateTime.Now.Year;


            var response = new ReportsOverviewDto
            {
                Monthly = await GetMonthlyReport(month, year),

                Yearly = await GetYearlyReport(year),

                CategoryWise = await GetCategoryWiseReport(),

                IncomeVsExpense = await GetIncomeVsExpense()
            };


            return Ok(response);
        }
        [HttpGet("pdf")]
        public async Task<IActionResult> DownloadReportPdf()
        {
            var month = DateTime.Now.Month;
            var year = DateTime.Now.Year;

            var report = new ReportsOverviewDto
            {
                Monthly = await GetMonthlyReport(month, year),
                Yearly = await GetYearlyReport(year),
                CategoryWise = await GetCategoryWiseReport(),
                IncomeVsExpense = await GetIncomeVsExpense()
            };


            QuestPDF.Settings.License = LicenseType.Community;


            var pdf = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Margin(30);

                    page.Header()
                        .Text("ExpensePilot Financial Report")
                        .FontSize(22)
                        .Bold();


                    page.Content().Column(column =>
                    {
                        // Monthly Report
                        column.Item()
                            .Text("Monthly Summary")
                            .FontSize(16)
                            .Bold();

                        column.Item()
                            .Text($"Income: {report.Monthly.TotalIncome}");

                        column.Item()
                            .Text($"Expenses: {report.Monthly.TotalExpenses}");

                        column.Item()
                            .Text($"Savings: {report.Monthly.TotalSavings}");


                        column.Item().PaddingVertical(10);


                        // Yearly Report
                        column.Item()
                            .Text("Yearly Summary")
                            .FontSize(16)
                            .Bold();

                        column.Item()
                            .Text($"Income: {report.Yearly.TotalIncome}");

                        column.Item()
                            .Text($"Expenses: {report.Yearly.TotalExpenses}");

                        column.Item()
                            .Text($"Savings: {report.Yearly.TotalSavings}");


                        column.Item().PaddingVertical(10);


                        // Category Wise
                        column.Item()
                            .Text("Category Wise Expenses")
                            .FontSize(16)
                            .Bold();


                        foreach (var item in report.CategoryWise)
                        {
                            column.Item()
                                .Text($"{item.Category} : {item.Amount}");
                        }


                        column.Item().PaddingVertical(10);


                        // Income vs Expense
                        column.Item()
                            .Text("Income Vs Expense")
                            .FontSize(16)
                            .Bold();


                        column.Item()
                            .Text($"Total Income: {report.IncomeVsExpense.TotalIncome}");

                        column.Item()
                            .Text($"Total Expense: {report.IncomeVsExpense.TotalExpenses}");

                        column.Item()
                            .Text($"Savings: {report.IncomeVsExpense.TotalSavings}");

                    });
                });
            });


            var pdfBytes = pdf.GeneratePdf();


            return File(
                pdfBytes,
                "application/pdf",
                "ExpensePilot_Report.pdf"
            );
        }
    }
}
