using Microsoft.EntityFrameworkCore.Migrations;

namespace FA21.P05.Web.Migrations
{
    public partial class LinkedAddonsToMenuItems : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuItem_Category_CategoryId",
                table: "MenuItem");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropColumn(
                name: "AddonId",
                table: "MenuItem");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "MenuItem",
                newName: "MenuCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_MenuItem_CategoryId",
                table: "MenuItem",
                newName: "IX_MenuItem_MenuCategoryId");

            migrationBuilder.AddColumn<int>(
                name: "AddonCategoryId",
                table: "MenuItem",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "AddonCategory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AddonCategory", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MenuCategory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuCategory", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AddonItem",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AddonCategoryId = table.Column<int>(type: "int", nullable: false),
                    MenuItemId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AddonItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AddonItem_AddonCategory_AddonCategoryId",
                        column: x => x.AddonCategoryId,
                        principalTable: "AddonCategory",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AddonItem_MenuItem_MenuItemId",
                        column: x => x.MenuItemId,
                        principalTable: "MenuItem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AddonOrderItem",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LineItemTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AddonItemId = table.Column<int>(type: "int", nullable: false),
                    OrderItemId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AddonOrderItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AddonOrderItem_AddonItem_AddonItemId",
                        column: x => x.AddonItemId,
                        principalTable: "AddonItem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AddonOrderItem_OrderItem_OrderItemId",
                        column: x => x.OrderItemId,
                        principalTable: "OrderItem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MenuItem_AddonCategoryId",
                table: "MenuItem",
                column: "AddonCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_AddonItem_AddonCategoryId",
                table: "AddonItem",
                column: "AddonCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_AddonItem_MenuItemId",
                table: "AddonItem",
                column: "MenuItemId");

            migrationBuilder.CreateIndex(
                name: "IX_AddonOrderItem_AddonItemId",
                table: "AddonOrderItem",
                column: "AddonItemId");

            migrationBuilder.CreateIndex(
                name: "IX_AddonOrderItem_OrderItemId",
                table: "AddonOrderItem",
                column: "OrderItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_MenuItem_AddonCategory_AddonCategoryId",
                table: "MenuItem",
                column: "AddonCategoryId",
                principalTable: "AddonCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_MenuItem_MenuCategory_MenuCategoryId",
                table: "MenuItem",
                column: "MenuCategoryId",
                principalTable: "MenuCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuItem_AddonCategory_AddonCategoryId",
                table: "MenuItem");

            migrationBuilder.DropForeignKey(
                name: "FK_MenuItem_MenuCategory_MenuCategoryId",
                table: "MenuItem");

            migrationBuilder.DropTable(
                name: "AddonOrderItem");

            migrationBuilder.DropTable(
                name: "MenuCategory");

            migrationBuilder.DropTable(
                name: "AddonItem");

            migrationBuilder.DropTable(
                name: "AddonCategory");

            migrationBuilder.DropIndex(
                name: "IX_MenuItem_AddonCategoryId",
                table: "MenuItem");

            migrationBuilder.DropColumn(
                name: "AddonCategoryId",
                table: "MenuItem");

            migrationBuilder.RenameColumn(
                name: "MenuCategoryId",
                table: "MenuItem",
                newName: "CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_MenuItem_MenuCategoryId",
                table: "MenuItem",
                newName: "IX_MenuItem_CategoryId");

            migrationBuilder.AddColumn<int>(
                name: "AddonId",
                table: "MenuItem",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsAddon = table.Column<bool>(type: "bit", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_MenuItem_Category_CategoryId",
                table: "MenuItem",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
