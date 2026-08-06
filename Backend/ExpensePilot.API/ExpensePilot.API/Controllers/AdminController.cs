using ExpensePilot.API.Data;
using ExpensePilot.API.DTO.Report;
using ExpensePilot.API.DTO;
using ExpensePilot.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExpensePilot.API.Services.Interfaces;

namespace ExpensePilot.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAiDocumentService _aiDocumentService;

        public AdminController(
    ApplicationDbContext context,
    UserManager<ApplicationUser> userManager,
    IAiDocumentService aiDocumentService)
        {
            _context = context;
            _userManager = userManager;
            _aiDocumentService = aiDocumentService;
        }

        // Dashboard
        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboard()
        {
            var dashboard = new AdminDashboardDto
            {
                TotalUsers = await _context.Users.CountAsync(),

                ActiveUsers = await _context.Users.CountAsync(u =>
                    !u.LockoutEnd.HasValue ||
                    u.LockoutEnd <= DateTimeOffset.UtcNow),

                LockedUsers = await _context.Users.CountAsync(u =>
                    u.LockoutEnd.HasValue &&
                    u.LockoutEnd > DateTimeOffset.UtcNow),

                TotalTransactions = await _context.Transactions.CountAsync(),

                TotalCategories = await _context.Categories.CountAsync(),

                ActiveCategories = await _context.Categories.CountAsync(c =>
                    c.IsActive),

                InactiveCategories = await _context.Categories.CountAsync(c =>
                    !c.IsActive),

                TotalGoals = await _context.FinancialGoals.CountAsync(),

                TotalBudgets = await _context.Budgets.CountAsync()
            };

            return Ok(dashboard);
        }

        // Get All Users
        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.ToListAsync();

            var result = new List<UserDto>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);

                result.Add(new UserDto
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    Role = roles.FirstOrDefault() ?? "User",
                    EmailConfirmed = user.EmailConfirmed,
                    IsLocked = user.LockoutEnd.HasValue &&
                               user.LockoutEnd > DateTimeOffset.UtcNow
                });
            }

            return Ok(result);
        }

        // Get User By Id
        [HttpGet("users/{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
                return NotFound(new { message = "User not found." });

            var roles = await _userManager.GetRolesAsync(user);

            return Ok(new UserDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                Role = roles.FirstOrDefault() ?? "User",
                EmailConfirmed = user.EmailConfirmed,
                IsLocked = user.LockoutEnd.HasValue &&
                           user.LockoutEnd > DateTimeOffset.UtcNow
            });
        }

        // Lock User
        [HttpPut("users/{id}/lock")]
        public async Task<IActionResult> LockUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
                return NotFound(new { message = "User not found." });

            if (await _userManager.IsInRoleAsync(user, "Admin"))
                return BadRequest(new { message = "Admin account cannot be locked." });

            user.LockoutEnd = DateTimeOffset.UtcNow.AddYears(100);

            await _userManager.UpdateAsync(user);

            return Ok(new
            {
                message = "User locked successfully."
            });
        }

        // Unlock User
        [HttpPut("users/{id}/unlock")]
        public async Task<IActionResult> UnlockUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
                return NotFound(new { message = "User not found." });

            user.LockoutEnd = null;

            await _userManager.UpdateAsync(user);

            return Ok(new
            {
                message = "User unlocked successfully."
            });
        }

        // Delete User
        [HttpDelete("users/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
                return NotFound(new { message = "User not found." });

            if (await _userManager.IsInRoleAsync(user, "Admin"))
                return BadRequest(new { message = "Admin account cannot be deleted." });

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new
            {
                message = "User deleted successfully."
            });
        }

        [HttpPost("documents")]
        public async Task<IActionResult> UploadDocument(
    IFormFile file)
        {
            var userId = _userManager.GetUserId(User);

            if (userId == null)
                return Unauthorized();

            var result = await _aiDocumentService.UploadAsync(
                file,
                userId
            );

            return Ok(result);
        }

        [HttpGet("documents")]
        public async Task<IActionResult> GetDocuments()
        {
            var documents = await _aiDocumentService.GetAllAsync();

            return Ok(documents);
        }

        [HttpDelete("documents/{id}")]
        public async Task<IActionResult> DeleteDocument(
    Guid id)
        {
            var deleted = await _aiDocumentService.DeleteAsync(id);

            if (!deleted)
                return NotFound();

            return Ok(new
            {
                message = "Document deleted successfully."
            });
        }
    }
}