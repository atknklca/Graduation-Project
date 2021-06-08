using ServerApp.DTO;

namespace ServerApp.Models
{
    public class UserFood
    {
        public int Id{get; set;}
        public User User{get; set;}
        public int FoodID{get; set;}
        public Food Food {get; set;}
    }
}