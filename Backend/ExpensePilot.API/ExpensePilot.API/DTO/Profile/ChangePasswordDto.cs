using System.ComponentModel.DataAnnotations;

public class ChangePasswordDto
{
    [Required]
    public string CurrentPassword { get; set; }

    [Required]
    public string NewPassword { get; set; }

    [Compare("NewPassword")]
    public string ConfirmPassword { get; set; }
}