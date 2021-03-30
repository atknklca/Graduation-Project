using Microsoft.EntityFrameworkCore.Migrations;

namespace ServerApp.Migrations
{
    public partial class InitialWDto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_UserDto_UserDtoId",
                table: "Reservations");

            migrationBuilder.RenameColumn(
                name: "UserDtoId",
                table: "Reservations",
                newName: "UserId1");

            migrationBuilder.RenameIndex(
                name: "IX_Reservations_UserDtoId",
                table: "Reservations",
                newName: "IX_Reservations_UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_UserDto_UserId1",
                table: "Reservations",
                column: "UserId1",
                principalTable: "UserDto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_UserDto_UserId1",
                table: "Reservations");

            migrationBuilder.RenameColumn(
                name: "UserId1",
                table: "Reservations",
                newName: "UserDtoId");

            migrationBuilder.RenameIndex(
                name: "IX_Reservations_UserId1",
                table: "Reservations",
                newName: "IX_Reservations_UserDtoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_UserDto_UserDtoId",
                table: "Reservations",
                column: "UserDtoId",
                principalTable: "UserDto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
