using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExpensePilot.API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCategoryForDefaultAndUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDefault",
                table: "catagories",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "catagories",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_catagories_UserId",
                table: "catagories",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_catagories_AspNetUsers_UserId",
                table: "catagories",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_catagories_AspNetUsers_UserId",
                table: "catagories");

            migrationBuilder.DropIndex(
                name: "IX_catagories_UserId",
                table: "catagories");

            migrationBuilder.DropColumn(
                name: "IsDefault",
                table: "catagories");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "catagories");
        }
    }
}
