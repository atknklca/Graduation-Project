using System.Collections.Generic;
using ServerApp.DTO;

namespace ServerApp.Models
{
    public class Food
    {
        public Food(){
            Users= new List<UserFood>();
        }
        public int FoodID {get; set;}
        public string foodName{get; set;}
        public string foodDescription{get; set;}
        public string imageUrl { get; set; }
        public List<UserFood> Users{get; set;}
        public int CityID{get; set;}
        public City City{get; set;}
        public int RestaurantID{get; set;} 
        public Restaurant Restaurant {get; set;}
    }
}