using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace foodRecipe.Migrations
{
    /// <inheritdoc />
    public partial class DropRecipesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ingrediants",
                table: "Recipes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ingrediants",
                table: "Recipes");
        }
    }
}
