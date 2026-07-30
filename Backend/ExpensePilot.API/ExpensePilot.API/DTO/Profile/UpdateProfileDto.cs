using System.ComponentModel.DataAnnotations;

namespace ExpensePilot.API.DTO.Profile
{
    public class UpdateProfileDto
    {
        [Required]
      public string FullName { get; set; }
    }
}
