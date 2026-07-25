namespace ExpensePilot.API.DTO
{
    public class UserDto
    {
        public string Id { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string Role { get; set; }

        public bool EmailConfirmed { get; set; }

        public bool IsLocked { get; set; }
    }
}