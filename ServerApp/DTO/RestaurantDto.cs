using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ServerApp.Models;

namespace ServerApp.DTO
{
    public class RestaurantDto
    {
      [Key]
      public int RestaurantID { get; set; }
      public string restaurantName {get; set;} 
      public string restaurantAdress{get; set;}
      public string restaurantGsm {get; set;}
      public List<Reservation> Reservations{get; set;}
    }
}