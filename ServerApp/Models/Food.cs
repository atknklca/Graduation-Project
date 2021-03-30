using System.Collections.Generic;
using ServerApp.DTO;

namespace ServerApp.Models
{
    public class Food
    {
        public int FoodID {get; set;}
        public string foodName{get; set;}
        public string foodDescription{get; set;}
        public List<UserDto> Users {get; set;}
        public City City{get; set;}
    }
}