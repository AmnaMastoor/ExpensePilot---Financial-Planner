
namespace ExpensePilot.API.Models
{
    public class Transaction
    {
        public int TransactionId { get; set; }
        public string UserId { get; set; }

        public int? CategoryId { get; set; }
        public TransactionType Type { get; set; }

        public decimal Amount { get; set; }

        public DateTime TransactionDate { get; set; }

        public string Title { get; set; }

        public string? Description { get; set; }

        //foriegn key
        public ApplicationUser? User { get; set; }
        public Category? Category { get; set; }

    }
    public enum TransactionType
    {
        Income,
        Expense
    }

}

