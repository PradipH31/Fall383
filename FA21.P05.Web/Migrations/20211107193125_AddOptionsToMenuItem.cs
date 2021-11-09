using Microsoft.EntityFrameworkCore.Migrations;

namespace FA21.P05.Web.Migrations
{
    public partial class AddOptionsToMenuItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isAddon",
                table: "Category",
                newName: "IsAddon");

            migrationBuilder.AddColumn<int>(
                name: "AddonId",
                table: "MenuItem",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddonId",
                table: "MenuItem");

            migrationBuilder.RenameColumn(
                name: "IsAddon",
                table: "Category",
                newName: "isAddon");
        }
    }
}
