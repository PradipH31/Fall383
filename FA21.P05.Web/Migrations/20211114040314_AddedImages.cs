using Microsoft.EntityFrameworkCore.Migrations;

namespace FA21.P05.Web.Migrations
{
    public partial class AddedImages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuItem_AddonCategory_AddonCategoryId",
                table: "MenuItem");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "AddonItem",
                newName: "ImageLink");

            migrationBuilder.AlterColumn<int>(
                name: "AddonCategoryId",
                table: "MenuItem",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageLink",
                table: "MenuItem",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MenuItem_AddonCategory_AddonCategoryId",
                table: "MenuItem",
                column: "AddonCategoryId",
                principalTable: "AddonCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuItem_AddonCategory_AddonCategoryId",
                table: "MenuItem");

            migrationBuilder.DropColumn(
                name: "ImageLink",
                table: "MenuItem");

            migrationBuilder.RenameColumn(
                name: "ImageLink",
                table: "AddonItem",
                newName: "Description");

            migrationBuilder.AlterColumn<int>(
                name: "AddonCategoryId",
                table: "MenuItem",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_MenuItem_AddonCategory_AddonCategoryId",
                table: "MenuItem",
                column: "AddonCategoryId",
                principalTable: "AddonCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
