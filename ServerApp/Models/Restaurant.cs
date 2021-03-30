using System.Collections.Generic;

namespace ServerApp.Models
{
    public class Restaurant
    {
      public int RestaurantID{get; set;}
      public string restaurantName {get; set;} 
      public string restaurantAdress{get; set;}
      public int restaurantGsm {get; set;}
      public string restaurantPwd{get; set;}
      public string imageUrl { get; set; }
      public List<Reservation> Reservations{get; set;}

      public Food Food { get; set; }
    }
}