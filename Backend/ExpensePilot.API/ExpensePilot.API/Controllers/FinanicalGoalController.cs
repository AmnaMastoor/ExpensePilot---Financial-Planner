using ExpensePilot.API.Data;
using ExpensePilot.API.DTO;
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
    public class FinancialGoalController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FinancialGoalController(ApplicationDbContext context)
        {
            _context = context;
        }


        private string GetUserId()
        {
            return User.FindFirstValue(
                ClaimTypes.NameIdentifier
            );
        }



        // GET: api/FinancialGoal
        [HttpGet]
        public async Task<IActionResult> GetGoals()
        {
            var userId = GetUserId();


            var goals = await _context.FinancialGoals
                .Where(g => g.UserId == userId)
                .ToListAsync();


            return Ok(goals);
        }



        // GET: api/FinancialGoal/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGoal(int id)
        {
            var userId = GetUserId();


            var goal = await _context.FinancialGoals
                .FirstOrDefaultAsync(g =>
                    g.FinancialGoalId == id &&
                    g.UserId == userId
                );


            if (goal == null)
                return NotFound();


            return Ok(goal);
        }



        // POST: api/FinancialGoal
        [HttpPost]
        public async Task<IActionResult> CreateGoal(
            CreateGoalDto request)
        {
            var userId = GetUserId();


            var goal = new FinancialGoal
            {
                Title = request.Title,
                Description = request.Description,
                TargetAmount = request.TargetAmount,
                CurrentAmount = 0,
                TargetDate = DateTime.SpecifyKind(
                                    request.TargetDate,
                                    DateTimeKind.Utc),
                UserId = userId
            };


            _context.FinancialGoals.Add(goal);

            await _context.SaveChangesAsync();


            return CreatedAtAction(
                nameof(GetGoal),
                new
                {
                    id = goal.FinancialGoalId
                },
                goal
            );
        }



        // PUT: api/FinancialGoal/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGoal(
            int id,
            CreateGoalDto request)
        {
            var userId = GetUserId();


            var goal = await _context.FinancialGoals
                .FirstOrDefaultAsync(g =>
                    g.FinancialGoalId == id &&
                    g.UserId == userId
                );


            if (goal == null)
                return NotFound();


            goal.Title = request.Title;
            goal.Description = request.Description;
            goal.TargetAmount = request.TargetAmount;
            goal.TargetDate = DateTime.SpecifyKind(
                                    request.TargetDate,
                                    DateTimeKind.Utc
                                    );

            await _context.SaveChangesAsync();


            return NoContent();
        }



        // DELETE: api/FinancialGoal/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGoal(int id)
        {
            var userId = GetUserId();


            var goal = await _context.FinancialGoals
                .FirstOrDefaultAsync(g =>
                    g.FinancialGoalId == id &&
                    g.UserId == userId
                );


            if (goal == null)
                return NotFound();


            _context.FinancialGoals.Remove(goal);

            await _context.SaveChangesAsync();


            return NoContent();
        }
    }
}