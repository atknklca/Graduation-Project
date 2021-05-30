using System.Collections.Generic;
using ServerApp.DTO;

namespace ServerApp.Models
{
    public class Restaurant
    {
      public Restaurant(){
        Reservations = new List<Reservation>();
      }
      public int RestaurantID{get; set;}
      public string restaurantName {get; set;} 
      public string restaurantAdress{get; set;}
      public string restaurantGsm {get; set;}
      public string restaurantPwd{get; set;}
      public string imageUrl { get; set; }
      public List<Reservation> Reservations{get; set;}
      public Food Food { get; set; }
    }
}