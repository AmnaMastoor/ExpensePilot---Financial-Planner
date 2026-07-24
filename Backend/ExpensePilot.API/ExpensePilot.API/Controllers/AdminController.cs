using ExpensePilot.API.Data;
using ExpensePilot.API.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpensePilot.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboard()
        {
            var dashboard = new AdminDashboardDto
            {
                TotalUsers = await _context.Users.CountAsync(),
                TotalTransactions = await _context.Transactions.CountAsync(),
                TotalCategories = await _context.Categories.CountAsync(),
                TotalGoals = await _context.FinancialGoals.CountAsync(),
                TotalBudgets = await _context.Budgets.CountAsync()
            };

            return Ok(dashboard);
        }
    }
}