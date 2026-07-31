namespace ExpensePilot.API.DTO.Profile
{
    public class ProfileDto
    {
        public string FullName { get; set; }

        public string Email { get; set; }

        public DateTime CreatedAt { get; set; }
        public bool IsGoogleAccount { get; set; }
    }
}