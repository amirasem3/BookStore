using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookStoreClean2.Migrations
{
    /// <inheritdoc />
    public partial class AddRoleAndFixUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Create Roles table
            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            // Seed initial roles
            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Name" },
                values: new object[] { "56e9a98c-26f1-4fbe-a12d-85e65591e472", "Admin" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Name" },
                values: new Object[] { "d08eb06e-04fa-447a-9471-999bdcc2e6a9", "User" });

            // Add RoleId column to Users table
            migrationBuilder.AddColumn<string>(
                name: "RoleId",
                table: "Users",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "d08eb06e-04fa-447a-9471-999bdcc2e6a9"); // Default to User role

            // Ensure all existing users have a valid RoleId
            migrationBuilder.Sql("UPDATE Users SET RoleId = 'd08eb06e-04fa-447a-9471-999bdcc2e6a9' WHERE RoleId = '' OR RoleId IS NULL");

            // Create index and foreign key for RoleId
            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Roles_RoleId",
                table: "Users",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Roles_RoleId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_RoleId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
