namespace ExpensePilot.API.DTO
{
    public class RecentTransactionDto
    {
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Type { get; set; } = string.Empty;
        public DateTime TransactionDate { get; set; }
    }
}
