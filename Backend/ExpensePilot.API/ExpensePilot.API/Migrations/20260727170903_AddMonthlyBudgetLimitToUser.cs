using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExpensePilot.API.Migrations
{
    /// <inheritdoc />
    public partial class AddMonthlyBudgetLimitToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "MonthlyBudgetLimit",
                table: "AspNetUsers",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MonthlyBudgetLimit",
                table: "AspNetUsers");
        }
    }
}
