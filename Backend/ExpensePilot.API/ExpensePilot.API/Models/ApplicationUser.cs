using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace ExpensePilot.API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }

        public decimal MonthlyBudgetLimit { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();

        public ICollection<Budget> Budgets { get; set; } = new List<Budget>();

        public ICollection<FinancialGoal> FinancialGoals { get; set; } = new List<FinancialGoal>();

        public ICollection<Category> Categories { get; set; } = new List<Category>();

        public ICollection<AiDocument> Documents { get; set; } = new List<AiDocument>();
    }
}