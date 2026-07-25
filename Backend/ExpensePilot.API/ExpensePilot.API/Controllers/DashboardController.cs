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
        public async Task<IActionResult> Summary()
        {
            var userId = GetUserId();

            var totalIncome = await db.Transactions
                .Where(t => t.UserId == userId && t.Type == TransactionType.Income)
                .SumAsync(t => t.Amount);

            var totalExpenses = await db.Transactions
                .Where(t => t.UserId == userId && t.Type == TransactionType.Expense)
                .SumAsync(t => t.Amount);

            var totalSavings = totalIncome - totalExpenses;

            var response = new DashboardDto
            {
                TotalIncome = totalIncome,
                TotalExpenses = totalExpenses,
                TotalSavings = totalSavings
            };

            return Ok(response);
        }
        [HttpGet("recent")]
        public async Task<IActionResult> RecentTransaction()
        {
            var userId = GetUserId();

            var transactions = await db.Transactions
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.TransactionDate)
                .Take(5)
                .ToListAsync();

            var response = transactions.Select(t => new RecentTransactionDto
            {
                Title = t.Title,
                Category = t.Category?.Name ?? "Uncategorized",
                Amount = t.Amount,
                Type = t.Type.ToString(),
                TransactionDate = t.TransactionDate
            }).ToList();

            return Ok(response);
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