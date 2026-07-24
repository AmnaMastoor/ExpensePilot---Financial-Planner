using ExpensePilot.API.Data;
using ExpensePilot.API.DTO;
using ExpensePilot.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ExpensePilot.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BudgetController : ControllerBase
    {
        private readonly ApplicationDbContext db;

        public BudgetController(ApplicationDbContext context)
        {
            db = context;
        }
        private string GetUserId()
        {
            return User.FindFirstValue(ClaimTypes.NameIdentifier);
        }

        [HttpGet]
        public async Task<IActionResult> GetALLBudget()
        {
            var userid = GetUserId();

            var budget = await db.Budgets.Where(b => b.UserId == userid).ToListAsync();
            return Ok(budget);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBudget(int id)
        {
            var userid = GetUserId();

            var budget = await db.Budgets.Where(b => b.UserId == userid && b.BudgetId == id).ToListAsync();
            return Ok(budget);
        }
        [HttpPost]
        public async Task<IActionResult> AddBudget(BudgetDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (dto.BudgetAmount <= 0)
            {
                return BadRequest("Budget amount must be greater than zero.");
            }

            if (dto.EndDate <= dto.StartDate)
            {
                return BadRequest("End Date must be greater than Start Date.");
            }

            var budget = new Budget
            {
                UserId = GetUserId(),
                CategoryId = dto.CategoryId,
                BudgetAmount = dto.BudgetAmount,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate
            };

            db.Budgets.Add(budget);
            await db.SaveChangesAsync();

            var response = new BudgetDto
            {
                CategoryId = budget.CategoryId,
                BudgetAmount = budget.BudgetAmount,
                StartDate = budget.StartDate,
                EndDate = budget.EndDate
            };

            return CreatedAtAction(
                nameof(GetBudget),
                new { id = budget.BudgetId },
                response
            );
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBudget(int id, BudgetDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = GetUserId();

            var budget = await db.Budgets
                .FirstOrDefaultAsync(b => b.UserId == userId && b.BudgetId == id);

            if (budget == null)
            {
                return NotFound();
            }

            budget.CategoryId = dto.CategoryId;
            budget.BudgetAmount = dto.BudgetAmount;
            budget.StartDate = dto.StartDate;
            budget.EndDate = dto.EndDate;

            await db.SaveChangesAsync();

            var response = new BudgetDto
            {
                CategoryId = budget.CategoryId,
                BudgetAmount = budget.BudgetAmount,
                StartDate = budget.StartDate,
                EndDate = budget.EndDate
            };

            return Ok(response);
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteBudget(int id) 
        {
            var userid= GetUserId();

            var budget = await db.Budgets
                .FirstOrDefaultAsync(b => b.UserId == userid && b.BudgetId == id);
            if(budget == null)
            {
                return NotFound();
            }
            db.Budgets .Remove(budget);
            db.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("category/{categoryId}")]
        public async Task<IActionResult> GetbyCategory(int categoryId)
        {
            var userid= GetUserId();
            var budget = await db.Budgets.Where(b => b.UserId == userid && b.CategoryId == categoryId).ToListAsync();

            return Ok(budget);
        }

        [HttpGet("month/{month}")]
        public async Task<IActionResult> GetMonthlyBudget(int month)
        {
           
            if (month < 1 || month > 12)
            {
                return BadRequest("Month must be between 1 and 12.");
            }
            var userId = GetUserId();
            var currentMonth = DateTime.Now.Month;
            var currentYear = DateTime.Now.Year;

            var budget = await db.Budgets.Where(b => b.UserId == userId && b.StartDate.Month == currentMonth &&
                    b.StartDate.Year == currentYear).ToListAsync();

            return Ok(budget);
        }

        [HttpGet("status/{id}")]
        public async Task<IActionResult> BudgetStatus(int id)
        {
            var userId = GetUserId();

            var budget = await db.Budgets
                .FirstOrDefaultAsync(b => b.BudgetId == id && b.UserId == userId);

            if (budget == null)
            {
                return NotFound();
            }

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

            return Ok(new
            {
                Budget = budget.BudgetAmount,
                Spent = spent,
                Remaining = remaining,
                Status = status
            });
        }
    }
}
