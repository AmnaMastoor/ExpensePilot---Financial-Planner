using ExpensePilot.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ExpensePilot.API.DTO;
using ExpensePilot.API.Models;


using ExpensePilot.API.DTOs;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using ExpensePilot.API.DTO.Category;
using ExpensePilot.API.DTO.Transaction;


namespace ExpensePilot.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDbContext db;

        public DashboardController(ApplicationDbContext context)
        {
            db = context;
        }
        private string GetUserId()
        {
            return User.FindFirstValue(ClaimTypes.NameIdentifier);
        }
        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            var userId = GetUserId();

            var now = DateTime.UtcNow;

            var currentMonthStart = new DateTime(
                now.Year,
                now.Month,
                1
            );

            var previousMonthStart = currentMonthStart.AddMonths(-1);

            var transactions = await db.Transactions
                .Where(t => t.UserId == userId)
                .ToListAsync();


            var currentTransactions = transactions
                .Where(t =>
                    t.TransactionDate >= currentMonthStart &&
                    t.TransactionDate < currentMonthStart.AddMonths(1)
                );


            var previousTransactions = transactions
                .Where(t =>
                    t.TransactionDate >= previousMonthStart &&
                    t.TransactionDate < currentMonthStart
                );


            var totalIncome = currentTransactions
     .Where(t => t.Type == TransactionType.Income)
     .Sum(t => t.Amount);

            var totalExpense = currentTransactions
                .Where(t => t.Type == TransactionType.Expense)
                .Sum(t => t.Amount);

            var previousIncome = previousTransactions
                .Where(t => t.Type == TransactionType.Income)
                .Sum(t => t.Amount);

            var previousExpense = previousTransactions
                .Where(t => t.Type == TransactionType.Expense)
                .Sum(t => t.Amount);

            var balance = totalIncome - totalExpense;

            var previousBalance =
                previousIncome - previousExpense;


            return Ok(new
            {
                totalIncome,
                totalExpense,
                balance,

                previousIncome,
                previousExpense,
                previousBalance
            });
        }
        [HttpGet("recent")]
        public async Task<IActionResult> RecentTransaction()
        {
            var userId = GetUserId();

            var transactions = await db.Transactions
                .Include(t => t.Category)
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.TransactionDate)
                .Take(5)
                .Select(t => new RecentTransactionDto
                {
                    Title = t.Title,
                    Category = t.Category != null
                                ? t.Category.Name
                                : "Uncategorized",
                    Amount = t.Amount,
                    Type = t.Type.ToString(),
                    TransactionDate = t.TransactionDate
                })
                .ToListAsync();


            return Ok(transactions);
        }
        
        [HttpGet("expense-chart")]
        public async Task<IActionResult> ExpenseChart()
        {
            var userId = GetUserId();

            var response = await db.Transactions
                .Include(t => t.Category)
                .Where(t => t.UserId == userId && t.Type == TransactionType.Expense)
                .GroupBy(t => t.Category.Name)
                .Select(g => new CategoryExpenseDto
                {
                    Category = g.Key,
                    Amount = g.Sum(t => t.Amount)
                })
                .ToListAsync();

            return Ok(response);
        }
        [HttpGet("status")]
        public async Task<IActionResult> GetBudgetStatus()
        {
            var userId = GetUserId();

            var budgets = await db.Budgets
                .Where(b => b.UserId == userId)
                .Include(b => b.Category)
                .ToListAsync();

            var result = new List<object>();

            foreach (var budget in budgets)
            {
                var spent = await db.Transactions
                    .Where(t => t.UserId == userId &&
                                t.CategoryId == budget.CategoryId &&
                                t.Type == TransactionType.Expense)
                    .SumAsync(t => t.Amount);

                var remaining = budget.BudgetAmount - spent;

                string status;

                if (spent < budget.BudgetAmount)
                    status = "On Track";
                else if (spent == budget.BudgetAmount)
                    status = "Budget Reached";
                else
                    status = "Exceeded";

                var percentage = budget.BudgetAmount == 0
                    ? 0
                    : (spent / budget.BudgetAmount) * 100;

                result.Add(new
                {
                    BudgetId = budget.BudgetId,
                    Category = budget.Category.Name,
                    Budget = budget.BudgetAmount,
                    Spent = spent,
                    Remaining = remaining,
                    Percentage = Math.Round(percentage, 0),
                    Status = status
                });
            }

            return Ok(result);
        }
    }
}