using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace social_media_be.Migrations
{
    public partial class fixwatch_room_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_WatchRooms",
                table: "WatchRooms");

            migrationBuilder.DropColumn(
                name: "RoomId",
                table: "WatchRooms");

            migrationBuilder.DropColumn(
                name: "RoomConnectionId",
                table: "WatchRooms");

            migrationBuilder.AlterColumn<string>(
                name: "RoomName",
                table: "WatchRooms",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WatchRooms",
                table: "WatchRooms",
                column: "RoomName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_WatchRooms",
                table: "WatchRooms");

            migrationBuilder.AlterColumn<string>(
                name: "RoomName",
                table: "WatchRooms",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "RoomId",
                table: "WatchRooms",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "RoomConnectionId",
                table: "WatchRooms",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WatchRooms",
                table: "WatchRooms",
                column: "RoomId");
        }
    }
}
