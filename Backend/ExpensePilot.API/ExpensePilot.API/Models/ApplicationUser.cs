using Microsoft.AspNetCore.Identity;

namespace ExpensePilot.API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }
    }
}