using Microsoft.AspNetCore.Identity;

namespace ExpensePilot.API.Models
{
    public class Category
    {
        public int CategoryId { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public string? Icon { get; set; }


        public string? UserId { get; set; }

        public ApplicationUser? User { get; set; }


        public bool IsDefault { get; set; }


        public ICollection<Transaction> Transactions { get; set; }
    }
}