using ExpensePilot.API.Data;
using ExpensePilot.API.DTO;
using ExpensePilot.API.DTO.Category;
using ExpensePilot.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpensePilot.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminCategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminCategoryController(ApplicationDbContext context)
        {
            _context = context;
        }


        // Get all default categories
        [HttpGet]
        public async Task<IActionResult> GetDefaultCategories()
        {
            var categories = await _context.Categories
                .Where(c => c.IsDefault)
                .OrderBy(c => c.Name)
                .ToListAsync();

            return Ok(categories);
        }


        // Create default category
        [HttpPost]
        public async Task<IActionResult> CreateCategory(CreateCategoryDto request)
        {
            var category = new Category
            {
                Name = request.Name,
                Description = request.Description,
                Icon = request.Icon,
                IsDefault = true,
                IsActive = true,
                UserId = null
            };


            _context.Categories.Add(category);

            await _context.SaveChangesAsync();


            return Ok(new
            {
                message = "Default category created successfully",
                category
            });
        }


        // Update default category
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(
            int id,
            UpdateCategoryDto request)
        {
            var category = await _context.Categories
                .FirstOrDefaultAsync(c =>
                    c.CategoryId == id &&
                    c.IsDefault);


            if (category == null)
            {
                return NotFound(new
                {
                    message = "Default category not found"
                });
            }


            category.Name = request.Name;
            category.Description = request.Description;
            category.Icon = request.Icon;


            await _context.SaveChangesAsync();


            return Ok(new
            {
                message = "Category updated successfully"
            });
        }


        // Deactivate category
        [HttpPut("{id}/deactivate")]
        public async Task<IActionResult> DeactivateCategory(int id)
        {
            var category = await _context.Categories
                .FirstOrDefaultAsync(c =>
                    c.CategoryId == id &&
                    c.IsDefault);


            if (category == null)
            {
                return NotFound(new
                {
                    message = "Default category not found"
                });
            }


            category.IsActive = false;

            await _context.SaveChangesAsync();


            return Ok(new
            {
                message = "Category deactivated successfully"
            });
        }


        // Activate category
        [HttpPut("{id}/activate")]
        public async Task<IActionResult> ActivateCategory(int id)
        {
            var category = await _context.Categories
                .FirstOrDefaultAsync(c =>
                    c.CategoryId == id &&
                    c.IsDefault);


            if (category == null)
            {
                return NotFound(new
                {
                    message = "Default category not found"
                });
            }


            category.IsActive = true;

            await _context.SaveChangesAsync();


            return Ok(new
            {
                message = "Category activated successfully"
            });
        }
    }
}