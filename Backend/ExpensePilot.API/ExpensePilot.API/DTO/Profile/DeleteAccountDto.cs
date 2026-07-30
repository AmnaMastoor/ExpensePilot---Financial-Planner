using System.ComponentModel.DataAnnotations;

namespace ExpensePilot.API.DTO.Profile
{
    public class DeleteAccountDto
    {
        [Required]
        public string Password { get; set; }
    }
}
