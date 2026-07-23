using ExpensePilot.API.Data;
using ExpensePilot.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ExpensePilot.API.DTO;
using ExpensePilot.API.DTOs;


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

            var transaction = new Transaction
            {
                UserId = GetUserId(),
                CategoryId = dto.CategoryId,
                Type = dto.Type,
                Amount = dto.Amount,
                TransactionDate = dto.TransactionDate,
                Title = dto.Title,
                Description = dto.Description

            };
            db.Transactions.Add(transaction);
            db.SaveChanges();
            return Ok(transaction);
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
        public IActionResult UpdateTransaction(UpdateTransactionDto dto,int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = GetUserId();

            var t = db.Transactions
                .FirstOrDefault(t => t.TransactionId == id && t.UserId == userId);
            if (t == null)
            {
                return NotFound();
            }
            t.CategoryId = dto.CategoryId;
            t.Type = dto.Type;
            t.Amount = dto.Amount;
            t.TransactionDate = dto.TransactionDate;
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
