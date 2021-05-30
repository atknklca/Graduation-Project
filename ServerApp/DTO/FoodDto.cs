using System.ComponentModel.DataAnnotations;

namespace ServerApp.DTO
{
    public class FoodDto
    {
        [Key]
        public int FoodID{get; set;}
        public string foodName{get; set;}
        public string foodDescription{get; set;}
        public string imageUrl { get; set; }
        public int CityID{get; set;}
        public int RestaurantID{get; set;} 
    }
}