using ExpensePilot.API.Data;
using ExpensePilot.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ExpensePilot.API.DTOs;
using ExpensePilot.API.DTO.Transaction;
using Microsoft.EntityFrameworkCore;


namespace ExpensePilot.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ApplicationDbContext db;

        public TransactionController(ApplicationDbContext context)
        {
            db = context;
        }
        private string GetUserId()
        {
            return User.FindFirstValue(ClaimTypes.NameIdentifier);
        }
        [HttpGet]
        public IActionResult GetTransaction()
        {
            var userId = GetUserId();

            var transactions = db.Transactions
                .Where(t => t.UserId == userId)
                .ToList();

            return Ok(transactions);
        }
        [HttpGet("{id}")]
        public IActionResult GetTransaction(int id)

        {
            var userId = GetUserId();
            var transaction = db.Transactions
       .FirstOrDefault(t => t.TransactionId == id && t.UserId == userId);
            if (transaction == null)
            {
                return NotFound();
            }
            return Ok(transaction);
        }

        [HttpPost]
        public IActionResult AddTransaction(CreateTransactionDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = GetUserId();

            var transaction = new Transaction
            {
                UserId = userId,
                CategoryId = dto.CategoryId,
                Type = dto.Type,
                Amount = dto.Amount,

                TransactionDate = DateTime.SpecifyKind(
                    dto.TransactionDate,
                    DateTimeKind.Utc
                ),

                Title = dto.Title,
                Description = dto.Description
            };


            db.Transactions.Add(transaction);
            db.SaveChanges();


            bool budgetExceeded = false;
            string warning = null;


            // Budget check only for expense transactions
            if (
                dto.Type == TransactionType.Expense &&
                dto.CategoryId.HasValue
            )
            {

                var budget = db.Budgets
                    .FirstOrDefault(b =>
                        b.UserId == userId &&
                        b.CategoryId == dto.CategoryId
                    );


                if (budget != null)
                {

                    var currentExpense = db.Transactions
                        .Where(t =>
                            t.UserId == userId &&
                            t.CategoryId == dto.CategoryId &&
                            t.Type == TransactionType.Expense &&
                            t.TransactionDate.Month == dto.TransactionDate.Month &&
                            t.TransactionDate.Year == dto.TransactionDate.Year
                        )
                        .Sum(t => t.Amount);



                    if (currentExpense > budget.BudgetAmount)
                    {

                        budgetExceeded = true;


                        var categoryName = db.Categories
                            .Where(c => c.CategoryId == dto.CategoryId)
                            .Select(c => c.Name)
                            .FirstOrDefault();


                        warning =
                            $"{categoryName} budget exceeded. Please increase your budget.";

                    }
                }
            }


            return Ok(new
            {
                transaction,
                budgetExceeded,
                warning
            });
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteTransaction(int id)
        {
            var userId = GetUserId();

            var transaction = db.Transactions
                .FirstOrDefault(t => t.TransactionId == id && t.UserId == userId);
            if (transaction == null)
            {
                return NotFound();
            }
            db.Transactions.Remove(transaction);
            db.SaveChanges();
            return CreatedAtAction(
    nameof(GetTransaction),
    new { id = transaction.TransactionId },
    transaction);
        }
        [HttpPut("{id}")]
        public IActionResult UpdateTransaction(
            UpdateTransactionDto dto,
            int id
        )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = GetUserId();

            var t = db.Transactions
                .FirstOrDefault(t =>
                    t.TransactionId == id &&
                    t.UserId == userId
                );

            if (t == null)
            {
                return NotFound();
            }

            t.CategoryId = dto.CategoryId;
            t.Type = dto.Type;
            t.Amount = dto.Amount;

            t.TransactionDate = DateTime.SpecifyKind(
                dto.TransactionDate,
                DateTimeKind.Utc
            );

            t.Title = dto.Title;
            t.Description = dto.Description;

            db.SaveChanges();

            return Ok(t);
        }
        [HttpGet("income")]
        public IActionResult GetIncome()
        {
            var userId = GetUserId();

            var income = db.Transactions
                .Where(t =>
                    t.UserId == userId &&
                    t.Type == TransactionType.Income)
                .ToList();

            return Ok(income);
        }
        [HttpGet("expense")]
        public IActionResult GetExpense()
        {
            var userId = GetUserId();

            var expense = db.Transactions
                .Where(t =>
                    t.UserId == userId &&
                    t.Type == TransactionType.Expense)
                .ToList();

            return Ok(expense);
        }
        [HttpGet("month/{month}")]
        public IActionResult GetbyMonth(int month)
        {
            if (month < 1 || month > 12)
            {
                return BadRequest("Month must be between 1 and 12.");
            }
            var userId = GetUserId();

            var transaction = db.Transactions.Where(t => t.UserId == userId && t.TransactionDate.Month == month).ToList();
            return Ok(transaction);

        }
        [HttpGet("category/{categoryId}")]
        public IActionResult GetByCategory(int categoryId)
        {
            var userId = GetUserId();
            var transactions = db.Transactions
                .Where(t => t.UserId == userId && t.CategoryId == categoryId)
                .ToList();

            return Ok(transactions);
        }

        [HttpGet("recent")]
        public IActionResult GetRecentTransactions()
        {
            var userId = GetUserId();

            var transactions = db.Transactions
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.TransactionDate)
                .Take(5)
                .ToList();

            return Ok(transactions);
        }

    }
}
