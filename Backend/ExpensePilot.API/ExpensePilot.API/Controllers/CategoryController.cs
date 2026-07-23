using ExpensePilot.API.Data;
using ExpensePilot.API.DTOs;
using ExpensePilot.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ExpensePilot.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoryController(ApplicationDbContext context)
        {
            _context = context;
        }


        private string GetUserId()
        {
            return User.FindFirstValue(
                ClaimTypes.NameIdentifier
            );
        }



        // GET: api/category
        // Default categories + user's custom categories
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var userId = GetUserId();


            var categories = await _context.Categories
                .Where(c =>
                    c.IsDefault ||
                    c.UserId == userId
                )
                .ToListAsync();


            return Ok(categories);
        }



        // GET: api/category/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategory(int id)
        {
            var userId = GetUserId();


            var category = await _context.Categories
                .FirstOrDefaultAsync(c =>
                    c.CategoryId == id &&
                    (
                        c.IsDefault ||
                        c.UserId == userId
                    )
                );


            if (category == null)
                return NotFound();


            return Ok(category);
        }



        // POST: api/category
        // Create custom category
        [HttpPost]
        public async Task<IActionResult> CreateCategory(
            CreateCategoryDto request)
        {
            var userId = GetUserId();


            var category = new Category
            {
                Name = request.Name,
                Description = request.Description,
                Icon = request.Icon,

                UserId = userId,
                IsDefault = false
            };


            _context.Categories.Add(category);

            await _context.SaveChangesAsync();


            return CreatedAtAction(
                nameof(GetCategory),
                new
                {
                    id = category.CategoryId
                },
                category
            );
        }



        // PUT: api/category/{id}
        // Update user's own custom category
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(
            int id,
            CreateCategoryDto request)
        {
            var userId = GetUserId();


            var category = await _context.Categories
                .FirstOrDefaultAsync(c =>
                    c.CategoryId == id &&
                    c.UserId == userId &&
                    !c.IsDefault
                );


            if (category == null)
                return NotFound();


            category.Name = request.Name;
            category.Description = request.Description;
            category.Icon = request.Icon;


            await _context.SaveChangesAsync();


            return NoContent();
        }



        // DELETE: api/category/{id}
        // Admin only
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories
                .FindAsync(id);


            if (category == null)
                return NotFound();


            _context.Categories.Remove(category);

            await _context.SaveChangesAsync();


            return NoContent();
        }
    }
}