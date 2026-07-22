using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ExpensePilot.API.Models;

namespace ExpensePilot.API.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : base(options)
        {
        }
      public DbSet<Transaction> transactions { get; set; }
        public DbSet<Category> catagories { get; set; }

    }
}