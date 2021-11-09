using Microsoft.EntityFrameworkCore.Migrations;

namespace FA21.P05.Web.Migrations
{
    public partial class UpdatedOrdersIncludeAddon : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AddonItem_MenuItem_MenuItemId",
                table: "AddonItem");

            migrationBuilder.DropForeignKey(
                name: "FK_MenuItem_AddonCategory_AddonCategoryId",
                table: "MenuItem");

            migrationBuilder.DropIndex(
                name: "IX_AddonItem_MenuItemId",
                table: "AddonItem");

            migrationBuilder.DropColumn(
                name: "MenuItemId",
                table: "AddonItem");

            migrationBuilder.RenameColumn(
                name: "LineItemQuantity",
                table: "OrderItem",
                newName: "MenuItemQuantity");

            migrationBuilder.RenameColumn(
                name: "LineItemPrice",
                table: "OrderItem",
                newName: "MenuItemTotal");

            migrationBuilder.RenameColumn(
                name: "LineItemTotal",
                table: "AddonOrderItem",
                newName: "AddonItemPrice");

            migrationBuilder.AddColumn<decimal>(
                name: "AddonItemTotal",
                table: "OrderItem",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "MenuItemPrice",
                table: "OrderItem",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuItem_AddonCategory_AddonCategoryId",
                table: "MenuItem");

            migrationBuilder.DropColumn(
                name: "AddonItemTotal",
                table: "OrderItem");

            migrationBuilder.DropColumn(
                name: "MenuItemPrice",
                table: "OrderItem");

            migrationBuilder.RenameColumn(
                name: "MenuItemTotal",
                table: "OrderItem",
                newName: "LineItemPrice");

            migrationBuilder.RenameColumn(
                name: "MenuItemQuantity",
                table: "OrderItem",
                newName: "LineItemQuantity");

            migrationBuilder.RenameColumn(
                name: "AddonItemPrice",
                table: "AddonOrderItem",
                newName: "LineItemTotal");

            migrationBuilder.AlterColumn<int>(
                name: "AddonCategoryId",
                table: "MenuItem",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MenuItemId",
                table: "AddonItem",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AddonItem_MenuItemId",
                table: "AddonItem",
                column: "MenuItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_AddonItem_MenuItem_MenuItemId",
                table: "AddonItem",
                column: "MenuItemId",
                principalTable: "MenuItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MenuItem_AddonCategory_AddonCategoryId",
                table: "MenuItem",
                column: "AddonCategoryId",
                principalTable: "AddonCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
