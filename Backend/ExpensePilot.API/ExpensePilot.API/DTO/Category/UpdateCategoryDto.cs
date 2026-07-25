namespace ExpensePilot.API.DTO
{
    public class UpdateCategoryDto
    {
        public string Name { get; set; }

        public string? Description { get; set; }

        public string? Icon { get; set; }
    }
}