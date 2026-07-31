using System.ComponentModel.DataAnnotations;

namespace ExpensePilot.API.DTO.Profile
{
    public class SetPasswordDto
    {
        [Required]
        public string NewPassword { get; set; }

        [Required]
        [Compare("NewPassword")]
        public string ConfirmPassword { get; set; }
    }
}