using System.Collections.Generic;
using ServerApp.DTO;

namespace ServerApp.Models
{
    public class Food
    {
        public int FoodID {get; set;}
        public string foodName{get; set;}
        public string foodDescription{get; set;}
        public string imageUrl { get; set; }
        public List<User> Users {get; set;}
        public City City{get; set;}
       
        public Restaurant Restaurant {get; set;}
    }
}